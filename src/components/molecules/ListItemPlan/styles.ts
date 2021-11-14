import styled, { css } from "styled-components";

import Colors from "../../../styles/colors.json";
import { CategoryProps } from "./interfaces";

export const Description = styled.strong`
  color: ${Colors.white};
  font-size: 18px;
`;

export const Value = styled.span`
  flex: 1;
  color: ${Colors.primary};
  font-size: 14px;
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Category = styled.span`
  flex: 1;
  color: ${Colors.whiteTransparent};
  font-size: 14px;
`;

export const Date = styled.span`
  flex: 1;
  color: ${Colors.whiteTransparent};
  font-size: 10px;
`;

export const MainContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const categoryTypeVariations = {
  default: css`
    background: ${Colors.primary};
  `,
  fixedExpenses: css`
    background: ${Colors.fixedExpenses};
  `,
  variableExpenses: css`
    background: ${Colors.variableExpenses};
  `,
  revenues: css`
    background: ${Colors.revenues};
  `,
  investments: css`
    background: ${Colors.investments};
  `,
};

export const ListItemPlanContainer = styled.div<CategoryProps>`
  position: relative;
  margin: 2px 10px;
  padding: 2px 2%;
  background: ${Colors.dark};
  display: flex;
  max-height: 110px;
  border-radius: 10px;
  align-items: center;
  transition: transform 0.2s;

  &::before {
    content: "";
    position: absolute;
    height: 60%;
    width: 1px;
    left: 2px;
    top: 20%;
    ${(props) => categoryTypeVariations[props.categoryType || "default"]}
  }

  &:hover {
    transform: translateX(10px);
  }
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px 10px;
  width: 60px;

  span {
    color: ${Colors.info};
    font-size: 10px;
    padding: 2px 0;
    text-align: center;
    flex-wrap: wrap;
  }
`;
