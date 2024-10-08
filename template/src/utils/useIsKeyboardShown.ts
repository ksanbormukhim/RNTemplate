import * as React from 'react';
import { EmitterSubscription, Keyboard, Platform } from 'react-native';

/*
 * Custom hook borrowed from https://github.com/react-navigation/react-navigation/blob/main/packages/bottom-tabs/src/utils/useIsKeyboardShown.tsx
 * return true if keyboard is shown
 */
export default function useIsKeyboardShown() {
  const [isKeyboardShown, setIsKeyboardShown] = React.useState(false);

  React.useEffect(() => {
    const handleKeyboardShow = () => setIsKeyboardShown(true);
    const handleKeyboardHide = () => setIsKeyboardShown(false);

    let subscriptions: EmitterSubscription[];

    if (Platform.OS === 'ios') {
      subscriptions = [
        Keyboard.addListener('keyboardWillShow', handleKeyboardShow),
        Keyboard.addListener('keyboardWillHide', handleKeyboardHide),
      ];
    } else {
      subscriptions = [
        Keyboard.addListener('keyboardDidShow', handleKeyboardShow),
        Keyboard.addListener('keyboardDidHide', handleKeyboardHide),
      ];
    }

    return () => {
      subscriptions.forEach((s) => s.remove());
    };
  }, []);

  return isKeyboardShown;
}
