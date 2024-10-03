import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { commonUIStore } from '../store/commonUIStore';

export default function CommonUI() {
  const {
    toast,
    loading,
    errorAlert,
    alert,
    hideAlert,
    hideLoading,
    hideToast,
  } = commonUIStore();

  return (
    <>
      {/* Error Alert */}
      <Modal animationType="slide" transparent visible={!!errorAlert}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Icon name="alert-circle-outline" size={24} color={'#f55'} />
              {errorAlert && (
                <Text style={{ color: '#f55' }}>
                  {errorAlert.title ?? 'Error! Something went wrong.'}
                </Text>
              )}
            </View>
            {errorAlert && (
              <Text style={styles.modalBodyText}>{errorAlert.message}</Text>
            )}
            <View style={styles.actions}>
              <Pressable
                style={{ width: '30%' }}
                onPress={() => {
                  if (errorAlert && errorAlert?.onOk) errorAlert.onOk();
                  hideAlert();
                }}
              >
                <Text style={styles.ok}>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Alert  */}
      <Modal animationType="slide" transparent visible={!!alert}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Icon name="alert-circle-outline" size={24} color={'#55f'} />
              {alert && (
                <Text style={{ color: '#55f' }}>
                  {alert.title ?? 'Alert! '}
                </Text>
              )}
            </View>
            {alert && <Text style={styles.modalBodyText}>{alert.message}</Text>}
            <View style={styles.actions}>
              <Pressable
                style={{ width: '30%' }}
                onPress={() => {
                  if (alert && alert?.onOk) alert.onOk();
                  hideAlert();
                }}
              >
                <Text style={styles.ok}>OK</Text>
              </Pressable>
              <Pressable
                style={{ width: '30%' }}
                onPress={() => {
                  if (alert && alert?.onCancel) alert.onCancel();
                  hideAlert();
                }}
              >
                <Text style={styles.cancel}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Loading  */}
      <Modal animationType="slide" transparent visible={!!loading}>
        <View style={styles.centeredView}>
          <View style={styles.loadingView}>
            <ActivityIndicator />
            <Text numberOfLines={2} style={{ flex: 1 }}>
              {loading === true ? 'Loading. Please Wait....' : loading}
            </Text>
          </View>
        </View>
      </Modal>

      {/* Toast  */}
      <Modal animationType="slide" transparent visible={!!toast}>
        <View style={styles.bottomedView}>
          <View style={styles.toastView}>
            <ActivityIndicator />
            <Text numberOfLines={2} style={{ flex: 1 }}>
              {toast}
            </Text>
            <Pressable
              style={{}}
              onPress={() => {
                hideToast();
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>CLOSE</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomedView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  toastView: {
    backgroundColor: '#eee',
    width: '90%',
    padding: '4%',
    elevation: 4,
    maxHeight: '60%',
    flexDirection: 'row',
    gap: 15,
    marginBottom: '10%',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    width: '90%',
    padding: '2%',
    elevation: 4,
    maxHeight: '60%',
  },
  modalHeader: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15,
    borderBottomColor: '#999',
    paddingBottom: '2%',
    borderBottomWidth: 1,
  },
  modalBodyText: {
    padding: '4%',
    borderBottomColor: '#999',
    paddingBottom: '2%',
    borderBottomWidth: 1,
    marginBottom: '2%',
    flexShrink: 1,
    flexGrow: 1,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row-reverse',
    gap: 10,
  },
  cancel: {
    backgroundColor: '#f55',
    color: '#fff',
    textAlign: 'center',
    padding: '10%',
    borderRadius: 5,
  },
  ok: {
    backgroundColor: '#55f',
    color: '#fff',
    textAlign: 'center',
    padding: '10%',
    borderRadius: 5,
  },
  loadingView: {
    backgroundColor: 'white',
    width: '90%',
    padding: '4%',
    elevation: 4,
    maxHeight: '60%',
    flexDirection: 'row',
    gap: 15,
  },
});
