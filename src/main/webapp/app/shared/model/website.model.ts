import { IPage } from 'app/shared/model/page.model';
import { IAppUser } from 'app/shared/model/app-user.model';
import { ThemeType } from 'app/shared/model/enumerations/theme-type.model';

export interface IWebsite {
  id?: number;
  url?: string;
  theme?: ThemeType;
  pages?: IPage[];
  creator?: IAppUser;
}

export const defaultValue: Readonly<IWebsite> = {};
