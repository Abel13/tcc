import styled, { css } from 'styled-components';

import { shade } from 'polished';
import Colors from '../../../styles/colors.json';

export const ScrollViewContainer = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  margin-top: 10px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    border-radius: 5px;
    background: ${Colors.transparent};
  }

  &::-webkit-scrollbar-track:hover {
    background: ${Colors.blackTransparent};
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${Colors.gray};
    border-radius: 5px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: ${shade(0.2, Colors.grayHard)};
  }
`;
