import { createContext, ReactNode, useContext, useState } from 'react';

export enum AuthState {
  none,
  public,
  admin,
}

type AuthContextType = {
  userData: UserDataType | undefined;
  setUserData: React.Dispatch<React.SetStateAction<UserDataType | undefined>>;
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserDataType>();
  const [authState, setAuthState] = useState<AuthState>(AuthState.none);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        authState,
        setAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
