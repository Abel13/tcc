import { Account } from '../../models/account';

export interface AccountContextData {
  loading?: boolean;
  accounts: Account[];
  totalBalance: number;
  getAccounts(): Promise<void>;
}

export interface AccountState {
  loading?: boolean;
  accounts: Account[];
  totalBalance: number;
}

export interface AccountList {
  accounts: Account[];
}
