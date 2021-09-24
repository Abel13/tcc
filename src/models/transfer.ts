import { Transaction } from './transaction';

export interface Transfer extends Transaction {
  accountInId: string;
  accountInName: string;
  accountOutId: string;
  accountOutName: string;
}
