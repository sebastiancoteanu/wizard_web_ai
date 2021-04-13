import React, { FC } from 'react';
import styled, { keyframes } from "styled-components";
import { blueprints } from "app/common";
import BlockBluePrint from "app/modules/editor/side-menu/BlockBlueprint";
import { BlockType } from "app/shared/model/enumerations/block-type.model";

const slideAnimation = keyframes`
 0% { margin-left: -250px }
 100% { margin-left: 0; }
`;

const Wrapper = styled.div`
  box-shadow: 2px 0 5px 0 #888888a8;
  display: inline-flex;
  background: ${({theme}) => theme.colors.darkGray};
  padding-top: 60px;
  overflow: hidden;
  height: calc(100vh - 60px);
`;

const InnerWrapper = styled.div`
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
    background: ${({ theme }) => theme.colors.lightestGray};;
  }
`;

interface Props {
  setPageBlocks: (blocks: BlockType[]) => void;
  pageBlocks: BlockType[];
}

const BlockBlueprints: FC<Props> = ({ setPageBlocks, pageBlocks }) => (
  <Wrapper>
    <InnerWrapper>
      {blueprints.map(blockType => (
        <BlockBluePrint key={blockType} blockType={blockType} setPageBlocks={setPageBlocks} pageBlocks={pageBlocks} />
      ))}
    </InnerWrapper>
  </Wrapper>

);

export default BlockBlueprints;
