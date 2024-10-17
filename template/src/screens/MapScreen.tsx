import MapLibreGL, {
  Logger as MapLibreLogger,
} from '@maplibre/maplibre-react-native';
import React from 'react';
import { View } from 'react-native';
import indiaMask from '../assets/geoJson/indiaMaskGeoJSON';
import { useLocationStore } from '../store/locationStore';

export default function MapScreen() {
  MapLibreLogger.setLogCallback((log) => {
    const { message } = log;

    if (message.match('Request failed due to a permanent error:')) {
      return true;
    }
    if (message.includes('{TextureViewRend}[Style]: Failed to load')) {
      return true;
    }

    return false;
  });

  MapLibreGL.setAccessToken(null);

  const styleJSON = {
    version: 8,
    sources: {
      google: {
        type: 'raster',
        tiles: [
          // 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        ],
        tileSize: 256,
        attribution: '',
        maxzoom: 19,
      },
    },
    layers: [
      {
        id: 'google',
        type: 'raster',
        source: 'google', // This must match the source key above
      },
    ],
  };

  const {
    location,
    isGettingLocation,
    trackingLocStatus,
    locTrackingID,
    requestLocationPermission,
    getLocation,
    startLocTracking,
    stopLocTracking,
  } = useLocationStore();

  requestLocationPermission();

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: '#ffe0e0',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <MapLibreGL.MapView
        style={{
          flex: 1,
          alignSelf: 'stretch',
        }}
        attributionPosition={{ bottom: 8, right: 0 }}
        styleJSON={JSON.stringify(styleJSON)}
      >
        <MapLibreGL.UserLocation animated visible showsUserHeadingIndicator />
        <MapLibreGL.Camera
          followUserLocation
          zoomLevel={3}
          animationMode="flyTo"
          animationDuration={10}
        >
          {/* Add custom Icon here
          
          <MapLibreGL.SymbolLayer
            id="userLocation"
            style={{
              iconImage: location_pin,
              iconSize: 0.075,
              iconOffset: [0, -200],
            }}
          />
          
          */}
        </MapLibreGL.Camera>

        <MapLibreGL.ShapeSource id="indiaMask" shape={indiaMask}>
          <MapLibreGL.LineLayer
            id="indiaMaskLine"
            style={{
              lineColor: 'blue',
              // lineColor: '#f0aeae',
              lineWidth: 1,
              lineCap: 'round',
              lineJoin: 'round',
            }}
          />
          <MapLibreGL.FillLayer
            id="indiaMaskFill"
            style={{ fillColor: 'blue', fillOpacity: 0.3 }}
          />
        </MapLibreGL.ShapeSource>
        {/* <MapLibreGL.Callout></MapLibreGL.Callout> */}
        {/* <MapLibreGL.Annotation></MapLibreGL.Annotation> */}
        {/* <MapLibreGL.Annotation ></MapLibreGL.Annotation> */}
        {/* <MapLibreGL.NativeUserLocation></MapLibreGL.NativeUserLocation> */}
      </MapLibreGL.MapView>
      <></>
    </View>
  );
}
