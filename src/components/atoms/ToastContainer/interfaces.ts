import { ToastMessage } from '../../../hooks/Toast/interfaces';

export interface ToastStyleProps {
  type?: 'success' | 'warning' | 'error' | 'info';
  hasDescription: boolean;
}

export interface ToastContainerProps {
  messages: ToastMessage[];
}

export interface ToastProps {
  message: ToastMessage;
  style: object;
}
