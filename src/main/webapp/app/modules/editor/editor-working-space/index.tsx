import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";
import { BlockState, setPageBlocks } from "app/entities/block/block.reducer";
import { DragDropContext, DragDropContextProps } from "react-beautiful-dnd";
import { EDITOR_BLUEPRINTS_ID, EDITOR_DROP_ZONE_ID } from "app/config/constants";
import { copy, reorder } from "app/utils/blockManipulation";
import SideMenu from "app/modules/editor/side-menu";
import DropZone from "app/modules/editor/drop-zone";
import { IBlock } from "app/shared/model/block.model";
import StyleManager from "app/modules/editor/style-manager";
import styled from "styled-components";
import TopActionButtons from "app/modules/editor/TopActionButtons";
import { IWebsite } from "app/shared/model/website.model";
import useEditingPage from "app/modules/editor/side-menu/pages/useEditingPage";
import { getEntity } from "app/entities/website/website.reducer";
import blueprints from "app/common/blueprints";

const Header = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.palette.neutral.white};
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid #6c757d29;
`;

const WorkingSpace = styled.div`
  display: flex;
`;

const WebsiteUrl = styled.div`
  font-weight: bold;
`;

interface Props {
  websiteId: IWebsite['id'];
}

const EditorWorkingSpace: FC<Props> = () => {
  const { page } = useEditingPage();

  const { entity: appUser } = useSelector<IRootState, IRootState['appUser']>(state => state.appUser);
  const { entity: website } = useSelector<IRootState, IRootState['website']>(state => state.website);

  const { entities: pageBlocks, loading } = useSelector<IRootState, IRootState['block']>(state => state.block);
  const editingBlockId = useSelector<IRootState, BlockState['editingBlockId']>(state => state.block.editingBlockId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (appUser?.websiteId) {
      dispatch(getEntity(appUser.websiteId))
    }
  }, [appUser]);

  const onDragEnd: DragDropContextProps['onDragEnd'] = ({ source, destination }) => {
    if (!destination) {
      return;
    }

    if (source.droppableId === EDITOR_BLUEPRINTS_ID && destination.droppableId === EDITOR_DROP_ZONE_ID) {
      dispatch(setPageBlocks(copy(blueprints, pageBlocks, source.index, destination.index, page.selectedPageDraftId)));
    } else if (source.droppableId === destination.droppableId && destination.droppableId === EDITOR_DROP_ZONE_ID) {
      dispatch(setPageBlocks(reorder(pageBlocks, source.index, destination.index)));
    }
  };

  return (
    <>
      <Header>
        {website?.url && (
          <WebsiteUrl>{website.url}</WebsiteUrl>
        )}
        <TopActionButtons/>
      </Header>
      <WorkingSpace>
        <DragDropContext onDragEnd={onDragEnd}>
          <SideMenu />
          <DropZone website={website} pageBlocks={pageBlocks as IBlock[]} loading={loading} />
        </DragDropContext>
        {editingBlockId && <StyleManager />}
      </WorkingSpace>
    </>
  );
};

export default EditorWorkingSpace;
