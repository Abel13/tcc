export interface SearchMonth {
  beginningDate: Date;
  endingDate: Date;
}

export interface NavigationButtonsProps {
  month: string;
  year: number;
  forwardMonth(): void;
  backwardMonth(): void;
}
