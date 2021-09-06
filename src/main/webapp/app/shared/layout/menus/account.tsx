import React, { FC } from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';
import { ActionButton } from '../../layout/header/common';

export const AccountMenuItemsAuthenticated: FC = () => (
  <>
    <MenuItem to="/account/settings">
      Settings
    </MenuItem>
    <MenuItem to="/account/password">
      Password
    </MenuItem>
    <MenuItem to="/logout">
      Logout
    </MenuItem>
  </>
);

const UnauthenticatedMenu: FC = () => (
  <>
    <ActionButton as={Link} id="login-item" to="/login">
      Login
    </ActionButton>
    <ActionButton as={Link} to="/account/register">
      Register
    </ActionButton>
  </>
);

export const AccountMenu = ({ isAuthenticated = false }) =>  isAuthenticated ? (
  <NavDropdown name="Account" id="account-menu">
    <AccountMenuItemsAuthenticated />
  </NavDropdown>
) : (
  <UnauthenticatedMenu />
);

export default AccountMenu;
