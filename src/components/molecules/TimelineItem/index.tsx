import React, { useCallback } from 'react';
import dayjs from 'dayjs';
import {
  BiMessageSquareAdd,
  BiMessageSquareMinus,
  BiTransferAlt,
  BiTime,
} from 'react-icons/bi';
import { TimelineItemContainer, Date, Status } from './styles';

import { TimelineItemProps } from './interfaces';

const Profile: React.FC<TimelineItemProps> = ({
  kind,
  description,
  value,
  date,
}) => {
  const getIcon = useCallback(() => {
    switch (kind) {
      case 'incoming':
        return <BiMessageSquareAdd />;
      case 'outgoing':
        return <BiMessageSquareMinus />;
      case 'transfer':
        return <BiTransferAlt />;
      default:
        return <BiTime />;
    }
  }, [kind]);

  return (
    <TimelineItemContainer kind={kind}>
      <Status kind={kind}>
        {getIcon()}
        <>
          <Date>{dayjs(date).format('DD-MMM')}</Date>
          <Date>{dayjs(date).format('YYYY')}</Date>
        </>
      </Status>
      <div>
        <span>{description}</span>
        <span>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(value)}
        </span>
      </div>
    </TimelineItemContainer>
  );
};

export default Profile;
