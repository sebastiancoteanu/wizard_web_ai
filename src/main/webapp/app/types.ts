import { BlockType } from 'app/shared/model/enumerations/block-type.model';

export interface Block {
  type: BlockType;
  id: string;
}
