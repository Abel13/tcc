import React from "react";

import { Switch } from "react-router-dom";
import Route from "./Route";

import SignIn from "../components/pages/SignIn";
import Dashboard from "../components/pages/Dashboard";
import Accounts from "../components/pages/Accounts";
import Incomings from "../components/pages/Incomings";
import Outgoings from "../components/pages/Outgoings";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/accounts" component={Accounts} isPrivate />
    <Route path="/incomings" component={Incomings} isPrivate />
    <Route path="/outgoings" component={Outgoings} isPrivate />
  </Switch>
);

export default Routes;
