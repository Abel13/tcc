export interface PageTitleProps {
  title: string;
  total?: number;
  month: string;
  year: number;
  forwardMonth(): void;
  backwardMonth(): void;
}
