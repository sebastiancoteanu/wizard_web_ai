import React, { FC } from 'react';
import styled from "styled-components";
import BlockBluePrint from "app/modules/editor/side-menu/blueprints/BlockBlueprint";
import { Droppable } from "react-beautiful-dnd";
import { EDITOR_BLUEPRINTS_ID } from "app/config/constants";
import blueprints from "app/common/blueprints";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Blueprints: FC = () => (
  <Droppable droppableId={EDITOR_BLUEPRINTS_ID} isDropDisabled>
    {(provided, snapshot) => (
      <Wrapper ref={provided.innerRef}>
        {blueprints.map((block, index) => (
          <BlockBluePrint
            key={block.id}
            draggableId={String(block.id)}
            blockType={block.type}
            index={index}
          />
        ))}
        {provided.placeholder}
      </Wrapper>
    )}
  </Droppable>
);

export default Blueprints;
