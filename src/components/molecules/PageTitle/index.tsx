import React from "react";
import { PageTitleContainer, LeftContent, RightContent } from "./styles";

import { PageTitleProps } from "./interfaces";
import { DynamicContent } from "../../atoms";
import { NavigationButtons } from "..";

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  total,
  month,
  year,
  forwardMonth,
  backwardMonth,
}) => {
  return (
    <PageTitleContainer>
      <LeftContent>
        <strong>{title}</strong>
      </LeftContent>
      <NavigationButtons
        month={month || ""}
        year={year || 2000}
        forwardMonth={forwardMonth}
        backwardMonth={backwardMonth}
      />
      <RightContent>
        <DynamicContent visible={!!total}>
          <strong>
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(total || 0)}
          </strong>
        </DynamicContent>
      </RightContent>
    </PageTitleContainer>
  );
};

export default PageTitle;
