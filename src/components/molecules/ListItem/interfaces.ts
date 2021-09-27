import React from 'react';
import { IconBaseProps } from 'react-icons';

export interface ListItemProps {
  secureId: string;
  description: string;
  status?: Date | string;
  data?: string | number;
  subDescription: string | number;
  enabled?: boolean;
  firstOptionIcon?: React.ComponentType<IconBaseProps>;
  secondOptionIcon?: React.ComponentType<IconBaseProps>;
  thirdOptionIcon?: React.ComponentType<IconBaseProps>;
  setEnabled?(key: string, enabled: boolean): void;
  firstOption?(key: string): void;
  editItem(key: string): void;
  deleteItem(key: string): void;
}
