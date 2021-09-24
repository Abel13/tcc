import React from 'react';
import { Route as ReactDOMRoute, Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';
import { RouteProps } from './interfaces';

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user, token } = useAuth();

  api.defaults.headers.common = { Authorization: `bearer ${token}` };

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === (!!user && !!token) ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
