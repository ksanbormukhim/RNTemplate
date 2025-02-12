import React, { useState } from 'react';
import { GestureResponderEvent, Text, View } from 'react-native';
import StyledButton from '../components/StyledButton';
import TextInputWithLabel from '../components/TextInputWithLabel';
import apiService from '../service/apiService';

const LoginScreen = ({ loginMode, navigation }: any) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async (event: GestureResponderEvent) => {
    // console.log('s');
    // const r = await apiService.get(
    //   'http://172.16.3.124/api/mobile-template-api/login.php'
    // );
    // console.log('ss', r);
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
