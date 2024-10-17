import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { UserDataType } from '../types';

const LoginComponent = () => {
  const { login } = useAuthStore();
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulate a login API call
    const user: UserDataType = {
      uid: '1',
      userid: userid,
      district: 'District',
      status: 'active',
      password: 'user@123',
      role: 'user', // Set role based on your authentication logic
    };

    login(user); // Call the login function from context
  };

  return (
    <View>
      <TextInput
        placeholder="user id"
        value={userid}
        onChangeText={setUserid}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginComponent;
