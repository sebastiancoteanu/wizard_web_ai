export type IconsId =
  | 'arrowhead-pointing-to-the-right'
  | 'caret-down'
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
  | 'ArrowheadPointingToTheRight'
  | 'CaretDown'
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
  ArrowheadPointingToTheRight = 'arrowhead-pointing-to-the-right',
  CaretDown = 'caret-down',
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
  [Icons.ArrowheadPointingToTheRight]: '61697',
  [Icons.CaretDown]: '61698',
  [Icons.CheckMark]: '61699',
  [Icons.Close]: '61700',
  [Icons.DownArrow]: '61701',
  [Icons.Drag]: '61702',
  [Icons.HamburgerMenu]: '61703',
  [Icons.Header]: '61704',
  [Icons.Image]: '61705',
  [Icons.Paragraph]: '61706',
  [Icons.TeachersUixLogo]: '61707',
  [Icons.ThreeImage]: '61708',
  [Icons.UpArrow]: '61709',
  [Icons.User]: '61710',
};
