import React, { FC, useState } from 'react';
import Header from "app/shared/layout/header/header";
import SideMenu from "app/modules/editor/side-menu";
import TopActionButtons from "app/modules/editor/TopActionButtons";
import DropZone from "app/modules/editor/drop-zone";
import styled from "styled-components";
import { DragDropContext, DragDropContextProps } from 'react-beautiful-dnd';
import { blueprints } from "app/common";
import { EDITOR_BLUEPRINTS_ID, EDITOR_DROP_ZONE_ID } from "app/config/constants";
import { Block } from "app/types";
import { uuid } from "uuidv4";
import StyleManager from "app/modules/editor/style-manager";

const EditorWorkingSpace = styled.div`
  display: flex;
`;

const reorder = (list: Block[], startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const copy = (source: Block[], destination: Block[], sourceIndex, destinationIndex) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[sourceIndex];

  destClone.splice(destinationIndex, 0, { ...item, id: uuid() });
  return destClone;
};

const Editor: FC = () => {
  const [pageBlocks, setPageBlocks] = useState<Block[]>([]);

  const onDragEnd: DragDropContextProps['onDragEnd'] = ({ source, destination }) => {
    if (!destination) {
      return;
    }

    if (source.droppableId === EDITOR_BLUEPRINTS_ID) {
      setPageBlocks(copy(blueprints, pageBlocks, source.index, destination.index))
    } else if (source.droppableId === destination.droppableId) {
      setPageBlocks(reorder(pageBlocks, source.index, destination.index));
    }
  };

  return (
    <>
      <Header>
        <TopActionButtons/>
      </Header>
      <EditorWorkingSpace>
        <DragDropContext onDragEnd={onDragEnd}>
          <SideMenu />
          <DropZone pageBlocks={pageBlocks} />
        </DragDropContext>
        <StyleManager />
      </EditorWorkingSpace>
    </>
  );
}

export default Editor;
