import React, { FC, useState } from 'react';
import IconButton from "app/modules/ui-kit/IconButton";
import { Icons } from "app/modules/assets/fonts/icons";
import styled from "styled-components";
import BlockBlueprints from "app/modules/editor/side-menu/BlockBlueprints";

const OpenMenuIcon = styled(IconButton)`
  font-size: 20px;
  background: #d7d7d745;
  position: fixed;
  top: 70px;
  left: 20px;
  border-radius: 50%;
  padding: 5px;
`;

const SideMenu: FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(true);
  return (
    <>
      <OpenMenuIcon
        name={isMenuOpen ? Icons.Close : Icons.HamburgerMenu}
        onClick={() => setMenuOpen(!isMenuOpen)}
      />
      {isMenuOpen && <BlockBlueprints />}
    </>
  );
};

export default SideMenu;
