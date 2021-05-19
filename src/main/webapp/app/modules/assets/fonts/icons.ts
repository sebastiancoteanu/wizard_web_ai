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
  | 'invisible'
  | 'left-arrow'
  | 'paragraph'
  | 'pen'
  | 'picture'
  | 'right-arrow'
  | 'scroll'
  | 'teachers-uix-logo'
  | 'three-image'
  | 'up-arrow'
  | 'user'
  | 'vertical'
  | 'visible';

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
  | 'Invisible'
  | 'LeftArrow'
  | 'Paragraph'
  | 'Pen'
  | 'Picture'
  | 'RightArrow'
  | 'Scroll'
  | 'TeachersUixLogo'
  | 'ThreeImage'
  | 'UpArrow'
  | 'User'
  | 'Vertical'
  | 'Visible';

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
  Invisible = 'invisible',
  LeftArrow = 'left-arrow',
  Paragraph = 'paragraph',
  Pen = 'pen',
  Picture = 'picture',
  RightArrow = 'right-arrow',
  Scroll = 'scroll',
  TeachersUixLogo = 'teachers-uix-logo',
  ThreeImage = 'three-image',
  UpArrow = 'up-arrow',
  User = 'user',
  Vertical = 'vertical',
  Visible = 'visible',
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
  [Icons.Invisible]: '61709',
  [Icons.LeftArrow]: '61710',
  [Icons.Paragraph]: '61711',
  [Icons.Pen]: '61712',
  [Icons.Picture]: '61713',
  [Icons.RightArrow]: '61714',
  [Icons.Scroll]: '61715',
  [Icons.TeachersUixLogo]: '61716',
  [Icons.ThreeImage]: '61717',
  [Icons.UpArrow]: '61718',
  [Icons.User]: '61719',
  [Icons.Vertical]: '61720',
  [Icons.Visible]: '61721',
};
