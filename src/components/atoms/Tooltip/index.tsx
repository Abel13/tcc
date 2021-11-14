import React from "react";
import { TooltipProps } from "./interfaces";

import { Body } from "./styles";

const Tooltip: React.FC<TooltipProps> = ({ title, className, children }) => {
  return (
    <Body className={className}>
      {children}
      <span>{title}</span>
    </Body>
  );
};

export default Tooltip;
