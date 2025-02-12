import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
  View,
  ViewProps,
} from 'react-native';

type TextInputWithLabelProps = TextInputProps & {
  label?: string;
  labelProps?: TextProps;
  containerProps?: ViewProps;
};

const TextInputWithLabel: React.FC<TextInputWithLabelProps> = ({
  label,
  labelProps,
  containerProps,
  ...textInputProps
}) => {
  return (
    <View {...containerProps} style={[styles.container, containerProps?.style]}>
      {label && (
        <Text {...labelProps} style={[styles.label, labelProps?.style]}>
          {label}
        </Text>
      )}
      <TextInput
        {...textInputProps}
        style={[styles.textInput, textInputProps.style]}
      />
    </View>
  );
};

export default TextInputWithLabel;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: '#ddd',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
  },
});
