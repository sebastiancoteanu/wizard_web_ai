import { BlockType } from 'app/shared/model/enumerations/block-type.model';
import generateId from 'app/utils/generateId';
import { IBlock } from 'app/shared/model/block.model';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import PARAGRAPH from './modules/assets/images/paragraph.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import HEADER from './modules/assets/images/header.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignoreimport PARAGRAPH from './modules/assets/images/paragraph.png';
import SINGLE_IMAGE from './modules/assets/images/single_image.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import THREE_IMAGE_GALLERY from './modules/assets/images/three_image_gallery.png';

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
