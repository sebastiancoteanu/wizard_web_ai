import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/app-user">
      App User
    </MenuItem>
    <MenuItem icon="asterisk" to="/website">
      Website
    </MenuItem>
    <MenuItem icon="asterisk" to="/page">
      Page
    </MenuItem>
    <MenuItem icon="asterisk" to="/page-draft">
      Page Draft
    </MenuItem>
    <MenuItem icon="asterisk" to="/block">
      Block
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
