import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
// import { Container } from './styles';
import { DashboardPage } from '../../../locale/pt/dictionary.json';
import { Button, Loading } from '../../atoms';
import { ActionButtonsProps } from './interfaces';

const Profile: React.FC<ActionButtonsProps> = ({ loading, cancelAction }) => {
  return (
    <div>
      <Button buttonType="danger" type="reset" onClick={cancelAction}>
        Cancelar
      </Button>

      <Button type="submit">
        {loading ? (
          <Loading loading color="text" size={20} type="puff" />
        ) : (
          'Salvar'
        )}
      </Button>
    </div>
  );
};

export default Profile;
