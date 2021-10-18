import styled from 'styled-components';

import Colors from '../../../styles/colors.json';

export const Description = styled.strong`
  color: ${Colors.gray};
  font-size: 20px;
  font-weight: 400;
  margin-left: 20px;
  margin-bottom: 5px;
`;

export const Container = styled.div`
  margin: 5px 20px;
  background: ${Colors.dark};
  padding: 10px 2px;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  position: relative;
  align-items: center;
  transition: transform 0.2s;

  div {
    display: flex;
    flex-direction: column;
    padding: 2px 0px;
  }

  div + div {
    display: flex;
    flex-direction: row;
    margin-left: auto;

    Button {
      color: ${Colors.primary};
    }
  }

  &::before {
    content: '';
    position: absolute;
    height: 80%;
    width: 1px;
    top: 10%;
    background: ${Colors.primary};
  }

  span {
    color: ${Colors.white};
    font-size: 15px;
    font-weight: 400;
    margin-left: 20px;
  }

  &:hover {
    transform: translateX(10px);
  }
`;
