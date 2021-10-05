import React, { createContext, useCallback, useContext, useState } from 'react';
import dayjs from 'dayjs';
import { reducer } from '../../utils/math';

import api from '../../services/api';
import { IncomingContextData, IncomingList, IncomingState } from './interfaces';
import { Incoming } from '../../models/incoming';

const IncomingContext = createContext<IncomingContextData>(
  {} as IncomingContextData,
);

export const IncomingProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IncomingState>({} as IncomingState);

  const getIncomings = useCallback(async (startDate, endDate) => {
    setData({ ...data, loading: true });
    const response = await api.get<IncomingList>(
      `incomings/${startDate}/${endDate}`,
    );
    const { incomings } = response.data;

    let total = 0;
    let datedIncomings = [] as Incoming[];
    if (incomings && incomings.length > 0) {
      total = incomings
        .map(e => {
          return Number(e.value);
        })
        .reduce(reducer);

      datedIncomings = incomings.map(item => {
        return { ...item, date: dayjs(item.date).add(1, 'd').toDate() };
      }) as Incoming[];
    }

    setData({ total, incomings: datedIncomings, loading: false });
  }, []);

  return (
    <IncomingContext.Provider
      value={{
        total: data.total,
        loading: data.loading,
        incomings: data.incomings,
        getIncomings,
      }}
    >
      {children}
    </IncomingContext.Provider>
  );
};

export function useIncoming(): IncomingContextData {
  const context = useContext(IncomingContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
