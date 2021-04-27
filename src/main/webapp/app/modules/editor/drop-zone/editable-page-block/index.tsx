import React, { FC, useState } from 'react';
import { BlockType } from "app/shared/model/enumerations/block-type.model";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import ActionBar from "app/modules/editor/action-bar";
import withClickInside from "app/modules/editor/side-menu/withClickInside";

interface Props {
  index: number;
  type: BlockType;
  draggableId: string;
}

const Wrapper = styled.div<{ isDragging: boolean }>`
  min-height: 100px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  box-sizing: border-box;
  position: relative;
  margin-bottom: 10px;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const EditablePageBlock: FC<Props> = ({ index, type, draggableId }) => {
  const { clickInside, isClickedInside, wrapperRef } = withClickInside();
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
          style={provided.draggableProps.style}
        >
          <InnerWrapper ref={wrapperRef} onClick={() => clickInside()}>
            <ActionBar dragProps={provided.dragHandleProps} isSelected={isClickedInside} />
            {type}
          </InnerWrapper>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default EditablePageBlock;
