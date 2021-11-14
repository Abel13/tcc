import { Plan } from "../../../models/plan";

export interface ListItemPlanProps {
  plan: Plan;

  editItem(key: string): void;
  deleteItem(key: string): void;
  finishPlan(status: boolean, key: string): void;
}

export interface CategoryProps {
  categoryType?:
    | "default"
    | "fixedExpenses"
    | "variableExpenses"
    | "revenues"
    | "investments";
}
