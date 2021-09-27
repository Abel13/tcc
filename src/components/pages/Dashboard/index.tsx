import React from "react";

import { Header, Menu } from "../../../components/molecules";

import {
  Body,
  List,
  Container,
  RightBar,
  Content,
  AccountItem,
  AccountList,
  AccountsContainer,
  ContentScrolled,
  CalendarContainer,
  CalendarList,
} from "./styles";

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header logoVisible profileVisible exitButtonVisible />
      <Body>
        <Menu />
      </Body>
    </Container>
  );
};

export default Dashboard;
