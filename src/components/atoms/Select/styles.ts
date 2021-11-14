import styled, { css } from "styled-components";

import { lighten } from "polished";
import Colors from "../../../styles/colors.json";
import Tooltip from "../Tooltip";
import { ContainerProps, GroupStyleProps } from "./interfaces";

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

  ${(props: any) =>
    props.gotError &&
    css`
      transition: border-bottom-color 0.8s;

      border-bottom-color: ${Colors.danger};
    `}

  ${(props: any) =>
    props.isFocused &&
    css`
      transition: border-bottom-color 0.8s;

      border-bottom-color: ${Colors.primary};
      color: ${Colors.primary};
    `}

  ${(props: any) =>
    props.isFilled &&
    css`
      color: ${Colors.primary};
    `}
`;

export const CustomSelect = styled.select`
  flex: 1;
  border: 0;
  background: transparent;
  font-family: "Montserrat", serif;
  font-size: 16px;
  color: ${Colors.light};

  &::placeholder {
    color: ${Colors.grayHard};
  }
`;

export const ItemsGroup = styled.optgroup<GroupStyleProps>`
  color: ${Colors.dark};
  background: ${Colors.blackTransparent};
  font-size: 14px;

  ${(props: any) =>
    props.groupColor &&
    css`
      background: ${lighten(0.2, props.groupColor)};
    `}
`;

export const CustomOption = styled.option`
  color: ${Colors.light};
  background: ${Colors.inputs};
  font-size: 14px;

  ${(props: any) =>
    !props.value &&
    css`
      color: ${lighten(0.2, Colors.grayHard)};
    `}
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-right: 16px;

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
