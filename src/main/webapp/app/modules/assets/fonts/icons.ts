export type IconsId =
  | 'check-mark'
  | 'close'
  | 'hamburger-menu'
  | 'header'
  | 'image'
  | 'paragraph'
  | 'teachers-uix-logo'
  | 'three-image'
  | 'user';

export type IconsKey =
  | 'CheckMark'
  | 'Close'
  | 'HamburgerMenu'
  | 'Header'
  | 'Image'
  | 'Paragraph'
  | 'TeachersUixLogo'
  | 'ThreeImage'
  | 'User';

export enum Icons {
  CheckMark = 'check-mark',
  Close = 'close',
  HamburgerMenu = 'hamburger-menu',
  Header = 'header',
  Image = 'image',
  Paragraph = 'paragraph',
  TeachersUixLogo = 'teachers-uix-logo',
  ThreeImage = 'three-image',
  User = 'user',
}

export const ICONS_CODEPOINTS: { [key in Icons]: string } = {
  [Icons.CheckMark]: '61697',
  [Icons.Close]: '61698',
  [Icons.HamburgerMenu]: '61699',
  [Icons.Header]: '61700',
  [Icons.Image]: '61701',
  [Icons.Paragraph]: '61702',
  [Icons.TeachersUixLogo]: '61703',
  [Icons.ThreeImage]: '61704',
  [Icons.User]: '61705',
};
