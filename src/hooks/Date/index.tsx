import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import dayjs from 'dayjs';
import { DateContextData, DateState } from './interfaces';

const DateContext = createContext<DateContextData>({} as DateContextData);

export const DateProvider: React.FC = ({ children }) => {
  dayjs.locale('pt-br');

  const [data, setData] = useState<DateState>({} as DateState);

  const nextMonth = useCallback(async () => {
    const actualDate = dayjs(data.actualDate);
    const nextDate = dayjs(actualDate).add(1, 'month');
    const actualMonth = nextDate.format('MMM');
    const actualYear = nextDate.year();

    setData({
      actualDate: nextDate.format('YYYY-MM-DD'),
      endOfThisMonth: dayjs(nextDate).endOf('month').format('YYYY-MM-DD'),
      actualMonth,
      actualYear,
    });
  }, [data]);

  const previousMonth = useCallback(async () => {
    const actualDate = dayjs(data.actualDate);
    const previousDate = dayjs(actualDate).subtract(1, 'month');
    const actualMonth = previousDate.format('MMM');
    const actualYear = previousDate.year();

    setData({
      actualDate: previousDate.format('YYYY-MM-DD'),
      endOfThisMonth: dayjs(previousDate).endOf('month').format('YYYY-MM-DD'),
      actualMonth,
      actualYear,
    });
  }, [data]);

  useEffect(() => {
    const actualDate = dayjs(new Date());
    const actualMonth = actualDate.format('MMM');
    const actualYear = actualDate.year();

    setData({
      actualDate: dayjs(actualDate).startOf('month').format('YYYY-MM-DD'),
      endOfThisMonth: dayjs(actualDate).endOf('month').format('YYYY-MM-DD'),
      actualMonth,
      actualYear,
    });
  }, []);

  return (
    <DateContext.Provider
      value={{
        actualDate: data.actualDate,
        endOfThisMonth: data.endOfThisMonth,
        actualMonth: data.actualMonth,
        actualYear: data.actualYear,
        nextMonth,
        previousMonth,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export function useDate(): DateContextData {
  const context = useContext(DateContext);

  if (!context) {
    throw new Error('useDate must be used within an DateProvider');
  }

  return context;
}
