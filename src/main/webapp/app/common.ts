import { BlockType } from 'app/shared/model/enumerations/block-type.model';
import HEADER from 'app/modules/assets/images/HEADER.PNG';
import PARAGRAPH from 'app/modules/assets/images/PARAGRAPH.PNG';
import SINGLE_IMAGE from 'app/modules/assets/images/SINGLE_IMAGE.PNG';
import THREE_IMAGE_GALLERY from 'app/modules/assets/images/THREE_IMAGE_GALLERY.PNG';
import { uuid } from 'uuidv4';
import { Block } from 'app/types';

export const blueprints: Block[] = [
  {
    id: uuid(),
    type: BlockType.HEADER,
  },
  {
    id: uuid(),
    type: BlockType.PARAGRAPH,
  },
  {
    id: uuid(),
    type: BlockType.IMAGE,
  },
  {
    id: uuid(),
    type: BlockType.THREE_IMAGE_LIST,
  },
];

export const blockTypeToImageMapper: Record<BlockType, string> = {
  [BlockType.HEADER]: HEADER,
  [BlockType.PARAGRAPH]: PARAGRAPH,
  [BlockType.IMAGE]: SINGLE_IMAGE,
  [BlockType.THREE_IMAGE_LIST]: THREE_IMAGE_GALLERY,
};
