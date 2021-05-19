import React, { FC } from 'react';
import styled from "styled-components";
import EditablePage from "app/modules/editor/side-menu/pages/EditablePage";
import { Droppable } from "react-beautiful-dnd";
import DraggablePage from "app/modules/editor/side-menu/pages/DraggablePage";
import { PAGES_DRAG_DROP_ID } from "app/config/constants";
import { useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: -12px;
`;

const Pages: FC = () => {
  const { entities: pages } = useSelector<IRootState, IRootState['page']>(state => state.page);

  return (
    <Droppable droppableId={PAGES_DRAG_DROP_ID}>
      {provided => (
        <Wrapper {...provided.droppableProps} ref={provided.innerRef}>
          {pages.map((page, index) => (
            <DraggablePage name={page.url} index={index} key={page.url }/>
          ))}
          {provided.placeholder}
          <EditablePage isEdit />
        </Wrapper>
      )}
    </Droppable>
  );
};

export default Pages;
