import React from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { Container } from "./styles";

import { Button } from "../../atoms";
import { NavigationButtonsProps } from "./interfaces";

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  month,
  year,
  forwardMonth,
  backwardMonth,
}) => {
  return (
    <Container>
      <div>
        <Button buttonType="transparent" onClick={backwardMonth}>
          <AiFillCaretLeft size={30} />
        </Button>
        <h2>{`${month} ${year}`}</h2>
        <Button buttonType="transparent" onClick={forwardMonth}>
          <AiFillCaretRight size={30} />
        </Button>
      </div>
    </Container>
  );
};

export default NavigationButtons;
