import styled, { css } from 'styled-components';
import Colors from '../../../styles/colors.json';
import { LoadingProps } from './interfaces';

const colorSelected = {
  primary: css`
    color: ${Colors.primary};
  `,
  text: css`
    color: ${Colors.light};
  `,
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

export const Text = styled.span<LoadingProps>`
  margin-top: 5px;
  ${props => colorSelected[props.color || 'primary']}
`;
