import { TimelineItemProps } from '../../components/molecules/TimelineItem/interfaces';
import { Account } from '../../models/account';

export interface DashboardContextData {
  loading?: boolean;
  accounts: Account[];
  timeline: TimelineItemProps[];
  earnings: EarningItemProps[];
  totalBalance: number;
  getDashboard(): Promise<void>;
}

export interface EarningItemProps {
  balance: number;
  month: string;
}

export interface DashboardState {
  loading?: boolean;
  accounts: Account[];
  timeline: TimelineItemProps[];
  earnings: EarningItemProps[];
  totalBalance: number;
}
