export interface DateContextData {
  actualDate: string;
  endOfThisMonth: string;
  actualMonth: string;
  actualYear: number;
  nextMonth(): void;
  previousMonth(): void;
}

export interface DateState {
  actualDate: string;
  endOfThisMonth: string;
  actualMonth: string;
  actualYear: number;
}
