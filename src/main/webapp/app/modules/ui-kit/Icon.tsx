import React, {FC} from 'react';
import styled from "styled-components";
import { IconProps, IconSize } from "app/modules/ui-kit/types";

const sizeToPixel = (size: IconSize): string => {
  switch (size) {
    case IconSize.SMALLEST:
      return '0.8em';
    case IconSize.SMALL:
      return '1em';
    case IconSize.MEDIUM:
      return '1.8em';
    case IconSize.LARGE:
      return '2.6em';
    default:
      return '1.5em';
  }
};

const Icon = styled.i.attrs(({
  className, name,
}: IconProps) => ({ className: `${className} icon-${name}` }))<IconProps>`
  font-size: ${({ size = IconSize.NORMAL }): string => sizeToPixel(size)};
  line-height: 1;
  display: inline-flex;

  &:focus {
    outline: none;
  }

  &:link,
  &:visited,
  &:active {
    color: inherit;
  }
`;

const Element: FC<IconProps> = ({
  name,
  size,
  className,
}) => (
  <Icon name={name} size={size} className={className} />
);

export default Element;