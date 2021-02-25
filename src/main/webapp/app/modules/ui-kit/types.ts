import { IconsId } from '../assets/fonts/icons';

export enum IconSize {
  LARGE,
  MEDIUM,
  NORMAL,
  SMALL,
  SMALLEST,
}

export interface IconProps {
  name: IconsId;
  size?: IconSize;
  className?: string;
  to?: string;
}
