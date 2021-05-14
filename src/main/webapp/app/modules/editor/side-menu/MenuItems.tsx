import React, { useState } from 'react';
import styled, { css } from "styled-components";
import TextButton from "app/modules/ui-kit/TextButton";
import { MenuItemsTypes } from "app/modules/editor/side-menu/types";
import { Icons } from "app/modules/assets/fonts/icons";
import Icon from "app/modules/ui-kit/Icon";
import BlockBlueprints from "app/modules/editor/side-menu/BlockBlueprints";

const Wrapper = styled.div`
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled(TextButton)<{ active: boolean }>`
  font-size: 16px;
  text-transform: uppercase;
  display: flex;
  justify-content: flex-start;
  padding: 12px;
  color: ${({ theme }) => theme.colors.lightestGray};
  transition: all 0.1s ease-in;

  ${({ active, theme }) => active ? css`
    background-color: ${theme.colors.darkestGray};
    color: ${theme.colors.lightestGray};
    transform: translateX(20px);
  ` : css`
    background-color: transparent;
  `}
  
  &:hover, &:focus {
    color: ${({ theme }) => theme.colors.lightestGray};
  }
`;

const BackIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.lightestGray};
  margin-right: 12px;
`;

const menuItems = [MenuItemsTypes.PAGES, MenuItemsTypes.BLUEPRINTS];

const MenuItems = () => {
  const [activeItem, setActiveItem] = useState(-1);
  return (
    <Wrapper>
      <Items>
        {menuItems.map((item, index) => (index === activeItem || activeItem === -1) && (
          <Item key={item} active={index === activeItem} onClick={() => setActiveItem(index === activeItem ? -1 : index )}>
            {index === activeItem && <BackIcon name={Icons.LeftArrow} />}
            {item}
          </Item>
        ))}
      </Items>
      {(activeItem >= 0 && menuItems[activeItem] === MenuItemsTypes.BLUEPRINTS) && (
        <BlockBlueprints />
      )}
    </Wrapper>
  );
};

export default MenuItems;
