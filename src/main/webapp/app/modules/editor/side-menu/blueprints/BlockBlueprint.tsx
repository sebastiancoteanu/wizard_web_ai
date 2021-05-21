import React, { FC } from 'react';
import { BlockType } from "app/shared/model/enumerations/block-type.model";
import { Draggable } from "react-beautiful-dnd"
import Blueprint from "app/modules/editor/side-menu/blueprints/Blueprint";

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
            providedRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
            blockType={blockType}
            isDragging={snapshot.isDragging}
          >
          </Blueprint>
          {snapshot.isDragging && <Blueprint blockType={blockType} />}
        </>
      )}
    </Draggable>
  );
}

export default BlockBluePrint;
