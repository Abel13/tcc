import styled from 'styled-components';
import Colors from '../../../styles/colors.json';

export const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 200px;

  h1 {
    color: ${Colors.info};
  }

  span {
    color: ${Colors.grayHard};
  }
`;
