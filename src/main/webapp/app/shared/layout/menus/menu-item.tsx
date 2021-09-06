import React from 'react';
import { DropdownItem } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styled from "styled-components";

const Wrapper = styled(DropdownItem)`
  color: ${({ theme }) => theme.colors.darkestGray};
  font-size: 14px;
`;

export interface IMenuItem {
  icon?: IconProp;
  to: string;
  id?: string;
}

export default class MenuItem extends React.Component<IMenuItem> {
  render() {
    const { to, icon, id, children } = this.props;

    return (
      <Wrapper tag={Link} to={to} id={id}>
        {icon && <FontAwesomeIcon icon={icon} fixedWidth />} {children}
      </Wrapper>
    );
  }
}
