import styled from 'styled-components';
import Colors from '../../../styles/colors.json';

export const CardContainer = styled.div`
  margin: 10px;
  width: 700px;
  height: 400px;
  border-radius: 8px;
  background-color: ${Colors.dark};

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px ${Colors.blackTransparent};
`;
