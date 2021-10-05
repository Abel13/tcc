import { Incoming } from '../../models/incoming';

export interface IncomingContextData {
  loading?: boolean;
  incomings: Incoming[];
  total: number;
  getIncomings(startDate: string, endDate: string): Promise<void>;
}

export interface IncomingState {
  loading?: boolean;
  incomings: Incoming[];
  total: number;
}

export interface IncomingList {
  incomings: Incoming[];
}
