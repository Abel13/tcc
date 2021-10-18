import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ChartProps } from "./interfaces";
import { ToolTipContainer, ToolTipContent, ToolTipTitle } from "./styles";
import Colors from "../../../styles/colors.json";
import EmptyData from "../EmptyData";

const ChartBar: React.FC<ChartProps> = ({ data }) => {
  const values = data.map((i) => i.value);
  const max = Math.ceil(Math.max(...values));
  return data.length > 0 ? (
    <BarChart width={data.length * 70} height={250} data={data}>
      <XAxis dataKey="name" stroke={Colors.primary} />
      <YAxis type="number" domain={[0, max]} />
      <Tooltip
        content={(props: any) => {
          const { payload } = props;
          return payload && payload[0] ? (
            <ToolTipContainer>
              <ToolTipTitle>{`Total ${props.label}`}</ToolTipTitle>
              <ToolTipContent>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(payload[0].value))}
              </ToolTipContent>
            </ToolTipContainer>
          ) : (
            <ToolTipContainer />
          );
        }}
      />
      <CartesianGrid stroke={Colors.whiteTransparent} strokeDasharray="5 5" />
      <Bar dataKey="value" fill={Colors.secondary} barSize={30} />
    </BarChart>
  ) : (
    <EmptyData />
  );
};

export default ChartBar;
