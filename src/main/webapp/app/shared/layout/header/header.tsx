import './header.scss';

import React, { FC, useState } from 'react';

import LoadingBar from 'react-redux-loading-bar';
import MainNavigation from "app/modules/ui-kit/MainNavigation";
import { IRootState } from "app/shared/reducers";
import { hasAnyAuthority } from "app/shared/auth/private-route";
import { AUTHORITIES } from "app/config/constants";
import { connect } from "react-redux";
import styled from "styled-components";

const Navigation = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.palette.neutral.white};
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid #6c757d29;
`;

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSwaggerEnabled: boolean;
}

const Header: FC<IHeaderProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
      <LoadingBar className="loading-bar" />
      <Navigation>
        {children}
      </Navigation>
        {/*<NavbarToggler aria-label="Menu" onClick={toggleMenu} />*/}
        {/*<Collapse isOpen={menuOpen} navbar>*/}
        {/*  <Nav id="header-tabs" className="ml-auto" navbar>*/}
        {/*    {props.isAuthenticated && props.isAdmin && <EntitiesMenu />}*/}
        {/*    {props.isAuthenticated && props.isAdmin && <AdminMenu showSwagger={props.isSwaggerEnabled} />}*/}
        {/*    <AccountMenu isAuthenticated={props.isAuthenticated} />*/}
        {/*  </Nav>*/}
        {/*</Collapse>*/}
    </div>
  );
};

const mapStateToProps = ({ authentication, applicationProfile }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled,
});

export default connect(mapStateToProps)(Header);
