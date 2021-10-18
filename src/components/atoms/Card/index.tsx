import React from 'react';
import { CardContainer } from './styles';

import { CardProps } from './interfaces';

const Card: React.FC<CardProps> = ({ children }) => (
  <CardContainer>{children}</CardContainer>
);

export default Card;
