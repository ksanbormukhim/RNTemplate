import Geolocation from '@react-native-community/geolocation';
import React, { createContext, useContext, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { useRoot } from './RootContext';

type LocationContextType = {
  getLocation: () => Promise<void>;
  startLocTracking: () => Promise<void>;
  stopLocTracking: () => Promise<void>;
  location: LocationDataType;
  isGettingLocation: boolean;
  trackingLocStatus: string;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider = ({ children }: any) => {
  const [location, setLocation] = useState<any>();
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [trackingLocStatus, setTrackingLocStatus] = useState<string>('stop');

  const [locTrackingID, setLocTrackingID] = useState<number | null>(null);

  const { showErrorModal } = useRoot();

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
          // TODO :  enable location if default off.
        } else {
          console.error('Location permission denied');
          return false;
        }
      } else {
        return true;
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  };

  async function getLocation() {
    setIsGettingLocation(true);
    if (!(await requestLocationPermission())) {
      console.error('Cannot get Location');
      showErrorModal('Error getting Location');
      return;
    }

    // console.log('Can get Location');

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
        setIsGettingLocation(false);
        ``;
      },
      (error) => {
        console.error('Error getting current location:', error);
        setIsGettingLocation(false);
        showErrorModal('Error getting Location\n' + error.message);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  }

  async function startLocTracking() {
    setTrackingLocStatus('getting_loc');
    if (!(await requestLocationPermission())) {
      console.error('Cannot get Location');
      showErrorModal('Error getting Location\nPermission Denied');
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
        // setIsGettingLocation(false);
      },
      (error) => {
        console.error('Error getting current location:', error);
        setTrackingLocStatus('error_getting_loc');
        showErrorModal('Error getting Location\n' + error.message);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );

    setTrackingLocStatus('tracking_loc');
    const trackingId = Geolocation.watchPosition(
      (position) => {
        setLocation(position.coords);
      },
      (error) => {
        console.error('Error watching location:', error);
        setTrackingLocStatus('error_tracking_loc');
        showErrorModal('Error Tracking Location\n' + error.message);
      },
      { enableHighAccuracy: false, distanceFilter: 5 } // Set a minimum distance for location updates (e.g., 5 meters)
    );
    setLocTrackingID(trackingId);
  }

  async function stopLocTracking() {
    locTrackingID !== null && Geolocation.clearWatch(locTrackingID);
    setLocTrackingID(null);
    setTrackingLocStatus('stop');
  }

  return (
    <LocationContext.Provider
      value={{
        getLocation,
        startLocTracking,
        stopLocTracking,
        location,
        isGettingLocation,
        trackingLocStatus,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
