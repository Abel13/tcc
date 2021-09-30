import { SelectHTMLAttributes } from 'react';

export interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  gotError: boolean;
  disabled?: boolean;
  dataType?: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  items: ItemProps[];
}

export interface ItemProps extends SelectHTMLAttributes<HTMLOptionElement> {
  id: string;
  value: string;
  group?: string;
}
