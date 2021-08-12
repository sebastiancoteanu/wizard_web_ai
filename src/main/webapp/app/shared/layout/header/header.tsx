import './header.scss';

import React, { FC, useState } from 'react';

import LoadingBar from 'react-redux-loading-bar';
import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import { IRootState } from "app/shared/reducers";
import { hasAnyAuthority } from "app/shared/auth/private-route";
import { AUTHORITIES } from "app/config/constants";
import { connect } from "react-redux";
import styled from "styled-components";
import { AdminMenu,  AccountMenu, EntitiesMenu } from "app/shared/layout/menus";
import { useHistory } from "react-router-dom";
import BaseButton from "app/modules/ui-kit/BaseButton";
import WebsiteNavigation from "app/shared/layout/header/WebsiteNavigation";

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

const RightAlignedSection = styled.div`
  margin-left: auto;
`;

const ActionButton = styled(BaseButton)`
  color: ${({ theme }) => theme.colors.darkestGray};
  &:not(:first-child) {
    margin-left: 8px;
  }
`;

const AdminNavigation = styled(Navbar)`
  height: 60px;
`;

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSwaggerEnabled: boolean;
  isCreator: boolean;
}

const Header: FC<IHeaderProps> = ({
  isAuthenticated,
  isAdmin,
  isSwaggerEnabled,
  isCreator,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const history = useHistory();

  return (
    <div id="app-header">
      <LoadingBar className="loading-bar" />
      {isAdmin ? (
        <AdminNavigation dark expand="sm" className="jh-navbar">
          <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
          <Collapse isOpen={menuOpen} navbar>
            <Nav id="header-tabs" className="ml-auto" navbar>
              {isAuthenticated && isAdmin && <EntitiesMenu />}
              {isAuthenticated && isAdmin && <AdminMenu showSwagger={isSwaggerEnabled} />}
              <AccountMenu isAuthenticated={isAuthenticated} />
            </Nav>
          </Collapse>
        </AdminNavigation>
      ) : (
        <Navigation>
          <WebsiteNavigation />
          <RightAlignedSection>
            {!isAuthenticated && (
              <>
                <ActionButton onClick={() => history.push('/login')}>Login</ActionButton>
                <ActionButton onClick={() => history.push('/account/register')}>Register</ActionButton>
              </>
            )}
            {isAuthenticated && isCreator && <ActionButton onClick={() => history.push('/editor')}>Editor</ActionButton>}
            {isAuthenticated && <ActionButton onClick={() => history.push('/logout')}>Logout</ActionButton>}
          </RightAlignedSection>
        </Navigation>
      )}
    </div>
  );
};

const mapStateToProps = ({ authentication, applicationProfile }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  isCreator: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.CREATOR]),
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled,
});

export default connect(mapStateToProps)(Header);
