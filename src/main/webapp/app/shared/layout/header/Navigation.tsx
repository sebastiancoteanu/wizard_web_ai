import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { AccountMenu } from "app/shared/layout/menus";
import styled, { ThemeProvider } from "styled-components";
import { Navbar, Nav } from 'reactstrap';
import { useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";
import WebsiteNavigation from "app/shared/layout/header/WebsiteNavigation";
import { hasAnyAuthority } from "app/shared/auth/private-route";
import { AUTHORITIES } from "app/config/constants";
import { ActionButton } from "../../layout/header/common";

const Wrapper = styled(Navbar)`
  height: 60px;

  &.navbar {
    background-color: ${({ theme }) => theme.palette.navigationBackground} !important;
  }

  .navbar-nav .nav-link, a {
    color: ${({ theme }) => theme.palette.navigationText} !important;
  }
`;

const EditorButton = styled(ActionButton)`
  margin-right: -16px;
`;

const Navigation: FC = () => {
  const { isAuthenticated, account } = useSelector<
    IRootState,
    IRootState['authentication']
    >(state => ({
    ...state.authentication,
    ...state.applicationProfile,
  }));

  const isCreator = hasAnyAuthority(account.authorities, [AUTHORITIES.CREATOR]);

  return (
    <Wrapper light expand="sm" className="jh-navbar bg-white">
      <WebsiteNavigation />
      <Nav id="header-tabs" className="ml-auto" navbar>
        {isAuthenticated && isCreator && (
          <EditorButton as={Link} to="/editor">Editor</EditorButton>
        )}
        <AccountMenu isAuthenticated={isAuthenticated} />
      </Nav>
    </Wrapper>
  );
};

export default Navigation;

// const Navigation = styled.div`
//   height: 60px;
//   width: 100%;
//   display: flex;
//   align-items: center;
//   background: ${({ theme }) => theme.palette.neutral.white};
//   justify-content: space-between;
//   padding: 8px 12px;
//   border-bottom: 1px solid #6c757d29;
// `;
//
// const RightAlignedSection = styled.div`
//   margin-left: auto;
// `;
//
