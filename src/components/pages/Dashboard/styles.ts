import styled from "styled-components";
import Colors from "../../../styles/colors.json";

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-height: 100vh;
`;

export const Body = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  background-color: ${Colors.background};
  overflow: hidden;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const ContentScrolled = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export const AccountsContainer = styled.div`
  flex: 1;
  display: flex;
  height: 90%;
  flex-direction: row;
`;

export const CalendarContainer = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  flex-direction: row;
`;

export const AccountList = styled.div`
  display: flex;
  border-radius: 0 5px 5px 0;
  padding: 10px;
  margin-right: 20px;
  background-color: ${Colors.primary};

  box-shadow: 2px 0px 5px ${Colors.blackTransparent};
`;

export const AccountItem = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin-bottom: 8px;

  span {
    display: flex;
    font-size: 10px;
    width: 70px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    color: ${Colors.black};
  }

  h2 {
    font-size: 10px;
    color: ${Colors.light};
  }
`;

export const RightBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 280px;
  min-width: 200px;
  background-color: ${Colors.blackTransparent};
`;

export const List = styled.div`
  width: 100%;
  padding-bottom: 10px;
`;

export const CalendarList = styled.div`
  width: 100%;
  height: 200px;
  padding-bottom: 10px;
`;
