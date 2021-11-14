import { Checkbox } from "@material-ui/core";
import React from "react";
import { BsCheck2Square, BsSquare } from "react-icons/bs";
import Colors from "../../../styles/colors.json";
import { CheckInterface } from "./interface";

const CustomCheckbox: React.FC<CheckInterface> = ({ ...rest }) => {
  return (
    <Checkbox
      icon={<BsSquare color={Colors.whiteTransparent} />}
      checkedIcon={<BsCheck2Square color={Colors.success} />}
      {...rest}
    />
  );
};

export default CustomCheckbox;
