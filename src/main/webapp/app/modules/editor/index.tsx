import React, { FC, useState } from 'react';
import Header from "app/shared/layout/header/header";
import SideMenu from "app/modules/editor/side-menu";
import TopActionButtons from "app/modules/editor/TopActionButtons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropZone from "app/modules/editor/drop-zone";
import styled from "styled-components";
import { BlockType } from "app/shared/model/enumerations/block-type.model";

const DragDropZoneWrapper = styled.div`
  display: flex;
`;

const Editor: FC = () => {
  const [pageBlocks, setPageBlocks] = useState<BlockType[]>([]);
  return (
    <>
      <Header>
        <TopActionButtons/>
      </Header>
      <DndProvider backend={HTML5Backend}>
        <DragDropZoneWrapper>
          <SideMenu pageBlocks={pageBlocks} setPageBlocks={setPageBlocks} />
          <DropZone pageBlocks={pageBlocks} />
        </DragDropZoneWrapper>
      </DndProvider>
    </>
  );
}

export default Editor;
