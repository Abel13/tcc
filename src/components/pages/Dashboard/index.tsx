import React from "react";

import { Header, Menu } from "../../../components/molecules";

import { Body, Container } from "./styles";

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
