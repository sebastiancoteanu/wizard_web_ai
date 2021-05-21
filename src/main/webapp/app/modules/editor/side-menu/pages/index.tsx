import React, { FC, useEffect } from 'react';
import styled from "styled-components";
import { DragDropContext, DragDropContextProps, Droppable } from "react-beautiful-dnd";
import DraggablePage from "app/modules/editor/side-menu/pages/DraggablePage";
import { PAGES_DRAG_DROP_ID } from "app/config/constants";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";
import NewPage from "app/modules/editor/side-menu/pages/NewPage";
import { reorder } from "app/utils/blockManipulation";
import { getEntities, setPages } from "app/entities/page/page.reducer";
import { getEntityByUserId } from "app/entities/app-user/app-user.reducer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: -12px;
`;

const Pages: FC = () => {
  const { entities: pages } = useSelector<IRootState, IRootState['page']>(state => state.page);
  const { entity } = useSelector<IRootState, IRootState['appUser']>(state => state.appUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (entity.websiteId) {
      dispatch(getEntities(entity.websiteId));
    }
  }, [entity.websiteId]);

  const handleDragEnd: DragDropContextProps['onDragEnd'] = ({ source, destination}) => {
    if (source.droppableId === destination?.droppableId && destination?.droppableId === PAGES_DRAG_DROP_ID) {
      dispatch(setPages(reorder(pages, source.index, destination.index)));
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={PAGES_DRAG_DROP_ID}>
        {provided => (
          <Wrapper {...provided.droppableProps} ref={provided.innerRef}>
            <NewPage />
            {pages.map((page, index) => (
              <DraggablePage name={page.url} index={index} key={page.url }/>
            ))}
            {provided.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Pages;
