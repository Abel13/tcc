import styled from 'styled-components';

import Colors from '../../../styles/colors.json';

export const Container = styled.div`
  padding: 15px 0;
  background: ${Colors.dark};
`;

export const Content = styled.div`
  min-height: 8vh;
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;
