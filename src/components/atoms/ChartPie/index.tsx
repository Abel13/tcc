import React, { useState } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';

import { ChartProps, PieData, PieDef } from './interfaces';
import { PieContainer } from './styles';
import Colors from '../../../styles/colors.json';

const ChartPie: React.FC<ChartProps> = ({ data }) => {
  const [activeIndex, setIndex] = useState(0);

  const renderActiveShape: React.FC<PieDef> | any = (props: PieDef) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 5;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill={Colors.light}
          style={{ fontSize: 14 }}
        >
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(value))}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={14}
          textAnchor={textAnchor}
          fill={Colors.gray}
          style={{ fontSize: 12 }}
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const onPieEnter = (pieData: any | PieDef) => {
    const index = data
      .map((e: PieData) => {
        return e.name;
      })
      .indexOf(pieData.name);

    setIndex(index);
  };

  return (
    <PieContainer>
      <PieChart width={480} height={280}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          innerRadius={70}
          outerRadius={90}
          dataKey="value"
          onMouseOver={onPieEnter}
          isAnimationActive
          cx={240}
          cy={130}
          fill={Colors.primary}
        >
          {data.map(
            entry =>
              entry.color && (
                <Cell key={`cell-${entry.name}`} fill={entry.color} />
              ),
          )}
        </Pie>
      </PieChart>
    </PieContainer>
  );
};

export default ChartPie;
