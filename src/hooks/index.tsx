import React from "react";

import { AccountProvider } from "./Account";
import { AuthProvider } from "./Auth";
import { CategoryProvider } from "./Category";
import { DateProvider } from "./Date";
import { IncomingProvider } from "./Incoming";
import { OutgoingProvider } from "./Outgoing";
import { TransferProvider } from "./Transfer";
import { ToastProvider } from "./Toast";
import { GoalProvider } from "./Goal";
import { DashboardProvider } from "./Dashboard";

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <DateProvider>
        <DashboardProvider>
          {/* <CashFlowProvider> */}
          <AccountProvider>
            <GoalProvider>
              <CategoryProvider>
                <OutgoingProvider>
                  <IncomingProvider>
                    <TransferProvider>{children}</TransferProvider>
                  </IncomingProvider>
                </OutgoingProvider>
              </CategoryProvider>
            </GoalProvider>
          </AccountProvider>
          {/* </CashFlowProvider> */}
        </DashboardProvider>
      </DateProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
