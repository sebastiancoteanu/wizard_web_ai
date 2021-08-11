import React, { FC } from 'react';
import styled from "styled-components";
import ImageWithPlaceholder from "app/modules/editor/drop-zone/editable-page-block/common/ImageWithPlaceholder";
import { IBlock, IBlockOptions } from "app/shared/model/block.model";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

interface Props extends Pick<IBlock, 'options' | 'id'>{
  isSelected: boolean;
}

const ThreeImageGallery: FC<Props> = ({ isSelected, options, id }) => {
  const imageContentList: IBlockOptions['content'] =
    options?.content || Array(3).fill({ value: '', description: '' });

  return (
    <Wrapper>
      {imageContentList.map((contentItem, index) => (
        <ImageWithPlaceholder
          description={contentItem.description || ''}
          src={contentItem.value}
          key={`${contentItem.value}-${index}`}
          isSelected={isSelected}
          options={options}
          index={index}
        />
      ))}
    </Wrapper>
  );
}

export default ThreeImageGallery;
