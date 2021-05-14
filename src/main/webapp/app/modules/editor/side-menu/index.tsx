import React, { FC, useState } from 'react';
import IconButton from "app/modules/ui-kit/IconButton";
import { Icons } from "app/modules/assets/fonts/icons";
import styled, { css } from "styled-components";
import MenuItems from "app/modules/editor/side-menu/MenuItems";

const Wrapper = styled.div`
  box-shadow: 1px 0 2px 0 #888888a8;
  display: inline-flex;
  background: ${({theme}) => theme.colors.gray};
  overflow: hidden;
  height: calc(100vh - 60px);
  flex-direction: column;
  padding-top: 65px;
`;

const InnerWrapper = styled.div<{ isMenuOpen: boolean }>`
  display: flex;
  flex-direction: column;
  background: transparent;
  padding: 0 20px 60px;

  ${({ isMenuOpen }) => isMenuOpen ? css`
    width: 250px;
    overflow: auto;
  ` : css`
    width: 60px;
  `}

  ::-webkit-scrollbar {
    width: 5px;  /* Remove scrollbar space */
    background: ${({ theme }) => theme.colors.lighter};;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.ivory};;
  }
`;

const OpenMenuIcon = styled(IconButton)`
  font-size: 20px;
  background: #d7d7d745;
  border-radius: 50%;
  padding: 5px;
  position: fixed;
  top: 70px;
  left: 10px;
`;

const SideMenu: FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(true);
  return (
    <Wrapper>
      <OpenMenuIcon
        name={isMenuOpen ? Icons.Close : Icons.HamburgerMenu}
        onClick={() => setMenuOpen(!isMenuOpen)}
      />
      <InnerWrapper isMenuOpen={isMenuOpen}>
        {isMenuOpen && (
          <MenuItems />
        )}
      </InnerWrapper>
    </Wrapper>
  );
};

export default SideMenu;
