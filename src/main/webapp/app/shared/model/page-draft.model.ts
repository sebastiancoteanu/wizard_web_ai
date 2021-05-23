import { IBlock } from 'app/shared/model/block.model';

export interface IPageDraft {
  id?: number;
  blocks?: IBlock[];
  pageId?: number;
}

export const defaultValue: Readonly<IPageDraft> = {};
