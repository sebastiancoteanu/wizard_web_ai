import React, { FC } from 'react';
import styled from "styled-components";
import { BlockType } from "app/shared/model/enumerations/block-type.model";
import { Droppable } from 'react-beautiful-dnd';
import { EDITOR_DROP_ZONE_ID } from "app/config/constants";
import EditablePageBlock from "app/modules/editor/drop-zone/editable-page-block";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  overflow: auto;
  flex: 1;
`;

interface Props {
  pageBlocks: BlockType[];
}

const DropZone: FC<Props> = ({ pageBlocks }) => {

  return (
    <Droppable droppableId={EDITOR_DROP_ZONE_ID}>
      {(provided) => (
        <Wrapper {...provided.droppableProps} ref={provided.innerRef}>
          {pageBlocks.map((block, index) => (
            <EditablePageBlock key={block} index={index} type={block} />
          ))}
          {provided.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}

export default DropZone;
