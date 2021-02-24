import { IBlock } from 'app/shared/model/block.model';
import { IPage } from 'app/shared/model/page.model';

export interface IPageDraft {
  id?: number;
  isPublished?: boolean;
  blocks?: IBlock[];
  page?: IPage;
}

export const defaultValue: Readonly<IPageDraft> = {
  isPublished: false,
};
