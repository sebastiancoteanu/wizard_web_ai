import React, { FC } from 'react';
import { BlockType } from "app/shared/model/enumerations/block-type.model";
import { Draggable } from "react-beautiful-dnd";
import styled, { css } from "styled-components";
import ActionBar from "app/modules/editor/action-bar";
import Paragraph from "app/modules/editor/drop-zone/editable-page-block/Paragraph";
import { IBlock } from "app/shared/model/block.model";
import Header from "app/modules/editor/drop-zone/editable-page-block/Header";
import ThreeImageGallery from "app/modules/editor/drop-zone/editable-page-block/ThreeImageGallery";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";
import { setEditingPageBlock } from "app/entities/block/block.reducer";
import SingleImage from "app/modules/editor/drop-zone/editable-page-block/SingleImage";

const BlockTypeLabel = styled.div`
  background: ${({ theme }) => theme.palette.primary.main};
  display: none;
  position: absolute;
  left: -0.5px;
  top: -24px;
  color: ${({ theme }) => theme.palette.neutral.white};
  align-items: center;
  font-size: 10px;
  line-height: 1.8;
  padding: 3.2px 4px;
`;

const Wrapper = styled.div<{ isSelected: boolean }>`
  box-sizing: border-box;
  ${({ isSelected, theme }) => isSelected && css`
    outline: 1px solid ${theme.palette.primary.main};

    ${BlockTypeLabel} {
      display: flex;
    }

  `}
  box-sizing: border-box;
  margin-bottom: 10px;
  
  &:hover {
    outline: 1px solid ${({ theme })=> theme.palette.primary.main};
    cursor: pointer;

    ${BlockTypeLabel} {
      display: flex;
    }
  }
`;

const InnerWrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
`;

const renderBlockType = (block: IBlock, isSelected) => {
  switch (block.type) {
  case BlockType.PARAGRAPH:
    return <Paragraph isSelected={isSelected} options={block?.options} />
  case BlockType.HEADER:
    return <Header isSelected={isSelected} options={block?.options} />
  case BlockType.IMAGE:
    return <SingleImage isSelected={isSelected} options={block?.options} />
  case BlockType.THREE_IMAGE_LIST:
    return <ThreeImageGallery isSelected={isSelected} options={block?.options} />
  default:
    return <div>type</div>
  }
};

interface Props {
  index: number;
  block: IBlock;
}

const EditablePageBlock: FC<Props> = ({ index, block }) => {
  const isBlockSelected = useSelector<IRootState, boolean>(state => state.block.editingBlockId === block.id);
  const dispatch = useDispatch();

  const handleBlockSelect = () => {
    dispatch(setEditingPageBlock(block.id));
  }

  return (
    <Draggable draggableId={String(block.id)} index={index}>
      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={provided.draggableProps.style}
          onClick={handleBlockSelect}
          isSelected={isBlockSelected}
        >
          <InnerWrapper>
            <BlockTypeLabel>{block.type}</BlockTypeLabel>
            {renderBlockType(block, isBlockSelected)}
            <ActionBar
              dragProps={provided.dragHandleProps}
              isSelected={isBlockSelected}
              index={index}
            />
          </InnerWrapper>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default EditablePageBlock;
