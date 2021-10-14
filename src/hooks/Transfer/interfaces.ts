import { Transfer } from "../../models/transfer";

export interface TransferContextData {
  loading?: boolean;
  transfers: Transfer[];
  total: number;
  getTransfers(startDate: string, endDate: string): Promise<void>;
}

export interface TransferState {
  loading?: boolean;
  transfers: Transfer[];
  total: number;
}

export interface TransferList {
  transfers: Transfer[];
}
