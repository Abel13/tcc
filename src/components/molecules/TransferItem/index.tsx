import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Button } from '../../atoms';
import { TransferItemProps } from './interfaces';

import { Container, Description } from './styles';

const TransferItem: React.FC<TransferItemProps> = ({
  secureId,
  value,
  accountInName,
  accountOutName,
  editTransfer,
  deleteTransfer,
}) => {
  return (
    <Container>
      <div>
        <Description>{`de ${accountOutName} para ${accountInName}`}</Description>
        <div>
          <span>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(value)}
          </span>
        </div>
      </div>

      <div>
        <Button
          buttonType="transparent"
          onClick={() => {
            editTransfer(secureId);
          }}
        >
          <AiOutlineEdit />
        </Button>
        <Button
          buttonType="transparent"
          onClick={() => deleteTransfer(secureId)}
        >
          <AiOutlineDelete />
        </Button>
      </div>
    </Container>
  );
};

export default TransferItem;
