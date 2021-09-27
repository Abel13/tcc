import { animated } from "react-spring";
import styled from "styled-components";
import { shade, opacify } from "polished";

import Colors from "../../../styles/colors.json";

export const Container = styled(animated.div)`
  flex: 1;
  display: flex;
  max-width: 240px;
  min-width: 200px;
  background: ${Colors.inputs};
`;

export const MenuItems = styled.div`
  flex: 1;
  margin-bottom: 15px;
`;

export const MenuIcon = styled.div`
  display: flex;
  margin-bottom: 15px;
  justify-content: flex-end;
`;

export const MenuItem = styled(animated.div)`
  display: flex;
  margin: 5px;
  height: 50px;
  align-items: center;

  a {
    margin: 2px;
    color: ${Colors.light};
    display: block;
    flex: 1;
    text-decoration: none;
    font-size: 15px;

    transition: color 0.2s;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 10px;
      padding: 10px 2px;

      span {
        margin-left: 15px;
      }
    }

    &:hover {
      color: ${shade(0.2, Colors.primary)};
      /* background-color: ${opacify(0.2, Colors.inputs)}; */
    }
  }
`;
