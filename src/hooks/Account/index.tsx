import React, { createContext, useCallback, useContext, useState } from "react";

import api from "../../services/api";
import { reducer } from "../../utils/math";
import { AccountContextData, AccountList, AccountState } from "./interfaces";

const AccountContext = createContext<AccountContextData>(
  {} as AccountContextData
);

export const AccountProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AccountState>({
    loading: false,
  } as AccountState);

  const getAccounts = useCallback(async () => {
    setData({ ...data, loading: true });
    const response = await api.get<AccountList>("accounts");

    const { accounts } = response.data;
    if (accounts.length > 0) {
      const totalBalance = accounts
        .map((e) => {
          return Number(e.balance);
        })
        .reduce(reducer);

      setData({ accounts, totalBalance, loading: false });
    } else {
      setData({ accounts, totalBalance: 0, loading: false });
    }
  }, []);

  return (
    <AccountContext.Provider
      value={{
        accounts: data.accounts,
        totalBalance: data.totalBalance,
        loading: data.loading,
        getAccounts,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export function useAccount(): AccountContextData {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
