import styled, { css } from "styled-components";
import Colors from "../../../styles/colors.json";
import { CashFlowData } from "./interfaces";

const kindVariations = {
  revenue: css`
    background: ${Colors.warning};
  `,
  investment: css`
    background: ${Colors.info};
  `,
  fixed: css`
    background: ${Colors.danger};
  `,
  variable: css`
    background: ${Colors.success};
  `,
  total: css`
    background: ${Colors.secondary};
  `,
};

export const ReportContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100vh;
  max-height: 100vh;
`;

export const CashFlowReport = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 20px 10px 0px 0px;
`;

export const CashFlowBody = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  margin: 10px;
`;

export const DataContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0px 10px;
`;

export const IncomingContainer = styled.div<CashFlowData>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 10px;

  span {
    padding: 2px;
    padding-left: 10px;
    font-size: 14px;
    font-weight: bold;
    ${(props) => kindVariations[props.kind || "revenue"]};
  }
`;

export const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

export const PlanedChart = styled.div`
  padding: 15px;
  border: 1px ${Colors.whiteTransparent} solid;
`;

export const CarriedOutChart = styled.div`
  padding: 15px;
  margin-top: 10px;
  border: 1px ${Colors.whiteTransparent} solid;
`;

export const PlannedContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  svg {
    color: ${Colors.danger};
  }
`;
