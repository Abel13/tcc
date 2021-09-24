import { shade } from 'polished';

import styled, { keyframes } from 'styled-components';
import Colors from '../../../styles/colors.json';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${Colors.dark};
  border-radius: 10px;
  padding: 50px 10px;

  width: 500px;
`;

const appearFromLeft = keyframes`
from{
  opacity: 0;
  transform: translateX(-50px);
}
to{
  opacity: 1;
  transform: translateX(0);
}
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 20px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: ${Colors.light};
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, Colors.light)};
      }
    }

    button {
      margin-top: 16px;
    }
  }

  > a {
    color: ${Colors.primary};
    display: block;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, Colors.primary)};
    }

    svg {
      margin-right: 16px;
    }
  }
`;
