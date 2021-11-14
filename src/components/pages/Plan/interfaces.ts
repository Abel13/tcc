export interface PlanFormData {
  secureId?: string;
  categoryId?: string;
  goalId?: string;
  description: string;
  value: number;
  dueDate: string;
  done: boolean;
  repeat?: "once" | "daily" | "weekly" | "monthly" | "yearly";
}
