import React, { useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, View } from 'react-native';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCommonUIStore } from '../store/commonUIStore';

const CameraScreen = () => {
  const { showToast } = useCommonUIStore();

  const [image, setImage] = useState<Asset>();

  const handleOpenCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 1,
      maxWidth: 720,
      maxHeight: 540,
      includeBase64: true,
    });

    if (result.didCancel) return;
    if (result.errorCode) {
      showToast(`Error: ${result.errorCode}\n${result.errorMessage}`);
      return;
    }

    if (result.assets) {
      setImage(result.assets[0]);
    }
  };

  const handleOpenLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      maxWidth: 720,
      maxHeight: 540,
      includeBase64: true,
    });

    if (result.didCancel) return;
    if (result.errorCode) {
      showToast(`Error: ${result.errorCode}\n${result.errorMessage}`);
      return;
    }

    if (result.assets) {
      setImage(result.assets[0]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Button title="Open Camera" onPress={handleOpenCamera} />
      <Button title="Open Library" onPress={handleOpenLibrary} />
      {image != undefined && (
        <View style={{ margin: 10, width: '90%' }}>
          <Icon
            name="trash"
            color="#000"
            size={18}
            onPress={() => setImage(undefined)}
          />
          <View style={{ maxHeight: 250 }}>
            <Image
              source={{ uri: image.uri }}
              style={{ height: '100%', resizeMode: 'contain' }}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  scrollViewContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
