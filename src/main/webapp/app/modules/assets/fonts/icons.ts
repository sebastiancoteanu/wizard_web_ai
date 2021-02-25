export type IconsId = 'check-mark' | 'teachers-uix-logo' | 'user';

export type IconsKey = 'CheckMark' | 'TeachersUixLogo' | 'User';

export enum Icons {
  CheckMark = 'check-mark',
  TeachersUixLogo = 'teachers-uix-logo',
  User = 'user',
}

export const ICONS_CODEPOINTS: { [key in Icons]: string } = {
  [Icons.CheckMark]: '61697',
  [Icons.TeachersUixLogo]: '61698',
  [Icons.User]: '61699',
};
