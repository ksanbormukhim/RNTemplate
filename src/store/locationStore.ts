import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';
import { create } from 'zustand';
import { modalsUIStore } from './modalsUIStore';

type LocationDataType = {
  latitude: number;
  longitude: number;
};

type LocationState = {
  location: LocationDataType | null;
  isGettingLocation: boolean;
  trackingLocStatus: string;
  locTrackingID: number | null;
  requestLocationPermission: () => Promise<boolean>;
  getLocation: () => Promise<void>;
  startLocTracking: () => Promise<void>;
  stopLocTracking: () => Promise<void>;
};

export const locationStore = create<LocationState>((set) => {
  return {
    location: null,
    isGettingLocation: false,
    trackingLocStatus: 'stop',
    locTrackingID: null,

    requestLocationPermission: async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true; // Assume permission granted on iOS
      } catch (error) {
        console.error('Error requesting location permission:', error);
        return false;
      }
    },

    getLocation: async () => {
      set({ isGettingLocation: true });
      const hasPermission = await locationStore
        .getState()
        .requestLocationPermission();
      if (!hasPermission) {
        set({ isGettingLocation: false });
        const { showErrorAlert } = modalsUIStore.getState();
        showErrorAlert({ message: 'Error getting Location' });
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          set({
            location: position.coords,
            isGettingLocation: false,
          });
        },
        (error) => {
          set({ isGettingLocation: false });
          const { showErrorAlert } = modalsUIStore.getState();
          showErrorAlert({
            message: 'Error getting Location\n' + error.message,
          });
        },
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
      );
    },

    startLocTracking: async () => {
      set({ trackingLocStatus: 'getting_loc' });
      const hasPermission = await locationStore
        .getState()
        .requestLocationPermission();
      if (!hasPermission) {
        set({ trackingLocStatus: 'stop' });
        const { showErrorAlert } = modalsUIStore.getState();
        showErrorAlert({
          message: 'Error getting Location\nPermission Denied',
        });
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          set({ location: position.coords });
        },
        (error) => {
          set({ trackingLocStatus: 'error_getting_loc' });
          const { showErrorAlert } = modalsUIStore.getState();
          showErrorAlert({
            message: 'Error getting Location\n' + error.message,
          });
        },
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
      );

      const trackingId = Geolocation.watchPosition(
        (position) => {
          set({ location: position.coords });
        },
        (error) => {
          set({ trackingLocStatus: 'error_tracking_loc' });
          const { showErrorAlert } = modalsUIStore.getState();
          showErrorAlert({
            message: 'Error Tracking Location\n' + error.message,
          });
        },
        { enableHighAccuracy: false, distanceFilter: 5 }
      );
      set({ locTrackingID: trackingId, trackingLocStatus: 'tracking_loc' });
    },

    stopLocTracking: async () => {
      const { locTrackingID } = locationStore.getState();
      if (locTrackingID !== null) {
        Geolocation.clearWatch(locTrackingID);
      }
      set({ locTrackingID: null, trackingLocStatus: 'stop' });
    },
  };
});
