import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type ErrorContainerProps = {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  backgroundColor?: string;
  message?: string;
  textColor?: string;
  style?: object;
  onRetry?: () => void;
};

const ErrorContainer: React.FC<ErrorContainerProps> = ({
  width = '96%',
  height = 50,
  borderRadius = 8,
  backgroundColor = '#FFCDD2',
  message = 'An error occurred',
  textColor = '#D32F2F',
  style = {},
  onRetry,
}) => {
  return (
    <View
      style={[
        styles.container,
        { width, height, borderRadius, backgroundColor },
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
        <Text style={[styles.errorText, { color: textColor }]}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    padding: 10,
    margin: '2%',
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ErrorContainer;
