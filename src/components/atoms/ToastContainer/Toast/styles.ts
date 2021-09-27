import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

import { lighten, shade } from 'polished';
import Colors from '../../../../styles/colors.json';
import { ToastStyleProps } from '../interfaces';

const toastTypeVariations = {
  info: css`
    background: ${lighten(0.45, Colors.info)};
    color: ${shade(0.1, Colors.info)};
  `,
  success: css`
    background: ${lighten(0.45, Colors.success)};
    color: ${shade(0.1, Colors.success)};
  `,
  warning: css`
    background: ${lighten(0.4, Colors.warning)};
    color: ${shade(0.1, Colors.warning)};
  `,
  error: css`
    background: ${lighten(0.4, Colors.danger)};
    color: ${shade(0.1, Colors.danger)};
  `,
};

export const Container = styled(animated.div)<ToastStyleProps>`
  width: 360px;

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px ${Colors.blackTransparent};

  display: flex;

  & + div {
    margin-top: 8px;
  }

  ${props => toastTypeVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props =>
    !props.hasDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
