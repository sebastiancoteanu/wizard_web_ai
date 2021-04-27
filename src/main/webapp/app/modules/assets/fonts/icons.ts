export type IconsId =
  | 'check-mark'
  | 'close'
  | 'drag'
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
  | 'Drag'
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
  Drag = 'drag',
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
  [Icons.Drag]: '61699',
  [Icons.HamburgerMenu]: '61700',
  [Icons.Header]: '61701',
  [Icons.Image]: '61702',
  [Icons.Paragraph]: '61703',
  [Icons.TeachersUixLogo]: '61704',
  [Icons.ThreeImage]: '61705',
  [Icons.User]: '61706',
};
