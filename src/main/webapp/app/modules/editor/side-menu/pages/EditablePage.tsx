import React, { FC, useState } from 'react';
import styled from "styled-components";
import EditableProp from "app/modules/editor/style-manager/EditableProp";
import withClickInside from "app/modules/editor/side-menu/withClickInside";
import IconButton from "app/modules/ui-kit/IconButton";
import { Icons } from "app/modules/assets/fonts/icons";
import { Draggable, DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import Icon from "app/modules/ui-kit/Icon";
import { StyledEditablePage } from "app/modules/editor/side-menu/pages/common";

const Wrapper = styled.div<{ isClickedInside: boolean }>`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.lightestGray};
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  transition: all 0.1s ease-in;

  &:hover, &:active {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

const PageName = styled.div`
  width: 100%;
  min-height: 46px;
  padding-left: 9px;
  display: flex;
  align-items: center;
`;

const ReorderButtonWrapper = styled.div`
`;

const ReorderButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.lightestGray};
  font-size: 12px;
  pointer-events: none;
`;

const VisibilityButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.lightestGray};
  font-size: 12px;
  margin-right: 4px;
`;

interface Props {
  name?: string;
  dragProps: DraggableProvidedDragHandleProps;
}

const EditablePage: FC<Props> = ({ name, dragProps}) => {
  const { wrapperRef, isClickedInside, clickInside } = withClickInside();
  const [isPageVisible, setVisibility] = useState(true);

  return (
    <Wrapper ref={wrapperRef} isClickedInside={isClickedInside}>
      {isClickedInside ? (
        <StyledEditablePage onChange={() => {}} value={name} placeholder="Page name" />
      ) : (
        <>
          <PageName onClick={clickInside}>{name}</PageName>
          <VisibilityButton
            onClick={() => setVisibility(!isPageVisible)}
            name={isPageVisible ? Icons.Visible : Icons.Invisible}
          />
          <VisibilityButton
            onClick={() => setVisibility(!isPageVisible)}
            name={Icons.Delete}
          />
          <ReorderButtonWrapper {...dragProps} >
            <ReorderButton name={Icons.Scroll} />
          </ReorderButtonWrapper>
        </>
      )}
    </Wrapper>
  );
}

export default EditablePage;
