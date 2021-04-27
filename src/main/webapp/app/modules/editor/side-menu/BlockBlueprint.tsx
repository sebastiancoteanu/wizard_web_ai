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
  user-select: none;
  
  ${({ isDragging }) => isDragging && css`
    opacity: 0.5;
  `}
`;

const BlueprintClone = styled(Blueprint)`
  
`;

interface Props {
  blockType: BlockType;
  index: number;
  draggableId: string;
}

const BlockBluePrint: FC<Props> = ({ blockType, index, draggableId }) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <>
          <Blueprint
            ref={provided.innerRef}
            src={blockTypeToImageMapper[blockType]}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
          />
          {snapshot.isDragging && <BlueprintClone src={blockTypeToImageMapper[blockType]} />}
        </>
      )}
    </Draggable>
  );
}

export default BlockBluePrint;
