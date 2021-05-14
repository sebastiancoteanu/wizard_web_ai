import React, { FC } from 'react';
import styled, { keyframes } from "styled-components";
import { blueprints } from "app/common";
import BlockBluePrint from "app/modules/editor/side-menu/BlockBlueprint";
import { Droppable } from "react-beautiful-dnd";
import { EDITOR_BLUEPRINTS_ID } from "app/config/constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

const BlockBlueprints: FC = () => (
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

export default BlockBlueprints;
