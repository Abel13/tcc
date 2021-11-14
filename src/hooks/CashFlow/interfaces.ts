export interface CashFlowContextData {
  loading?: boolean;
  totalIncomings: number;
  totalIncomingsPlan: number;
  totalVariable: number;
  totalVariablePlan: number;
  totalFixed: number;
  totalFixedPlan: number;
  totalInvestments: number;
  totalInvestmentsPlan: number;

  investments: categoryItem[];
  incomings: categoryItem[];
  variableOutgoings: categoryItem[];
  fixedOutgoings: categoryItem[];

  planIssue: boolean;
  realizedIssue: boolean;

  getCashFlow(startDate: string, endDate: string): Promise<void>;
}

export interface CashFlowState {
  loading?: boolean;
  totalIncomings: number;
  totalIncomingsPlan: number;
  totalVariable: number;
  totalVariablePlan: number;
  totalFixed: number;
  totalFixedPlan: number;
  totalInvestments: number;
  totalInvestmentsPlan: number;

  investments: categoryItem[];
  incomings: categoryItem[];
  variableOutgoings: categoryItem[];
  fixedOutgoings: categoryItem[];

  planIssue: boolean;
  realizedIssue: boolean;
}

export interface categoryItem {
  name: string;
  value: number;
  plan: number;
}
