import React, { FC, MouseEvent } from 'react';
import { IconProps } from "app/modules/ui-kit/types";
import Icon from "app/modules/ui-kit/Icon";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BaseButton from "app/modules/ui-kit/BaseButton";

const Button = styled(BaseButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  position: relative;
  top: 0;
  background: transparent;
  padding: 0;
`

interface IconButtonProps extends IconProps {
  onClick?: (e: MouseEvent) => void
}

const IconButton: FC<IconButtonProps> = ({
  className, 
  name, 
  size,
  to,
  onClick,
}) => to ? (
  <Button className={className} as={Link} to={to} onClick={onClick}>
    <Icon name={name} size={size} />
  </Button>
) : (
  <Button className={className} onClick={onClick}>
    <Icon name={name} size={size} />
  </Button>
)

export default IconButton;
