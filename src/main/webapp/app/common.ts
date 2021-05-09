import { BlockType } from 'app/shared/model/enumerations/block-type.model';
import HEADER from 'app/modules/assets/images/HEADER.PNG';
import PARAGRAPH from 'app/modules/assets/images/PARAGRAPH.PNG';
import SINGLE_IMAGE from 'app/modules/assets/images/SINGLE_IMAGE.PNG';
import THREE_IMAGE_GALLERY from 'app/modules/assets/images/THREE_IMAGE_GALLERY.PNG';
import generateId from 'app/utils/generateId';
import { IBlock } from 'app/shared/model/block.model';

export const blueprints: IBlock[] = [
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

export const blockTypeToImageMapper: Record<BlockType, string> = {
  [BlockType.HEADER]: HEADER,
  [BlockType.PARAGRAPH]: PARAGRAPH,
  [BlockType.IMAGE]: SINGLE_IMAGE,
  [BlockType.THREE_IMAGE_LIST]: THREE_IMAGE_GALLERY,
};
