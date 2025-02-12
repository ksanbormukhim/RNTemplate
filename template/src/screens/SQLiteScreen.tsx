import React, { useState } from 'react';
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { getUsers, insertUser, UserType } from '../db/users';
import { useCommonUIStore } from '../store/commonUIStore';

const SQLiteScreen = () => {
  const { showToast } = useCommonUIStore();

  const [saveDataModal, setSaveDataModal] = useState(false);
  const [viewDataModal, setViewDataModal] = useState(false);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const [users, setUsers] = useState<UserType[]>();

  const handleDataSave = async () => {
    try {
      await insertUser(name, parseFloat(age));
      console.log('Data saved successfully!');
      setName('');
      setAge('');
      setSaveDataModal(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  const handleDataView = async () => {
    try {
      const _users = await getUsers();
      setUsers(_users);
    } catch (error) {
      console.error('Error getting data:', error);
    }

    setViewDataModal(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Button title="Insert User Data" onPress={() => setSaveDataModal(true)} />
      <Button title="View User Data" onPress={handleDataView} />

      <Modal
        visible={saveDataModal}
        onRequestClose={() => {
          setSaveDataModal(false);
        }}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <TextInput
            placeholder="Name"
            style={styles.textInput}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Age"
            style={styles.textInput}
            keyboardType="numeric"
            value={`${age}`}
            onChangeText={setAge}
          />
          <Button title="Save Data" onPress={handleDataSave} />
        </ScrollView>
      </Modal>

      <Modal
        visible={viewDataModal}
        onRequestClose={() => {
          setViewDataModal(false);
        }}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {users && (
            <>
              <Text>Name | Age</Text>
              {users.map((user, index) => (
                <Text key={index}>
                  {user.name} | {user.age}
                </Text>
              ))}
            </>
          )}
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

export default SQLiteScreen;

const styles = StyleSheet.create({
  scrollViewContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  textInput: {
    backgroundColor: '#ddd',
    width: '96%',
    borderBlockColor: 'black',
    borderRadius: 10,
  },
});
