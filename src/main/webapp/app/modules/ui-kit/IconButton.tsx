import React, { FC } from 'react';
import { IconProps } from "app/modules/ui-kit/types";
import Icon from "app/modules/ui-kit/Icon";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  position: relative;
  top: 0;
  border: none;
  outline: none;
  cursor: pointer;
  background: transparent;
  padding: 0;

  &:link, &:active, &:hover, &:visited {
    text-decoration: none;
    outline: none;
  }
`

const IconButton: FC<IconProps> = ({ className, name, size, to }) => to ? (
  <Button className={className} as={Link} to={to}>
    <Icon name={name} size={size} />
  </Button>
) : (
  <Button className={className}>
    <Icon name={name} size={size} />
  </Button>
)

export default IconButton;
