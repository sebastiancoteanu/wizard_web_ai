export type IconsId =
  | 'check-mark'
  | 'close'
  | 'down-arrow'
  | 'drag'
  | 'hamburger-menu'
  | 'header'
  | 'image'
  | 'paragraph'
  | 'teachers-uix-logo'
  | 'three-image'
  | 'up-arrow'
  | 'user';

export type IconsKey =
  | 'CheckMark'
  | 'Close'
  | 'DownArrow'
  | 'Drag'
  | 'HamburgerMenu'
  | 'Header'
  | 'Image'
  | 'Paragraph'
  | 'TeachersUixLogo'
  | 'ThreeImage'
  | 'UpArrow'
  | 'User';

export enum Icons {
  CheckMark = 'check-mark',
  Close = 'close',
  DownArrow = 'down-arrow',
  Drag = 'drag',
  HamburgerMenu = 'hamburger-menu',
  Header = 'header',
  Image = 'image',
  Paragraph = 'paragraph',
  TeachersUixLogo = 'teachers-uix-logo',
  ThreeImage = 'three-image',
  UpArrow = 'up-arrow',
  User = 'user',
}

export const ICONS_CODEPOINTS: { [key in Icons]: string } = {
  [Icons.CheckMark]: '61697',
  [Icons.Close]: '61698',
  [Icons.DownArrow]: '61699',
  [Icons.Drag]: '61700',
  [Icons.HamburgerMenu]: '61701',
  [Icons.Header]: '61702',
  [Icons.Image]: '61703',
  [Icons.Paragraph]: '61704',
  [Icons.TeachersUixLogo]: '61705',
  [Icons.ThreeImage]: '61706',
  [Icons.UpArrow]: '61707',
  [Icons.User]: '61708',
};
