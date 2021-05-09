import React, { FC } from 'react';
import styled from "styled-components";
import EditableText from "app/modules/editor/drop-zone/editable-page-block/common/EditableText";

const textPlaceholder = 'Lorem ipsum dolor sit amet.';

const StyledHeader = styled.h1`
  display: flex;
`;

interface Props {
  isSelected: boolean;
  text?: string;
}

const Header: FC<Props> = ({ isSelected, text }) => (
  <StyledHeader>
    {isSelected ? (
      <EditableText />
    ) : (
      text || textPlaceholder
    )}
  </StyledHeader>
);

export default Header;
