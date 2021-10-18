import styled from 'styled-components';
import Colors from '../../../styles/colors.json';

export const BarContainer = styled.div`
  display: flex;
  flex: 1;
  margin-right: 15px;
  padding: 10px;
`;

export const ToolTipContainer = styled.div`
  background: ${Colors.white};
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px 'solid' ${Colors.gray};
  border-radius: 5px;
`;

export const ToolTipTitle = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: ${Colors.secondary};
`;

export const ToolTipContent = styled.p`
  font-size: 15px;
  color: ${Colors.primary};
`;
