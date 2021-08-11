import { BlockType } from 'app/shared/model/enumerations/block-type.model';
import { CSSProperties } from 'styled-components';

export interface IBLockOptionsContent {
  value?: string;
  description?: string;
}

export interface IBlockOptions {
  cssProperties?: CSSProperties;
  content?: string[];
}

export interface IBlock {
  id?: number;
  type?: BlockType;
  options?: IBlockOptions;
  order?: number;
  pageDraftId?: number;
}

export const defaultValue: Readonly<IBlock> = {};
