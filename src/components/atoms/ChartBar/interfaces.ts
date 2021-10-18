import React from 'react';

export interface BarData {
  name: string;
  value: number;
}
export interface BarDef {
  x: number;
  y: number;
  width: number;
  height: number;
  value: string;
}
export interface ChartProps {
  data: BarData[];
}
export interface MouseEnterProps {
  data: any;
  index: number;
  e: React.MouseEvent;
}
