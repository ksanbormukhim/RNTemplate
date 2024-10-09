import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

type SkeletonLoaderProps = {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: object;
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '96%',
  height = 100,
  borderRadius = 8,
  style = {},
}) => {
  const shimmerValue = new Animated.Value(0);

  // Shimmer animation effect
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerValue]);

  const shimmerInterpolation = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#999', '#fff'],
  });

  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      <Animated.View
        style={[
          styles.shimmer,
          { backgroundColor: shimmerInterpolation, borderRadius },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#555',
    margin: '2%',
  },
  shimmer: {
    width: '100%',
    height: '100%',
  },
});

export default SkeletonLoader;
