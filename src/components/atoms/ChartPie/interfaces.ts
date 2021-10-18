import React from 'react';

export interface PieData {
  name: string;
  value: number;
  color?: string;
}
export interface ChartProps {
  data: PieData[];
}
export interface PieDef {
  cx: number;
  cy: number;
  midAngle: number;
  payload: any;
  percent: number;
  value: string;

  stroke: string;
  fill: string;
  legendType: string;
  startAngle: number;
  endAngle: number;
  innerRadius: number;
  outerRadius: number;
  paddingAngle: number;
  labelLine: boolean;
  hide: boolean;
  minAngle: number;
  isAnimationActive: boolean;
  animationBegin: number;
  animationDuration: number;
  animationEasing: string;
  nameKey: string;
  blendStroke: boolean;
}
export interface MouseEnterProps {
  data: any;
  index: number;
  e: React.MouseEvent;
}
