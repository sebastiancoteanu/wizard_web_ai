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
  pageDraftId?: number;
}

export const defaultValue: Readonly<IBlock> = {};
