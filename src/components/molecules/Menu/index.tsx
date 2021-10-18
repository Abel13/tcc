import React, { useState } from "react";
import {
  AiFillBank,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineSwap,
} from "react-icons/ai";
import { BiRocket } from "react-icons/bi";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSpring } from "react-spring";
import { Button, ScrollView } from "../../atoms";
import { Container, MenuItem, MenuItems, MenuIcon } from "./styles";

const Menu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <MenuItem>
            <Link to="/incomings">
              <div>
                <span>Entradas</span>
                <FiPlusSquare />
              </div>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/outgoings">
              <div>
                <span>Saídas</span>
                <FiMinusSquare />
              </div>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/transfers">
              <div>
                <span>Transferências</span>
                <AiOutlineSwap />
              </div>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/transfers">
              <div>
                <span>Metas</span>
                <BiRocket />
              </div>
            </Link>
          </MenuItem>
        </MenuItems>
      </ScrollView>
    </Container>
  );
};

export default Menu;
