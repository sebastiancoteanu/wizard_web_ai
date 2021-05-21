import { BlockType } from "app/shared/model/enumerations/block-type.model";
import { Icons } from "app/modules/assets/fonts/icons";

const blockTypeBlueprintMapper = {
  [BlockType.HEADER]: {
    icon: Icons.Header,
    caption: 'Header'
  },
  [BlockType.PARAGRAPH]: {
    icon: Icons.Paragraph,
    caption: 'Paragraph'
  },
  [BlockType.IMAGE]: {
    icon: Icons.Picture,
    caption: 'Image'
  },
  [BlockType.THREE_IMAGE_LIST]: {
    icon: Icons.ThreeImageGallery,
    caption: 'Image gallery'
  }
}

export default blockTypeBlueprintMapper;
