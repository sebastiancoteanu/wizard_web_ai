import React, { FC, useState } from 'react';
import styled from "styled-components";
import EditableProp from "app/modules/editor/style-manager/EditableProp";
import withClickInside from "app/modules/editor/side-menu/withClickInside";
import IconButton from "app/modules/ui-kit/IconButton";
import { Icons } from "app/modules/assets/fonts/icons";
import { Draggable, DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

const Wrapper = styled.div`
  cursor: pointer;
  min-height: 46px;
  color: ${({ theme }) => theme.colors.lightestGray};
  font-size: 16px;
  display: flex;
  align-items: center;
  padding-bottom: 12px;

`;

const PageName = styled.div`
  width: 100%;
`;

const StyledEditablePage = styled(EditableProp)<{ isEdit: boolean }>`
  input {
    -webkit-box-shadow: 0 0 0 1000px ${({ theme, isEdit }) => isEdit ? theme.colors.lighter : theme.colors.darkestGray} inset;
  }
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
  isEdit?: boolean;
}

const EditablePage: FC<Props> = ({
  name,
  isEdit = false,
}) => {
  const { wrapperRef, isClickedInside, clickInside } = withClickInside();
  const [isPageVisible, setVisibility] = useState(true);

  return (
    <Wrapper ref={wrapperRef}>
      {isClickedInside || isEdit ? (
        <StyledEditablePage onChange={() => {}} value={name} placeholder="Page name" isEdit={isEdit} />
      ) : (
        <>
          <PageName onClick={clickInside}>{name}</PageName>
          <VisibilityButton
            onClick={() => setVisibility(!isPageVisible)}
            name={isPageVisible ? Icons.Visible : Icons.Invisible}
          />
        </>
      )}
    </Wrapper>
  );
}

export default EditablePage;
