import './header.scss';

import React, { useState } from 'react';

import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';
import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';
import MainNavigation from "app/modules/ui-kit/MainNavigation";

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSwaggerEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
      <LoadingBar className="loading-bar" />
      <MainNavigation />
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

export default Header;
