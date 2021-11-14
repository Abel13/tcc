import React, { createContext, useCallback, useContext, useState } from "react";

import dayjs from "dayjs";
import api from "../../services/api";
import { DashboardContextData, DashboardState } from "./interfaces";

const DashboardContext = createContext<DashboardContextData>(
  {} as DashboardContextData
);

export const DashboardProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<DashboardState>({} as DashboardState);

  const getDashboard = useCallback(async () => {
    setData({ ...data, loading: true });
    const response = await api.get<DashboardState>("Dashboard");

    const { accounts, totalBalance, timeline, earnings } = response.data;

    const datedTimeLine =
      timeline &&
      timeline.map((item) => {
        return { ...item, date: dayjs(item.date).add(1, "d").toDate() };
      });

    setData({
      earnings,
      accounts,
      totalBalance,
      timeline: datedTimeLine,
      loading: false,
    });
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        accounts: data.accounts,
        totalBalance: data.totalBalance,
        timeline: data.timeline,
        earnings: data.earnings,
        loading: data.loading,
        getDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export function useDashboard(): DashboardContextData {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
