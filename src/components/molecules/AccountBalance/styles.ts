import styled from 'styled-components';

import Colors from '../../../styles/colors.json';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 100px;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${Colors.primary};

  span {
    font-size: 25px;
    margin-left: auto;
  }
`;
