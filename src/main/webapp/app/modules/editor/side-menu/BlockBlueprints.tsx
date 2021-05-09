import React, { FC } from 'react';
import styled, { keyframes } from "styled-components";
import { blueprints } from "app/common";
import BlockBluePrint from "app/modules/editor/side-menu/BlockBlueprint";
import { BlockType } from "app/shared/model/enumerations/block-type.model";
import { Droppable } from "react-beautiful-dnd";
import { EDITOR_BLUEPRINTS_ID } from "app/config/constants";

const slideAnimation = keyframes`
 0% { margin-left: -250px }
 100% { margin-left: 0; }
`;

const Wrapper = styled.div`
  box-shadow: 2px 0 5px 0 #888888a8;
  display: inline-flex;
  background: ${({theme}) => theme.colors.gray};
  padding-top: 60px;
  overflow: hidden;
  height: calc(100vh - 60px);
`;

const InnerWrapper = styled.div<{ isDraggingOver: boolean }>`
  display: flex;
  flex-direction: column;
  width: 250px;
  background: transparent;
  animation: ${slideAnimation} .2s ease-in 0s normal forwards;
  padding: 0 20px 60px;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 5px;  /* Remove scrollbar space */
    background: ${({ theme }) => theme.colors.lighter};;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.ivory};;
  }
`;

const BlockBlueprints: FC = () => (
  <Wrapper>
    <Droppable droppableId={EDITOR_BLUEPRINTS_ID} isDropDisabled>
      {(provided, snapshot) => (
        <InnerWrapper isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef}>
          {blueprints.map((block, index) => (
            <BlockBluePrint
              key={block.id}
              draggableId={String(block.id)}
              blockType={block.type}
              index={index}
            />
          ))}
          {provided.placeholder}
        </InnerWrapper>
      )}
    </Droppable>
  </Wrapper>

);

export default BlockBlueprints;
