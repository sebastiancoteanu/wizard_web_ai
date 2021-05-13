import React, { FC } from 'react';
import styled from "styled-components";
import ImageWithPlaceholder from "app/modules/editor/drop-zone/editable-page-block/common/ImageWithPlaceholder";
import { IBlock } from "app/shared/model/block.model";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

interface Props extends Pick<IBlock, 'options'>{
  isSelected: boolean;
}

const ThreeImageGallery: FC<Props> = ({ isSelected, options }) => {
  const sources = options?.content || Array(3).fill('');

  return (
    <Wrapper>
      {sources.map((source, index) => (
        <ImageWithPlaceholder src={source} key={`${source}-${index}`} isSelected={isSelected} options={options} index={index} />
      ))}
    </Wrapper>
  );
}

export default ThreeImageGallery;
