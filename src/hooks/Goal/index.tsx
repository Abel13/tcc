import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../../services/api';
import { GoalContextData, GoalList, GoalState } from './interfaces';

const GoalContext = createContext<GoalContextData>({} as GoalContextData);

export const GoalProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<GoalState>({} as GoalState);

  const reducer = (accumulator: number, currentValue: number) =>
    Number(accumulator) + Number(currentValue);

  const getGoals = useCallback(async () => {
    setData({ ...data, loading: true });
    const response = await api.get<GoalList>('goals');

    const { goals } = response.data;
    if (goals && goals.length > 0) {
      const totalBalance = goals
        .map(e => {
          return Number(e.goalBalance);
        })
        .reduce(reducer);

      setData({ goals, totalBalance, loading: false });
    } else {
      setData({ goals, totalBalance: 0, loading: false });
    }
  }, []);

  return (
    <GoalContext.Provider
      value={{
        goals: data.goals,
        totalBalance: data.totalBalance,
        getGoals,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export function useGoal(): GoalContextData {
  const context = useContext(GoalContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
