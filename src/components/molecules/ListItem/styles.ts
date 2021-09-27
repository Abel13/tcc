import styled from 'styled-components';

import Colors from '../../../styles/colors.json';

export const Description = styled.strong`
  color: ${Colors.white};
  font-size: 18px;
`;

export const SubDescription = styled.span`
  flex: 1;
  color: ${Colors.primary};
  font-size: 14px;
`;
export const Data = styled.span`
  flex: 1;
  color: ${Colors.info};
  font-size: 20px;
  text-align: end;
  margin-right: 5%;
`;

export const Date = styled.span`
  flex: 1;
  color: ${Colors.whiteTransparent};
  font-size: 10px;
`;

export const MainContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const ListItemContainer = styled.div`
  position: relative;
  margin: 2px 10px;
  padding: 2px 2%;
  background: ${Colors.dark};
  display: flex;
  max-height: 110px;
  border-radius: 10px;
  align-items: center;
  transition: transform 0.2s;

  &::before {
    content: '';
    position: absolute;
    height: 60%;
    width: 1px;
    left: 2px;
    top: 20%;
    background: ${Colors.primary};
  }

  &:hover {
    transform: translateX(10px);
  }
`;

export const ButtonContainer = styled.div`
  margin: 2px;
`;
