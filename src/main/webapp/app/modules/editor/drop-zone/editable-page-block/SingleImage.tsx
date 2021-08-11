import React, { FC } from 'react';
import ImageWithPlaceholder from "app/modules/editor/drop-zone/editable-page-block/common/ImageWithPlaceholder";
import { IBlock } from "app/shared/model/block.model";

interface Props extends Pick<IBlock, 'options' | 'id'>{
  isSelected: boolean;
}

const SingleImage: FC<Props> = ({ options, isSelected, id  }) => {
  const contentItem = options?.content?.length ? options.content[0] : { value: '', description: '' };

  return (
    <ImageWithPlaceholder
      src={contentItem.value}
      description={contentItem.description}
      isSelected={isSelected}
      options={options}
    />
  );
};

export default SingleImage;
