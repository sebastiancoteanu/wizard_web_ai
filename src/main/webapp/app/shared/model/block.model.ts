import { IPageDraft } from 'app/shared/model/page-draft.model';
import { BlockType } from 'app/shared/model/enumerations/block-type.model';
import { CSSProperties } from 'styled-components';

export interface IBlockOptions {
  cssProperties?: CSSProperties;
  content?: string[];
}

export interface IBlock {
  id?: number;
  type?: BlockType;
  options?: IBlockOptions;
  pageDraft?: IPageDraft;
}

export const defaultValue: Readonly<IBlock> = {};
