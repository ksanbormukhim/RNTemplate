import React, { useState } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';
import { SelectOptionType } from '../types';

const SelectOption = ({
  options,
  value,
  onValueSelected,
  withClearSelection,
}: {
  options: SelectOptionType[];
  value: string;
  onValueSelected: (value: SelectOptionType) => void;
  withClearSelection?: boolean;
}) => {
  const [visible, setVisible] = useState(false);

  const selectOption = (option: SelectOptionType) => {
    if (option.value == 'Clear Selection') {
      onValueSelected({ value: 'Select an option' });
    } else {
      onValueSelected(option);
    }
    setVisible(false);
  };

  const _options = withClearSelection
    ? [{ label: 'Clear Selection', value: 'Clear Selection' }, ...options]
    : options;

  return (
    <View
      style={[
        {
          width: '100%',
          backgroundColor: '#f66',
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
        },
      ]}
    >
      <Pressable
        style={[
          {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            backgroundColor: '#f8f8f8',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          },
        ]}
        onPress={() => setVisible(!visible)}
      >
        <Text
          style={[
            {
              fontSize: 14,
              color: '#555',
            },
          ]}
        >
          {value}
        </Text>
      </Pressable>

      <Modal animationType="slide" transparent visible={visible}>
        <Pressable
          onPress={() => setVisible(false)}
          style={[
            {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <View
            style={[
              {
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                backgroundColor: '#f8f8f8',
                width: '90%',
                padding: '2%',
                elevation: 4,
                maxHeight: '60%',
              },
            ]}
          >
            <FlatList
              data={_options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    {
                      padding: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#eee',
                    },
                  ]}
                  onPress={() => selectOption(item)}
                >
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        color: '#333',
                      },
                    ]}
                  >
                    {item.label ?? item.value}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default SelectOption;
