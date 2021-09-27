import { Transaction } from './transaction';

export interface Incoming extends Transaction {
  accountId: string;
  categoryId: string;
  accountName: string;
}
