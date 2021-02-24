import { IUser } from 'app/shared/model/user.model';
import { IWebsite } from 'app/shared/model/website.model';

export interface IAppUser {
  id?: number;
  user?: IUser;
  website?: IWebsite;
}

export const defaultValue: Readonly<IAppUser> = {};
