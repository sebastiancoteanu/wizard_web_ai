import React, { FC, useState } from 'react';
import Header from "app/shared/layout/header/header";
import SideMenu from "app/modules/editor/side-menu";
import TopActionButtons from "app/modules/editor/TopActionButtons";
import DropZone from "app/modules/editor/drop-zone";
import styled from "styled-components";
import { BlockType } from "app/shared/model/enumerations/block-type.model";
import { DragDropContext, DragDropContextProps } from 'react-beautiful-dnd';
import { blueprints } from "app/common";
import { EDITOR_DROP_ZONE_ID } from "app/config/constants";

const DragDropZoneWrapper = styled.div`
  display: flex;
`;

const Editor: FC = () => {
  const [pageBlocks, setPageBlocks] = useState<BlockType[]>([]);

  const onDragEnd: DragDropContextProps['onDragEnd'] = ({ destination, source }) => {
    if (!destination
        || destination.droppableId !== EDITOR_DROP_ZONE_ID
        || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const updatedPageBlockList = [...pageBlocks];
    let blockToMove;

    if (source.droppableId === EDITOR_DROP_ZONE_ID) {
      blockToMove = updatedPageBlockList.splice(source.index, 1)[0];
    } else {
      blockToMove = blueprints[source.index];
    }

    updatedPageBlockList.splice(destination.index, 0, blockToMove);
    setPageBlocks([...updatedPageBlockList]);
  };

  return (
    <>
      <Header>
        <TopActionButtons/>
      </Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <DragDropZoneWrapper>
          <SideMenu />
          <DropZone pageBlocks={pageBlocks} />
        </DragDropZoneWrapper>
      </DragDropContext>
    </>
  );
}

export default Editor;
