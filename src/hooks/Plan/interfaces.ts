import { Plan } from "../../models/plan";

export interface PlanContextData {
  loading?: boolean;
  plans: Plan[];
  getPlan(startDate: string, endDate: string): Promise<void>;
  postPlan(plan: any): Promise<void>;
  deletePlan(secureId: string): Promise<void>;
  updatePlan(secureId: string, plan: any): Promise<void>;
  finishPlan(secureId: string, status: boolean): Promise<void>;
}

export interface PlanState {
  loading?: boolean;
  plans: Plan[];
}
