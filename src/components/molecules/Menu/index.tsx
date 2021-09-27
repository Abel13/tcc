import React, { useState } from "react";
import { AiFillBank, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSpring } from "react-spring";
import { Button, ScrollView } from "../../atoms";
import { Container, MenuItem, MenuItems, MenuIcon } from "./styles";

const Menu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(true);

  const rightMenuAnimation = useSpring({
    transform: menuOpen ? `translateX(0%)` : `translateX(-80%)`,
  });

  return (
    <Container style={rightMenuAnimation}>
      <ScrollView>
        <MenuItems>
          <MenuIcon>
            <Button
              buttonType="transparent"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </Button>
          </MenuIcon>
          <MenuItem>
            <Link to="/accounts">
              <div>
                <span>Contas</span>
                <AiFillBank />
              </div>
            </Link>
          </MenuItem>
        </MenuItems>
      </ScrollView>
    </Container>
  );
};

export default Menu;
