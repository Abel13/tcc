export interface TransferItemProps {
  value: number;
  date: Date;
  accountInName: string;
  accountOutName: string;
  secureId: string;
  editTransfer(key: string): void;
  deleteTransfer(key: string): void;
}
