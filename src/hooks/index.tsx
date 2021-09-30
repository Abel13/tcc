import React from "react";

import { AccountProvider } from "./Account";
import { AuthProvider } from "./Auth";
import { CategoryProvider } from "./Category";
import { DateProvider } from "./Date";
import { IncomingProvider } from "./Incoming";
import { ToastProvider } from "./Toast";

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <DateProvider>
        {/* <DashboardProvider> */}
        {/* <CashFlowProvider> */}
        <AccountProvider>
          {/* <GoalProvider> */}
          <CategoryProvider>
            {/* <OutgoingProvider> */}
            <IncomingProvider>
              {/* <TransferProvider> */}
              {children}
              {/* </TransferProvider> */}
            </IncomingProvider>
            {/* </OutgoingProvider> */}
          </CategoryProvider>
          {/* </GoalProvider> */}
        </AccountProvider>
        {/* </CashFlowProvider> */}
        {/* </DashboardProvider> */}
      </DateProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
