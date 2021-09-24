import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../components/pages/SignIn';
import Dashboard from '../components/pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
