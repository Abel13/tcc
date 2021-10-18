export interface TimelineItemProps {
  kind: 'incoming' | 'outgoing' | 'transfer' | 'default';
  description: string;
  value: number;
  date: Date;
}

export interface TimelineStylesProps {
  kind: 'incoming' | 'outgoing' | 'transfer' | 'default';
}
