export interface IDays {
  day: string;
  utc: string;
  faDate: string;
  enDate: string;
  disable: boolean;
  isToDay: boolean;
  isFriday: boolean;
}

export interface IDaysInMonth {
  days: IDays[];
  monthName: string;
  month: number;
  today?: string;
}
