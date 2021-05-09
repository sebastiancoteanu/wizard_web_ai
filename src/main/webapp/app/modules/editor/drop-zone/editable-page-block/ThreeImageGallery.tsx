import React, { FC } from 'react';
import styled from "styled-components";
import ImageWithPlaceholder from "app/modules/editor/drop-zone/editable-page-block/common/ImageWithPlaceholder";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

interface Props {
  sources: string[];
  isSelected: boolean;
}

const ThreeImageGallery: FC<Props> = ({ sources = Array(3), isSelected }) => (
  <Wrapper>
    <ImageWithPlaceholder src={sources[0]} isSelected={isSelected} />
    <ImageWithPlaceholder src={sources[1]} isSelected={isSelected} />
    <ImageWithPlaceholder src={sources[2]} isSelected={isSelected} />
  </Wrapper>
);

export default ThreeImageGallery;
