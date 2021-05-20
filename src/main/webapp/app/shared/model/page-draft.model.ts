import { IBlock } from 'app/shared/model/block.model';

export interface IPageDraft {
  id?: number;
  isPublished?: boolean;
  blocks?: IBlock[];
  pageId?: number;
}

export const defaultValue: Readonly<IPageDraft> = {
  isPublished: false,
};
