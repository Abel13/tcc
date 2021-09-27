import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container } from './styles';

const ButtonBack: React.FC = () => {
  return (
    <Container>
      <Link to="/dashboard">
        <FiArrowLeft />
      </Link>
    </Container>
  );
};

export default ButtonBack;
