import React, { FC } from 'react';
import { BlockType } from "app/shared/model/enumerations/block-type.model";
import { Draggable } from "react-beautiful-dnd";
import styled, { css } from "styled-components";
import ActionBar from "app/modules/editor/action-bar";
import withClickInside from "app/modules/editor/side-menu/withClickInside";
import Paragraph from "app/modules/editor/drop-zone/editable-page-block/Paragraph";

interface Props {
  index: number;
  type: BlockType;
  draggableId: string;
}

const Wrapper = styled.div<{ isSelected: boolean }>`
  width: 100%;
  box-sizing: border-box;
  ${({ isSelected, theme }) => isSelected && css`
    outline: 1px solid ${theme.palette.primary.main};
  `}
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const renderBlockType = (type: BlockType, isSelected) => {
  switch (type) {
    case BlockType.PARAGRAPH:
      return <Paragraph isSelected={isSelected} />
    default:
      return <div>type</div>
  }
};

const EditablePageBlock: FC<Props> = ({ index, type, draggableId }) => {
  const { clickInside, isClickedInside, wrapperRef } = withClickInside();

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={provided.draggableProps.style}
          isSelected={isClickedInside}
        >
          <InnerWrapper onClick={() => clickInside()} ref={wrapperRef}>
            {renderBlockType(type, isClickedInside)}
            <ActionBar dragProps={provided.dragHandleProps} isSelected={isClickedInside} />
          </InnerWrapper>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default EditablePageBlock;
