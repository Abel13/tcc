import { SelectHTMLAttributes } from "react";

export interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  gotError: boolean;
  disabled?: boolean;
  dataType?: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  groups: GroupProps[];
}

export interface GroupProps {
  groupName?: string;
  groupColor?: string;
  items: ItemProps[];
}

export interface GroupStyleProps {
  groupColor?: string;
}

export interface ItemProps extends SelectHTMLAttributes<HTMLOptionElement> {
  id: string;
  value: string;
}
