export type IconsId =
  | 'arrowhead-pointing-to-the-right'
  | 'cancel'
  | 'caret-down'
  | 'check-mark'
  | 'close'
  | 'copy'
  | 'delete'
  | 'down-arrow'
  | 'drag'
  | 'hamburger-menu'
  | 'header'
  | 'image'
  | 'paragraph'
  | 'pen'
  | 'picture'
  | 'teachers-uix-logo'
  | 'three-image'
  | 'up-arrow'
  | 'user';

export type IconsKey =
  | 'ArrowheadPointingToTheRight'
  | 'Cancel'
  | 'CaretDown'
  | 'CheckMark'
  | 'Close'
  | 'Copy'
  | 'Delete'
  | 'DownArrow'
  | 'Drag'
  | 'HamburgerMenu'
  | 'Header'
  | 'Image'
  | 'Paragraph'
  | 'Pen'
  | 'Picture'
  | 'TeachersUixLogo'
  | 'ThreeImage'
  | 'UpArrow'
  | 'User';

export enum Icons {
  ArrowheadPointingToTheRight = 'arrowhead-pointing-to-the-right',
  Cancel = 'cancel',
  CaretDown = 'caret-down',
  CheckMark = 'check-mark',
  Close = 'close',
  Copy = 'copy',
  Delete = 'delete',
  DownArrow = 'down-arrow',
  Drag = 'drag',
  HamburgerMenu = 'hamburger-menu',
  Header = 'header',
  Image = 'image',
  Paragraph = 'paragraph',
  Pen = 'pen',
  Picture = 'picture',
  TeachersUixLogo = 'teachers-uix-logo',
  ThreeImage = 'three-image',
  UpArrow = 'up-arrow',
  User = 'user',
}

export const ICONS_CODEPOINTS: { [key in Icons]: string } = {
  [Icons.ArrowheadPointingToTheRight]: '61697',
  [Icons.Cancel]: '61698',
  [Icons.CaretDown]: '61699',
  [Icons.CheckMark]: '61700',
  [Icons.Close]: '61701',
  [Icons.Copy]: '61702',
  [Icons.Delete]: '61703',
  [Icons.DownArrow]: '61704',
  [Icons.Drag]: '61705',
  [Icons.HamburgerMenu]: '61706',
  [Icons.Header]: '61707',
  [Icons.Image]: '61708',
  [Icons.Paragraph]: '61709',
  [Icons.Pen]: '61710',
  [Icons.Picture]: '61711',
  [Icons.TeachersUixLogo]: '61712',
  [Icons.ThreeImage]: '61713',
  [Icons.UpArrow]: '61714',
  [Icons.User]: '61715',
};
