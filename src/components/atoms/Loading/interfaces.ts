export type LengthType = number | string;

export interface LoadingProps {
  loading?: boolean;
  size?: LengthType;
  showDescription?: boolean;
  color?: 'primary' | 'text';
  type?:
    | 'bounce'
    | 'clip'
    | 'bar'
    | 'beat'
    | 'circle'
    | 'climbingBox'
    | 'clock'
    | 'dot'
    | 'fade'
    | 'grid'
    | 'hash'
    | 'moon'
    | 'pacman'
    | 'propagate'
    | 'pulse'
    | 'puff'
    | 'ring'
    | 'rise'
    | 'rotate'
    | 'scale'
    | 'skew'
    | 'square'
    | 'sync';
}
