import React, { createContext, useCallback, useContext, useState } from "react";

import api from "../../services/api";
import { CashFlowState, CashFlowContextData } from "./interfaces";

const CashFlowContext = createContext<CashFlowContextData>(
  {} as CashFlowContextData
);

export const CashFlowProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<CashFlowState>({} as CashFlowState);

  const getCashFlow = useCallback(async (startDate, endDate) => {
    setData({ ...data, loading: true });
    const response = await api.get<CashFlowState>(
      `cashflow/${startDate}/${endDate}`
    );

    const {
      totalIncomings,
      totalVariable,
      totalFixed,
      totalInvestments,
      totalIncomingsPlan,
      totalVariablePlan,
      totalFixedPlan,
      totalInvestmentsPlan,

      incomings,
      investments,
      variableOutgoings,
      fixedOutgoings,
    } = response.data;

    setData({
      totalIncomings,
      totalIncomingsPlan,
      totalFixed,
      totalFixedPlan,
      totalVariable,
      totalVariablePlan,
      totalInvestments,
      totalInvestmentsPlan,

      incomings,
      variableOutgoings,
      fixedOutgoings,
      investments,

      planIssue: false,
      loading: false,
    });
  }, []);

  return (
    <CashFlowContext.Provider
      value={{
        totalIncomings: Number(data.totalIncomings),
        totalFixed: Number(data.totalFixed),
        totalInvestments: Number(data.totalInvestments),
        totalVariable: Number(data.totalVariable),
        totalIncomingsPlan: Number(data.totalIncomingsPlan),
        totalFixedPlan: Number(data.totalFixedPlan),
        totalInvestmentsPlan: Number(data.totalInvestmentsPlan),
        totalVariablePlan: Number(data.totalVariablePlan),

        incomings: data.incomings,
        variableOutgoings: data.variableOutgoings,
        fixedOutgoings: data.fixedOutgoings,
        investments: data.investments,

        planIssue: data.planIssue,

        loading: data.loading,
        getCashFlow,
      }}
    >
      {children}
    </CashFlowContext.Provider>
  );
};

export function useCashFLow(): CashFlowContextData {
  const context = useContext(CashFlowContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
