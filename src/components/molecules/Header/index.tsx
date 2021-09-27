import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../../hooks/Auth";
import { Button, DynamicContent, ButtonBack } from "../../atoms";
import Profile from "../Profile";
import { HeaderProps } from "./interfaces";
import { Container, Content } from "./styles";
import Colors from "../../../styles/colors.json";

const Header: React.FC<HeaderProps> = ({
  backButtonVisible,
  logoVisible,
  exitButtonVisible,
  profileVisible,
}) => {
  const { user, signOut } = useAuth();
  return (
    <Container>
      <Content>
        <DynamicContent visible={!!backButtonVisible}>
          <ButtonBack />
        </DynamicContent>
        <DynamicContent visible={!!profileVisible}>
          <Profile
            name={user.username}
            src={`https://avatars.dicebear.com/api/bottts/${
              user.username
            }.svg?b=%23${Colors.inputs.replace("#", "")}&scale=80`}
            // src={`https://api.hello-avatar.com/adorables/${user.username}`}
            // src={`https://ui-avatars.com/api/?size=128&rounded=true&name=${user.username}`}
            alt="profile image"
          />
        </DynamicContent>
        <DynamicContent
          visible={!!exitButtonVisible}
          style={{ "margin-left": "auto" }}
        >
          <Button buttonType="transparent" onClick={signOut}>
            <FiLogOut />
          </Button>
        </DynamicContent>
      </Content>
    </Container>
  );
};

export default Header;
