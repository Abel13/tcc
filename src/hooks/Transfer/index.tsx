import React, { createContext, useCallback, useContext, useState } from "react";
import dayjs from "dayjs";
import { reducer } from "../../utils/math";

import api from "../../services/api";
import { TransferContextData, TransferList, TransferState } from "./interfaces";
import { Transfer } from "../../models/transfer";

const TransferContext = createContext<TransferContextData>(
  {} as TransferContextData
);

export const TransferProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<TransferState>({} as TransferState);

  const getTransfers = useCallback(async (startDate, endDate) => {
    setData({ ...data, loading: true });
    const response = await api.get<TransferList>(
      `transfers/${startDate}/${endDate}`
    );
    const { transfers } = response.data;

    let total = 0;
    let datedTransfers = [] as Transfer[];
    if (transfers && transfers.length > 0) {
      total = transfers
        .map((e) => {
          return Number(e.value);
        })
        .reduce(reducer);

      datedTransfers = transfers.map((item) => {
        return { ...item, date: dayjs(item.date).add(1, "d").toDate() };
      }) as Transfer[];
    }

    setData({ total, transfers: datedTransfers, loading: false });
  }, []);

  return (
    <TransferContext.Provider
      value={{
        total: data.total,
        loading: data.loading,
        transfers: data.transfers,
        getTransfers,
      }}
    >
      {children}
    </TransferContext.Provider>
  );
};

export function useTransfer(): TransferContextData {
  const context = useContext(TransferContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
