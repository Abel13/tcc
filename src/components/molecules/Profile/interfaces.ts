import { ImgHTMLAttributes } from 'react';

export interface ProfileProps extends ImgHTMLAttributes<HTMLImageElement> {
  name: string;
}
