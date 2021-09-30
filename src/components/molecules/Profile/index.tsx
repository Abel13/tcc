import React from "react";
import { Link } from "react-router-dom";
import { Container, Image } from "./styles";
import { DashboardPage } from "../../../locale/pt/dictionary.json";

import { ProfileProps } from "./interfaces";

const Profile: React.FC<ProfileProps> = ({ name, ...rest }) => {
  const { Header } = DashboardPage;
  return (
    <Container>
      <Image {...rest} />
      <div>
        <span>{Header.Welcome}</span>
        <Link to="/dashboard">
          <strong>{name}</strong>
        </Link>
      </div>
    </Container>
  );
};

export default Profile;
