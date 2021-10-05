import React, { createContext, useCallback, useContext, useState } from 'react';
import dayjs from 'dayjs';
import { reducer } from '../../utils/math';

import api from '../../services/api';
import { OutgoingContextData, OutgoingList, OutgoingState } from './interfaces';
import { Outgoing } from '../../models/outgoing';

const OutgoingContext = createContext<OutgoingContextData>(
  {} as OutgoingContextData,
);

export const OutgoingProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<OutgoingState>({} as OutgoingState);

  const getOutgoings = useCallback(
    async (startDate, endDate) => {
      setData({ ...data, loading: true });

      const response = await api.get<OutgoingList>(
        `outgoings/${startDate}/${endDate}`,
      );
      const { outgoings } = response.data;

      let total = 0;
      let datedOutgoings = [] as Outgoing[];
      if (outgoings && outgoings.length > 0) {
        total = outgoings
          .map(e => {
            return Number(e.value);
          })
          .reduce(reducer);

        datedOutgoings = outgoings.map(item => {
          return { ...item, date: dayjs(item.date).add(1, 'd').toDate() };
        }) as Outgoing[];
      }

      setData({ outgoings: datedOutgoings, loading: false, total });
    },
    [data],
  );

  return (
    <OutgoingContext.Provider
      value={{
        total: data.total,
        loading: data.loading,
        outgoings: data.outgoings,
        getOutgoings,
      }}
    >
      {children}
    </OutgoingContext.Provider>
  );
};

export function useOutgoing(): OutgoingContextData {
  const context = useContext(OutgoingContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
