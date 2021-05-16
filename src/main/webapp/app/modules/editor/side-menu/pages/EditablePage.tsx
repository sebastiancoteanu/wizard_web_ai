import React, { FC, useState } from 'react';
import styled from "styled-components";
import EditableProp from "app/modules/editor/style-manager/EditableProp";
import withClickInside from "app/modules/editor/side-menu/withClickInside";
import IconButton from "app/modules/ui-kit/IconButton";
import { Icons } from "app/modules/assets/fonts/icons";

const Wrapper = styled.div`
  cursor: pointer;
  min-height: 34px;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const InnerWrapper = styled.div`
  color: ${({ theme }) => theme.colors.lightestGray};
  font-size: 16px;
  display: flex;
  align-items: center;
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
`;

const VisibilityButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.lightestGray};
  font-size: 12px;
  margin-right: 4px;
`;

interface Props {
  name?: string;
  isEdit?: boolean;
  index?: number;
  draggableId?: string;
}

const EditablePage: FC<Props> = ({
  name,
  isEdit = false,
  index = -1,
  draggableId,
}) => {
  const { wrapperRef, isClickedInside, clickInside } = withClickInside();
  const [isPageVisible, setVisibility] = useState(true);

  if (isEdit) {
    return (
      <Wrapper>
        <InnerWrapper>
          <StyledEditablePage onChange={() => {}} value={name} placeholder="Page name" isEdit />
        </InnerWrapper>
      </Wrapper>
    )
  }

  return (
    <Wrapper ref={wrapperRef}>
      <InnerWrapper>
        {isClickedInside ? (
          <StyledEditablePage onChange={() => {}} value={name} placeholder="Page name" isEdit />
        ) : (
          <>
            <PageName onClick={clickInside}>{name}</PageName>
            <VisibilityButton
              onClick={() => setVisibility(!isPageVisible)}
              name={isPageVisible ? Icons.Visible : Icons.Invisible}
            />
            <ReorderButton name={Icons.Scroll} />
          </>
        )}
      </InnerWrapper>
    </Wrapper>
  );
}

export default EditablePage;
