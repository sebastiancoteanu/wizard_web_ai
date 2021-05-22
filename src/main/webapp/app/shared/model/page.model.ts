import { IPageDraft } from 'app/shared/model/page-draft.model';

export interface IPage {
  id?: number;
  url?: string;
  isRestricted?: boolean;
  order?: number;
  drafts?: IPageDraft[];
  websiteId?: number;
}

export const defaultValue: Readonly<IPage> = {
  isRestricted: false,
};
