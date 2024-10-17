import { create } from 'zustand';

type AlertOptions = {
  message: string;
  title?: string;
  onOk?: () => void;
  onCancel?: () => void;
};

type RootState = {
  toast: string | false;
  loading: string | boolean;
  errorAlert: AlertOptions | false;
  alert: AlertOptions | false;
  showToast: (message: string, duration?: number) => void;
  hideToast: () => void;
  showLoading: (message: string | boolean) => void;
  hideLoading: () => void;
  showErrorAlert: (options: AlertOptions) => void;
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
};

export const useCommonUIStore = create<RootState>((set) => {
  let toastTimeout: NodeJS.Timeout | null = null;

  return {
    toast: false,
    loading: false,
    errorAlert: false,
    alert: false,

    showToast: (message: string, duration: number = 2000) => {
      if (toastTimeout) {
        clearTimeout(toastTimeout);
      }
      set({ toast: message });
      toastTimeout = setTimeout(() => {
        set({ toast: false });
        toastTimeout = null;
      }, duration);
    },
    hideToast: () => set({ toast: false }),

    showLoading: (message: string | boolean) => set({ loading: message }),
    hideLoading: () => set({ loading: false }),

    showErrorAlert: (options: AlertOptions) => set({ errorAlert: options }),
    showAlert: (options: AlertOptions) => set({ alert: options }),
    hideAlert: () => set({ alert: false, errorAlert: false }),
  };
});
