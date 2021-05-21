import React, { FC } from 'react';
import { BlockType } from "app/shared/model/enumerations/block-type.model";
import blockTypeBlueprintMapper from "app/modules/editor/side-menu/blueprints/common/blockTypeBlueprintMapper";
import styled, { css } from "styled-components";
import Icon from "app/modules/ui-kit/Icon";
import { DraggableProvided, DraggableProvidedDraggableProps } from "react-beautiful-dnd";

export const Wrapper = styled.div<Pick<Props, 'isDragging'>>`
  height: 100px;
  width: 49%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 5px;
  transition: all 0.1s ease-in;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.darkestGray};
  color: ${({ theme }) => `${theme.colors.ivory}bf`};
  
  &:hover, &:active, &:focus {
    background-color: ${({ theme }) => theme.colors.lightestGray};
    color: ${({ theme }) => theme.colors.lightGray};
  }
  
  ${({ isDragging }) => isDragging && css`
    background-color: ${({ theme }) => theme.colors.lightestGray};
    color: ${({ theme }) => theme.colors.lightGray};
  `}
`;

export const BlueprintSymbol = styled(Icon)`
`;

export const Caption = styled.div`
  margin-top: 4px;
`;

interface Props {
  isDragging?: boolean;
  blockType: BlockType;
  providedRef?: DraggableProvided['innerRef'];
  style?: DraggableProvidedDraggableProps['style'];
}

const Blueprint: FC<Props> = ({ providedRef, blockType, ...props }) => (
  <Wrapper {...props} ref={providedRef}>
    <BlueprintSymbol name={blockTypeBlueprintMapper[blockType].icon} />
    <Caption>{blockTypeBlueprintMapper[blockType].caption}</Caption>
  </Wrapper>
);

export default Blueprint;
