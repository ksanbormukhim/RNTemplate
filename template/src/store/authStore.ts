import { create } from 'zustand';
import { UserDataType } from '../types';

export enum AuthState {
  none,
  public,
  admin,
}

type AuthStateType = {
  userData: UserDataType | undefined;
  setUserData: (userData: UserDataType | undefined) => void;
  authState: AuthState;
  setAuthState: (authState: AuthState) => void;
  login: (user: UserDataType) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStateType>((set) => {
  return {
    userData: undefined,
    authState: AuthState.none,
    setUserData: (userData) => set({ userData }),
    setAuthState: (authState) => set({ authState }),
    login: (user) => {
      set({
        userData: user,
        authState: user.role === 'admin' ? AuthState.admin : AuthState.public,
      });
    },
    logout: () => {
      set({
        userData: undefined,
        authState: AuthState.none,
      });
    },
  };
});
