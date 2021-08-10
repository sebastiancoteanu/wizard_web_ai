import { BlockType } from 'app/shared/model/enumerations/block-type.model';
import generateId from 'app/utils/generateId';
import { IBlock } from 'app/shared/model/block.model';

const blueprints: IBlock[] = [
  {
    id: generateId(),
    type: BlockType.HEADER,
  },
  {
    id: generateId(),
    type: BlockType.PARAGRAPH,
  },
  {
    id: generateId(),
    type: BlockType.IMAGE,
  },
  {
    id: generateId(),
    type: BlockType.THREE_IMAGE_LIST,
  },
];

export default blueprints;
