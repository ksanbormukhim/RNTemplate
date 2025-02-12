import MapLibreGL from '@maplibre/maplibre-react-native';
import React, { useEffect, useState } from 'react';
import { Switch, Text, View } from 'react-native';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import { location_pin } from '../assets/assets';
import indiaMask from '../assets/geoJson/indiaMaskGeoJSON';
import { useLocationStore } from '../store/locationStore';

export default function MapScreen() {
  MapLibreGL.Logger.setLogCallback((log) => {
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
  MapLibreGL.requestAndroidLocationPermissions();

  const styleJSON = {
    version: 8,
    sources: {
      google: {
        type: 'raster',
        tiles: [
          // 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          // 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          'https://bhuvan-vec1.nrsc.gov.in/bhuvan/gwc/service/wms/?service=WMS&request=GetMap&layers=india3&format=image/png&transparent=true&version=1.1.1&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}',
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

  const defaultZoom = 4;
  const defaultCenter = [93.2473, 25.5736];

  const [showMask, setShowMask] = useState(true);
  const [showLocation, setShowLocation] = useState(false);

  const [zoomLevel, setZoomLevel] = useState<number>(defaultZoom);

  useEffect(() => {
    if (showLocation) {
      startLocTracking();
    } else {
      stopLocTracking();
    }
  }, [showLocation]);

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
        styleURL=""
        onRegionDidChange={(feature: any) => {
          setZoomLevel(feature.properties.zoomLevel);
        }}
      >
        <MapLibreGL.UserLocation animated visible={showLocation}>
          <MapLibreGL.SymbolLayer
            id="userLocation"
            style={{
              iconImage: location_pin,
              iconSize: 0.075,
              iconOffset: [0, -200],
            }}
          />
        </MapLibreGL.UserLocation>

        <MapLibreGL.Camera
          // followUserLocation
          key="camera"
          zoomLevel={zoomLevel}
          animationMode="flyTo"
          animationDuration={10}
          centerCoordinate={defaultCenter}
        />

        <MapLibreGL.ShapeSource id="indiaMask" shape={indiaMask}>
          <MapLibreGL.LineLayer
            id="indiaMaskLine"
            style={{
              lineColor: 'blue',
              // lineColor: '#f0aeae',
              lineWidth: 1,
              lineCap: 'round',
              lineJoin: 'round',
              visibility: showMask ? 'visible' : 'none',
            }}
          />
          <MapLibreGL.FillLayer
            id="indiaMaskFill"
            style={{
              // fillColor: 'black',
              fillColor: 'blue',
              fillOpacity: 0.3,
              visibility: showMask ? 'visible' : 'none',
            }}
          />
        </MapLibreGL.ShapeSource>

        {/* <MapLibreGL.Callout></MapLibreGL.Callout> */}
        {/* <MapLibreGL.Annotation></MapLibreGL.Annotation> */}
        {/* <MapLibreGL.Annotation ></MapLibreGL.Annotation> */}
      </MapLibreGL.MapView>
      {/* UI */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'transparent',
          flexDirection: 'row',
        }}
        pointerEvents="box-none"
      >
        <View
          style={{
            width: '10%',
            height: 90,
            gap: 10,
            margin: 10,
          }}
        >
          <FoundationIcon
            name="zoom-out"
            size={24}
            style={{
              backgroundColor: '#fff',
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              textAlignVertical: 'center',
              borderRadius: 10,
              elevation: 10,
            }}
            onPress={() => {
              setZoomLevel((curZoom) => curZoom - 0.5);
            }}
          />

          <FoundationIcon
            name="zoom-in"
            size={24}
            style={{
              backgroundColor: '#fff',
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              textAlignVertical: 'center',
              borderRadius: 10,
              elevation: 10,
            }}
            onPress={() => {
              setZoomLevel((curZoom) => curZoom + 0.5);
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            padding: 10,
            width: '30%',
            height: 50,
            elevation: 10,
            borderRadius: 10,
          }}
          pointerEvents="box-none"
        >
          <Text>Toggle Mask</Text>
          <Switch value={showMask} onValueChange={(v) => setShowMask(v)} />
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            padding: 10,
            width: '30%',
            height: 50,
            elevation: 10,
            borderRadius: 10,
          }}
          pointerEvents="box-none"
        >
          <Text>Toggle Location</Text>
          <Switch
            value={showLocation}
            onValueChange={(v) => setShowLocation(v)}
          />
        </View>
      </View>
    </View>
  );
}
