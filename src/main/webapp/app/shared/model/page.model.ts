import { IPageDraft } from 'app/shared/model/page-draft.model';
import { IWebsite } from 'app/shared/model/website.model';

export interface IPage {
  id?: number;
  url?: string;
  isRestricted?: boolean;
  drafts?: IPageDraft[];
  website?: IWebsite;
}

export const defaultValue: Readonly<IPage> = {
  isRestricted: false,
};
