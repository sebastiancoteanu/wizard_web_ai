import { IPage } from 'app/shared/model/page.model';
import { ThemeType } from 'app/shared/model/enumerations/theme-type.model';

export interface IWebsite {
  id?: number;
  url?: string;
  theme?: ThemeType;
  pages?: IPage[];
  creatorId?: number;
}

export const defaultValue: Readonly<IWebsite> = {};
