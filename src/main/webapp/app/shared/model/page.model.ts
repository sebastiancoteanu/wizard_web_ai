import { IPageDraft } from 'app/shared/model/page-draft.model';

export interface IPage {
  id?: number;
  url?: string;
  isRestricted?: boolean;
  isPublished?: boolean;
  order?: number;
  selectedPageDraftId?: number;
  drafts?: IPageDraft[];
  websiteId?: number;
}

export const defaultValue: Readonly<IPage> = {
  isRestricted: false,
  isPublished: false,
};
