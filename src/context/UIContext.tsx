import { createContext, ReactNode, useState } from 'react';

type UIContext = {
  setError: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      message: string;
    }>
  >;
  setToast: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      message: string;
    }>
  >;
  setAlert: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      message: string;
    }>
  >;
  setLoading: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      message: string;
    }>
  >;
};

const UIContext = createContext<UIContext | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState({ show: false, message: '' });
  const [toast, setToast] = useState({ show: false, message: '' });
  const [alert, setAlert] = useState({ show: false, message: '' });
  const [loading, setLoading] = useState({ show: false, message: '' });

  <UIContext.Provider value={{ setError, setToast, setAlert, setLoading }}>
    {children}
  </UIContext.Provider>;
};
