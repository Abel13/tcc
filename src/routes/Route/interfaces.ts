import React from 'react';
import { RouteProps as ReactDOMRouteProps } from 'react-router-dom';

export interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}
