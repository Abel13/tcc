export interface GoalFormData {
  secureId?: string;
  description: string;
  goalValue: number;
}

export interface GoalIncomingFormData {
  secureId?: string;
  value: number;
  date: Date;
}
