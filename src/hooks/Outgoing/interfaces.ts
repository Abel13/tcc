import { Outgoing } from '../../models/outgoing';

export interface OutgoingContextData {
  loading?: boolean;
  outgoings: Outgoing[];
  total: number;
  getOutgoings(startDate: string, endDate: string): Promise<void>;
}

export interface OutgoingState {
  loading?: boolean;
  outgoings: Outgoing[];
  total: number;
}

export interface OutgoingList {
  outgoings: Outgoing[];
}
