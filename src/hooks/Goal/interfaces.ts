import { Goal } from '../../models/goal';

export interface GoalContextData {
  loading?: boolean;
  goals: Goal[];
  totalBalance: number;
  getGoals(): Promise<void>;
}

export interface GoalState {
  loading?: boolean;
  goals: Goal[];
  totalBalance: number;
}

export interface GoalList {
  goals: Goal[];
}
