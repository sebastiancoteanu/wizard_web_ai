import React, { FC, useState } from 'react';
import { AccountMenu, AdminMenu, EntitiesMenu } from "app/shared/layout/menus";
import styled from "styled-components";
import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import { useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";

const Wrapper = styled(Navbar)`
  height: 60px;
`;

const AdminNavigation: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { isAuthenticated, isSwaggerEnabled } = useSelector<
    IRootState,
    IRootState['authentication'] &
    IRootState['applicationProfile']
  >(state => ({
    ...state.authentication,
    ...state.applicationProfile,
  }));

  return (
    <Wrapper light expand="sm" className="jh-navbar bg-white">
      <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
      <Collapse isOpen={menuOpen} navbar>
        <Nav id="header-tabs" className="ml-auto" navbar>
          {isAuthenticated && <EntitiesMenu />}
          {isAuthenticated && <AdminMenu showSwagger={isSwaggerEnabled} />}
          <AccountMenu isAuthenticated={isAuthenticated} />
        </Nav>
      </Collapse>
    </Wrapper>
  );
};

export default AdminNavigation;
