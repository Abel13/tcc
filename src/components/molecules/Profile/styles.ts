import styled from 'styled-components';

import Colors from '../../../styles/colors.json';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: ${Colors.white};
    }

    a {
      text-decoration: none;
      color: ${Colors.primary};

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Image = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;
