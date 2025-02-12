import React, { useState } from 'react';
import { GestureResponderEvent, Text, View } from 'react-native';
import StyledButton from '../components/StyledButton';
import TextInputWithLabel from '../components/TextInputWithLabel';
import apiService from '../service/apiService';
import { useAuthStore } from '../store/authStore';
import { UserDataType } from '../types';
import { urls } from '../utils/urls';

const LoginScreen = ({ loginMode, navigation }: any) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const { login } = useAuthStore();

  const handleLogin = async (event: GestureResponderEvent) => {
    const [status, result, contentType] = await apiService.get<UserDataType>(
      urls.login,
      {
        email: email,
        pass: pass,
        type: loginMode,
      }
    );
    login(result);
  };

  return (
    <View>
      <Text>
        {loginMode.charAt(0).toUpperCase()}
        {loginMode.substring(1).toLowerCase()} Login
      </Text>
      <TextInputWithLabel
        containerProps={{ style: { paddingHorizontal: 10 } }}
        label="Email / UserName :"
        value={email}
        onChangeText={setEmail}
      />
      <TextInputWithLabel
        containerProps={{ style: { paddingHorizontal: 10 } }}
        label="Password :"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
      />
      <StyledButton
        title="Submit"
        style={{ padding: 10 }}
        onPress={handleLogin}
      />
    </View>
  );
};

export default LoginScreen;
