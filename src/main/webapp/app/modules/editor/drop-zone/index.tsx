import React, { FC } from 'react';
import styled from "styled-components";
import { Droppable } from 'react-beautiful-dnd';
import { EDITOR_DROP_ZONE_ID } from "app/config/constants";
import EditablePageBlock from "app/modules/editor/drop-zone/editable-page-block";
import { Block } from "app/types";

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  flex: 1;
  width: 100%;
`;

const InnerWrapper = styled.div<{ isDraggingOver: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
  padding: 40px 20px;
`;

interface Props {
  pageBlocks: Block[];
}

const DropZone: FC<Props> = ({ pageBlocks }) => {

  return (
    <Wrapper>
      <Droppable droppableId={EDITOR_DROP_ZONE_ID}>
        {(provided, snapshot) => (
          <InnerWrapper
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {pageBlocks.map((block, index) => (
              <EditablePageBlock key={block.id} draggableId={block.id} index={index} type={block.type} />
            ))}
            {provided.placeholder}
          </InnerWrapper>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default DropZone;
