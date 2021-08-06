import React, { FC, useEffect } from 'react';
import styled from "styled-components";
import { Droppable } from 'react-beautiful-dnd';
import { EDITOR_DROP_ZONE_ID } from "app/config/constants";
import EditablePageBlock from "app/modules/editor/drop-zone/editable-page-block";
import { IBlock } from "app/shared/model/block.model";
import useEditingPage from "app/modules/editor/side-menu/pages/useEditingPage";
import { useDispatch } from "react-redux";
import { getEntities } from "app/entities/block/block.reducer";
import PageLoader from "app/modules/ui-kit/PageLoader";

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

const BlocksLoader = styled(PageLoader)`
  margin: 30px auto 0;
`;

interface Props {
  pageBlocks: IBlock[];
  loading: boolean;
}

const DropZone: FC<Props> = ({ pageBlocks, loading }) => {
  const { page } = useEditingPage();
  const dispatch = useDispatch();

  useEffect(() => {
    if (page?.id && page?.selectedPageDraftId) {
      dispatch(getEntities(page.selectedPageDraftId));
    }
  }, [page?.id, page?.selectedPageDraftId]);

  if (!page.id) {
    return null;
  }

  if (loading) {
    return (
      <Wrapper>
        <BlocksLoader />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Droppable droppableId={EDITOR_DROP_ZONE_ID}>
        {(provided, snapshot) => (
          <InnerWrapper
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {pageBlocks.map((block, index) => (
              <EditablePageBlock key={block.id} index={index} block={block} />
            ))}
            {provided.placeholder}
          </InnerWrapper>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default DropZone;
