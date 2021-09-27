import React from 'react';

import dayjs from 'dayjs';
import { Switch } from '@material-ui/core';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { ListItemProps } from './interfaces';
import {
  ListItemContainer,
  Description,
  SubDescription,
  MainContentContainer,
  Date,
  Data,
} from './styles';
import { Button, DynamicContent } from '../../atoms';

const ListItem: React.FC<ListItemProps> = ({
  secureId,
  description,
  subDescription,
  status,
  data,
  firstOptionIcon: FirstOptionIcon,
  setEnabled,
  enabled,
  firstOption,
  editItem,
  deleteItem,
}) => {
  const handleFirstOption = () => {
    if (firstOption) firstOption(secureId);
  };

  const handleEnable = () => {
    if (setEnabled) setEnabled(secureId, !!enabled);
  };

  return (
    <ListItemContainer>
      <DynamicContent style={{ marginRight: 10 }} visible={!!status}>
        <Date>{dayjs(status).format('DD-MMM')}</Date>
      </DynamicContent>

      <MainContentContainer>
        <Description>{description}</Description>
        <SubDescription>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(subDescription))}
        </SubDescription>
      </MainContentContainer>

      <Data>{data}</Data>

      <DynamicContent style={{ margin: 2 }} visible={!!setEnabled}>
        <Switch
          size="small"
          color="primary"
          checked={!!enabled}
          onChange={handleEnable}
        />
      </DynamicContent>

      <DynamicContent style={{ margin: 2 }} visible={!!FirstOptionIcon}>
        <Button onClick={handleFirstOption} buttonType="transparent">
          {FirstOptionIcon && <FirstOptionIcon />}
        </Button>
      </DynamicContent>
      <DynamicContent style={{ margin: 2 }} visible>
        <Button
          onClick={() => {
            editItem(secureId);
          }}
          buttonType="transparent"
        >
          <AiOutlineEdit />
        </Button>
      </DynamicContent>
      <DynamicContent style={{ margin: 2 }} visible>
        <Button onClick={() => deleteItem(secureId)} buttonType="transparent">
          <AiOutlineDelete />
        </Button>
      </DynamicContent>
    </ListItemContainer>
  );
};

export default ListItem;
