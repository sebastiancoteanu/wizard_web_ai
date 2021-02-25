import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import IconButton from "app/modules/ui-kit/IconButton";
import { Icons } from "app/modules/assets/fonts/icons";
import { IconSize } from "app/modules/ui-kit/types";
import TextButton from "app/modules/ui-kit/TextButton";

const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.palette.neutral.white};
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid #6c757d29;
}
`

const AppLogo = styled(IconButton)`
  color: ${({ theme }) => theme.palette.primary.main};
  
  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const List = styled.div`
  display: flex;
  align-items: center;
`;

const MainNavigation = () => (
  <Wrapper>
    <AppLogo name={Icons.TeachersUixLogo} size={IconSize.LARGE} to="/" />
    <List>
      <TextButton as={Link} to="/account/settings">My Account</TextButton>
    </List>
  </Wrapper>
);

export default MainNavigation;
