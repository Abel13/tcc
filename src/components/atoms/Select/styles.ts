import styled, { css } from 'styled-components';

import { shade } from 'polished';
import Colors from '../../../styles/colors.json';
import Tooltip from '../Tooltip';
import { ContainerProps } from './interfaces';

export const Container = styled.div<ContainerProps>`
  background: ${Colors.inputs};
  border-radius: 10px;
  border: 2px solid ${Colors.inputs};
  padding: 16px;
  width: 100%;
  color: ${Colors.grayHard};

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.gotError &&
    css`
      transition: border-bottom-color 0.8s;

      border-bottom-color: ${Colors.danger};
    `}

  ${props =>
    props.isFocused &&
    css`
      transition: border-bottom-color 0.8s;

      border-bottom-color: ${Colors.primary};
      color: ${Colors.primary};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: ${Colors.primary};
    `}

  select {
    flex: 1;
    border: 0;
    background: transparent;
    font-family: 'Montserrat', serif;
    font-size: 16px;

    ${props =>
      props.disabled
        ? css`
            color: ${Colors.grayHard};
          `
        : css`
            color: ${Colors.light};
          `}

    &::placeholder {
      color: ${Colors.grayHard};
    }

    option {
      color: ${Colors.light};
      background: ${Colors.inputs};
      font-size: 14px;
      font-weight: small;
      display: flex;
      /* white-space: pre; */
      /* min-height: 40px; */
      padding: 10px;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: ${Colors.danger};

    &::before {
      border-color: ${Colors.danger} transparent;
    }
  }
`;
