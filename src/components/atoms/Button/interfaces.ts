import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  buttonType?: 'default' | 'transparent' | 'smallRounded' | 'danger';
}
