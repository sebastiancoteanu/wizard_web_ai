import { IPageDraft } from 'app/shared/model/page-draft.model';

export interface IPage {
  id?: number;
  url?: string;
  isRestricted?: boolean;
  drafts?: IPageDraft[];
  websiteId?: number;
}

export const defaultValue: Readonly<IPage> = {
  isRestricted: false,
};
