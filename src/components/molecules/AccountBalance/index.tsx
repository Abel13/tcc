import React from 'react';
import { AccountBalanceProps } from './interfaces';

import { Container } from './styles';
import { ContentLoader } from '../../atoms';

const AccountBalance: React.FC<AccountBalanceProps> = ({ balance }) => {
  return (
    <Container>
      <h2>Total:</h2>
      <span>
        {balance ? (
          Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(balance)
        ) : (
          <ContentLoader width={160} height={30} />
        )}
      </span>
    </Container>
  );
};

export default AccountBalance;
