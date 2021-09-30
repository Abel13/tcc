import styled from 'styled-components';

import Colors from '../../../styles/colors.json';

export const PageTitleContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${Colors.grayHard};
  margin-bottom: 16px;
  justify-content: space-between;
  align-items: center;

  strong {
    color: ${Colors.gray};
    font-size: 20px;
  }
`;

export const LeftContent = styled.div`
  display: flex;
  flex: 1;
`;

export const RightContent = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;
