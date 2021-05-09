export type IconsId =
  | 'arrowhead-pointing-to-the-right'
  | 'caret-down'
  | 'check-mark'
  | 'close'
  | 'delete'
  | 'down-arrow'
  | 'drag'
  | 'hamburger-menu'
  | 'header'
  | 'image'
  | 'paragraph'
  | 'picture'
  | 'teachers-uix-logo'
  | 'three-image'
  | 'up-arrow'
  | 'user';

export type IconsKey =
  | 'ArrowheadPointingToTheRight'
  | 'CaretDown'
  | 'CheckMark'
  | 'Close'
  | 'Delete'
  | 'DownArrow'
  | 'Drag'
  | 'HamburgerMenu'
  | 'Header'
  | 'Image'
  | 'Paragraph'
  | 'Picture'
  | 'TeachersUixLogo'
  | 'ThreeImage'
  | 'UpArrow'
  | 'User';

export enum Icons {
  ArrowheadPointingToTheRight = 'arrowhead-pointing-to-the-right',
  CaretDown = 'caret-down',
  CheckMark = 'check-mark',
  Close = 'close',
  Delete = 'delete',
  DownArrow = 'down-arrow',
  Drag = 'drag',
  HamburgerMenu = 'hamburger-menu',
  Header = 'header',
  Image = 'image',
  Paragraph = 'paragraph',
  Picture = 'picture',
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
  [Icons.Delete]: '61701',
  [Icons.DownArrow]: '61702',
  [Icons.Drag]: '61703',
  [Icons.HamburgerMenu]: '61704',
  [Icons.Header]: '61705',
  [Icons.Image]: '61706',
  [Icons.Paragraph]: '61707',
  [Icons.Picture]: '61708',
  [Icons.TeachersUixLogo]: '61709',
  [Icons.ThreeImage]: '61710',
  [Icons.UpArrow]: '61711',
  [Icons.User]: '61712',
};
