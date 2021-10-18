import styled, { css } from 'styled-components';
import Colors from '../../../styles/colors.json';
import { TimelineStylesProps } from './interfaces';

const kindTimelineVariations = {
  incoming: css`
    background: ${Colors.success};
  `,
  outgoing: css`
    background: ${Colors.danger};
  `,
  transfer: css`
    background: ${Colors.info};
  `,
  default: css`
    background: ${Colors.warning};
  `,
};
const kindIconVariations = {
  incoming: css`
    color: ${Colors.success};
  `,
  outgoing: css`
    color: ${Colors.danger};
  `,
  transfer: css`
    color: ${Colors.info};
  `,
  default: css`
    color: ${Colors.warning};
  `,
};

export const TimelineItemContainer = styled.div<TimelineStylesProps>`
  flex: 1;
  display: flex;
  background: ${Colors.dark};
  margin: 5px;
  padding: 5px 2px;
  border-radius: 5px;
  position: relative;
  align-items: center;
  transition: transform 0.2s;

  div {
    display: flex;
    flex-direction: column;
    padding: 2px 10px;

    span {
      color: ${Colors.gray};
      font-size: 12px;
      font-weight: 400;
    }

    span + span {
      color: ${Colors.white};
      margin-top: 3px;
      font-size: 15px;
      font-weight: 400;
    }
  }

  &::before {
    content: '';
    position: absolute;
    height: 80%;
    width: 1px;
    top: 10%;
    ${props => kindTimelineVariations[props.kind || 'default']}
  }

  &:hover {
    transform: translateX(2px);
  }
`;

export const Status = styled.div<TimelineStylesProps>`
  align-items: center;
  justify-content: center;
  ${props => kindIconVariations[props.kind || 'default']}
`;

export const Date = styled.label`
  flex: 1;
  color: ${Colors.whiteTransparent};
  font-size: 8px;
`;
