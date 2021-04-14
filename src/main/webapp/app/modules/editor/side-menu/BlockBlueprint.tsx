import React, { FC } from 'react';
import styled, { css } from "styled-components";
import { BlockType } from "app/shared/model/enumerations/block-type.model";
import { blockTypeToImageMapper } from "app/common";
import { Draggable } from "react-beautiful-dnd";

const Blueprint = styled.img<{isDragging?: boolean }>`
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 5px;
  transition: all 0.1s ease-in;
  
  ${({ isDragging }) => isDragging && css`
    opacity: 0.5;
  `}
`;

interface Props {
  blockType: BlockType;
  index: number;
}

const BlockBluePrint: FC<Props> = ({ blockType, index }) => {
  return (
    <Draggable draggableId={blockType} index={index}>
      {(provided => (
        <Blueprint
          src={blockTypeToImageMapper[blockType]}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        />
      ))}
    </Draggable>
  );
}

export default BlockBluePrint;
