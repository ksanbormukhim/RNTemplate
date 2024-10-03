// import React, { createContext, useContext, useState } from 'react';
// import {
//   ActivityIndicator,
//   Modal,
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// type AlertOptions = {
//   message: string;
//   title?: string;
//   onOk?: () => void;
//   onCancel?: () => void;
// };

// type RootContextType = {
//   showLoading: React.Dispatch<React.SetStateAction<string | boolean>>;
//   showToast: React.Dispatch<React.SetStateAction<string | false>>;
//   showErrorAlert: (options: AlertOptions) => void;
//   showAlert: (options: AlertOptions) => void;
// };

// const RootContext = createContext<RootContextType | undefined>(undefined);

// export const RootProvider = ({ children }: any) => {
//   const [toast, showToast] = useState<string | false>(false);
//   const [error, setError] = useState<AlertOptions | false>(false);
//   const [alert, setAlert] = useState<AlertOptions | false>(false);
//   const [loading, showLoading] = useState<string | boolean>(false);

//   const showErrorAlert = ({ message, title, onOk, onCancel }: AlertOptions) => {
//     setError({ message, title, onOk, onCancel });
//   };

//   const showAlert = ({ message, title, onOk, onCancel }: AlertOptions) => {
//     setAlert({ message, title, onOk, onCancel });
//   };

//   return (
//     <RootContext.Provider
//       value={{
//         showToast,
//         showLoading,
//         showErrorAlert,
//         showAlert,
//       }}
//     >
//       {children}

//       {/* Error Alert */}
//       <Modal animationType="slide" transparent={true} visible={error != false}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <View style={styles.modalHeader}>
//               <Icon name="alert-circle-outline" size={24} color={'#f55'} />
//               {error && (
//                 <Text style={{ color: '#f55' }}>
//                   {error.title ?? 'Error! Something went wrong.'}
//                 </Text>
//               )}
//             </View>
//             {error && <Text style={styles.modalBodyText}>{error.message}</Text>}
//             <View style={styles.actions}>
//               <Pressable
//                 style={{ width: '30%' }}
//                 onPress={() => {
//                   if (error && error?.onOk) error.onOk();
//                   setError(false);
//                 }}
//               >
//                 <Text style={styles.ok}>OK</Text>
//               </Pressable>
//               <Pressable
//                 style={{ width: '30%' }}
//                 onPress={() => {
//                   if (error && error?.onCancel) error.onCancel();
//                   setError(false);
//                 }}
//               >
//                 <Text style={styles.cancel}>Cancel</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Alert */}
//       <Modal animationType="slide" transparent={true} visible={alert != false}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <View style={styles.modalHeader}>
//               <Icon name="alert-circle-outline" size={24} color={'#55f'} />
//               {alert && (
//                 <Text style={{ color: '#55f' }}>
//                   {alert.title ?? 'Alert! '}
//                 </Text>
//               )}
//             </View>
//             {alert && <Text style={styles.modalBodyText}>{alert.message}</Text>}
//             <View style={styles.actions}>
//               <Pressable
//                 style={{ width: '30%' }}
//                 onPress={() => {
//                   if (alert && alert?.onOk) alert.onOk();
//                   setAlert(false);
//                 }}
//               >
//                 <Text style={styles.ok}>OK</Text>
//               </Pressable>
//               <Pressable
//                 style={{ width: '30%' }}
//                 onPress={() => {
//                   if (alert && alert?.onCancel) alert.onCancel();
//                   setAlert(false);
//                 }}
//               >
//                 <Text style={styles.cancel}>Cancel</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Loading */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={loading != false}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.loadingView}>
//             <ActivityIndicator />
//             {loading && (
//               <Text numberOfLines={2}>
//                 {loading == true ? 'Loading. Please Wait....' : loading}
//               </Text>
//             )}
//           </View>
//         </View>
//       </Modal>
//     </RootContext.Provider>
//   );
// };

// export const useRoot = () => {
//   const context = useContext(RootContext);
//   if (!context) {
//     throw new Error('useRoot must be used within a RootProvider');
//   }
//   return context;
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalView: {
//     backgroundColor: 'white',
//     width: '90%',
//     padding: '2%',
//     elevation: 4,
//     maxHeight: '60%',
//   },
//   modalHeader: {
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     gap: 15,
//     borderBottomColor: '#999',
//     paddingBottom: '2%',
//     borderBottomWidth: 1,
//   },
//   modalBodyText: {
//     padding: '4%',
//     borderBottomColor: '#999',
//     paddingBottom: '2%',
//     borderBottomWidth: 1,
//     marginBottom: '2%',
//     flexShrink: 1,
//     flexGrow: 1,
//     overflow: 'hidden',
//   },
//   actions: {
//     flexDirection: 'row-reverse',
//     gap: 10,
//   },
//   cancel: {
//     backgroundColor: '#f55',
//     color: '#fff',
//     textAlign: 'center',
//     padding: '10%',
//     borderRadius: 5,
//   },
//   ok: {
//     backgroundColor: '#55f',
//     color: '#fff',
//     textAlign: 'center',
//     padding: '10%',
//     borderRadius: 5,
//   },
//   loadingView: {
//     backgroundColor: 'white',
//     width: '90%',
//     padding: '4%',
//     elevation: 4,
//     maxHeight: '60%',
//     flexDirection: 'row',
//     gap: 15,
//   },
// });
