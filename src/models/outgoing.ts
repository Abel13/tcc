import { Transaction } from './transaction';

export interface Outgoing extends Transaction {
  accountId: string;
  categoryId: string;
  accountName: string;
}
