import { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

export default function SkeletonLoader({
  width = '96%',
  height = 50,
  borderRadius = 8,
  style = {},
  animateStyle = {},
  textStyle = {},
  visible,
  message,
}: {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: object;
  animateStyle?: object;
  textStyle?: object;
  visible?: boolean;
  message?: string;
}) {
  if (!visible) return null;

  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
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
    );

    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerValue]);

  const shimmerInterpolation = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#999', '#fff'],
  });

  return (
    <View
      style={[
        {
          overflow: 'hidden',
          margin: '2%',
        },
        { width, height, borderRadius },
        style,
      ]}
    >
      <Animated.View
        style={[
          {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#555',
            borderWidth: 1,
          },
          { backgroundColor: shimmerInterpolation, borderRadius },
          animateStyle,
        ]}
      >
        {message && (
          <Text style={[{ color: '#fff' }, textStyle]}>{message}</Text>
        )}
      </Animated.View>
    </View>
  );
}
