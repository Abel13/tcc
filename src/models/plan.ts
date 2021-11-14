import { Category } from "./category";
import { Goal } from "./goal";

export interface Plan {
  secureId: string;
  categoryId?: string;
  goalId?: string;
  group: string;
  value: number;
  dueDate: Date;
  description: string;
  category?: string;
  goal?: string;
  done: boolean;
  stop: boolean;
  repeat?: "once" | "daily" | "weekly" | "monthly" | "yearly";
}
