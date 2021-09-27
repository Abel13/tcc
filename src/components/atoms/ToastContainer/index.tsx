import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast';

import { ToastContainerProps } from './interfaces';

import { Container } from './styles';

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 0.9 },
      leave: { right: '-120%', opacity: 0 },
    },
  );

  messagesWithTransitions.map(data => {
    return null;
  });

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
