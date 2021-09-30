import styled from 'styled-components';

import Colors from '../../../styles/colors.json';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;

    h2 {
      color: ${Colors.light};
      font-size: 20px;
    }
  }
`;
