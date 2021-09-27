import React from "react";
import { AccountProvider } from "./Account";

import { AuthProvider } from "./Auth";
import { ToastProvider } from "./Toast";

const AppProvider: React.FC = ({ children }) => (
  <ToastProvider>
    <AuthProvider>
      <AccountProvider>{children}</AccountProvider>
    </AuthProvider>
  </ToastProvider>
);

export default AppProvider;
