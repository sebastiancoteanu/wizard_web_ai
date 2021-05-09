import React, { FC, useState } from 'react';
import Header from "app/shared/layout/header/header";
import SideMenu from "app/modules/editor/side-menu";
import TopActionButtons from "app/modules/editor/TopActionButtons";
import DropZone from "app/modules/editor/drop-zone";
import styled from "styled-components";
import { DragDropContext, DragDropContextProps } from 'react-beautiful-dnd';
import { blueprints } from "app/common";
import { EDITOR_BLUEPRINTS_ID } from "app/config/constants";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";
import { IBlock } from "app/shared/model/block.model";
import { setPageBlocks } from "app/entities/block/block.reducer";
import { copy, reorder } from "app/utils/blockDrag";

const EditorWorkingSpace = styled.div`
  display: flex;
`;

const Editor: FC = () => {
  const { entities: pageBlocks } = useSelector<IRootState, IRootState['block']>(state => state.block);
  const dispatch = useDispatch();

  const onDragEnd: DragDropContextProps['onDragEnd'] = ({ source, destination }) => {
    if (!destination) {
      return;
    }

    if (source.droppableId === EDITOR_BLUEPRINTS_ID) {
      dispatch(setPageBlocks(copy(blueprints, pageBlocks, source.index, destination.index)));
    } else if (source.droppableId === destination.droppableId) {
      dispatch(setPageBlocks(reorder(pageBlocks, source.index, destination.index)));
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
          <DropZone pageBlocks={pageBlocks as IBlock[]} />
        </DragDropContext>
        {/* <StyleManager /> */}
      </EditorWorkingSpace>
    </>
  );
}

export default Editor;
