import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ErrorContainer({
  width = '96%',
  height = 50,
  borderRadius = 8,
  backgroundColor = '#FFCDD2',
  message = 'An error occurred',
  textColor = '#D32F2F',
  borderColor = '#D32F2F',
  style = {},
  onRetry,
}: {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  backgroundColor?: string;
  message?: string;
  textColor?: string;
  borderColor?: string;
  style?: object;
  onRetry?: () => void;
}) {
  return (
    <View
      style={[
        {
          alignItems: 'flex-end',
          padding: 10,
          margin: '2%',
          borderWidth: 1,
        },
        {
          width,
          height,
          borderRadius,
          backgroundColor,
          borderColor,
        },
        style,
      ]}
    >
      {onRetry && (
        <Icon
          name="refresh"
          onPress={onRetry}
          color="#fff"
          size={18}
          style={{ backgroundColor: '#555', padding: 10, borderRadius: 5 }}
        />
      )}
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Text
          style={[
            {
              fontSize: 16,
              fontWeight: '600',
            },
            { color: textColor },
          ]}
        >
          {message}
        </Text>
      </View>
    </View>
  );
}
