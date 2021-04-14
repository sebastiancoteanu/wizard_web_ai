import React, { FC } from 'react';
import { BlockType } from "app/shared/model/enumerations/block-type.model";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface Props {
  index: number;
  type: BlockType;
}

const Wrapper = styled.div`
  min-height: 200px;
  width: 100%;
  border: 1px solid black;
  box-sizing: border-box;
`;

const EditablePageBlock: FC<Props> = ({ index, type }) => (
  <Draggable draggableId={type} index={index}>
    {(provided => (
      <Wrapper
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        {type}
      </Wrapper>
    ))}
  </Draggable>
);

export default EditablePageBlock;
