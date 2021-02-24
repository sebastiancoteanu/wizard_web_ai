import { IPageDraft } from 'app/shared/model/page-draft.model';
import { BlockType } from 'app/shared/model/enumerations/block-type.model';

export interface IBlock {
  id?: number;
  type?: BlockType;
  options?: string;
  pageDraft?: IPageDraft;
}

export const defaultValue: Readonly<IBlock> = {};
