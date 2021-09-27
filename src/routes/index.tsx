import React from "react";

import { Switch } from "react-router-dom";
import Route from "./Route";

import SignIn from "../components/pages/SignIn";
import Dashboard from "../components/pages/Dashboard";
import Accounts from "../components/pages/Accounts";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/accounts" component={Accounts} isPrivate />
  </Switch>
);

export default Routes;
