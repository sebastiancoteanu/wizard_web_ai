import React, { FC } from 'react';
import ImageWithPlaceholder from "app/modules/editor/drop-zone/editable-page-block/common/ImageWithPlaceholder";
import { IBlock } from "app/shared/model/block.model";

interface Props extends Pick<IBlock, 'options'>{
  isSelected: boolean;
}

const SingleImage: FC<Props> = ({ options, isSelected }) => {
  const source = options?.content?.length ? options.content[0] : '';

  return (
    <>
      <ImageWithPlaceholder src={source} isSelected={isSelected} options={options} />
    </>
  );
};

export default SingleImage;
