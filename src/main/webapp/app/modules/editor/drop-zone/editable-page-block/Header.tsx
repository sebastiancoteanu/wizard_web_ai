import React, { FC } from 'react';
import styled, { CSSProperties } from "styled-components";
import EditableText from "app/modules/editor/drop-zone/editable-page-block/common/EditableText";
import { IBlock } from "app/shared/model/block.model";

const textPlaceholder = 'Lorem ipsum dolor sit amet.';

const PreStyledHeader = styled.h1`
  display: flex;
  width: 100%;
`;

const StyledHeader = styled(PreStyledHeader)<{ cssProps: CSSProperties}>(({ cssProps }) => ({
  ...cssProps
}));

interface Props extends Pick<IBlock, 'options'> {
  isSelected: boolean;
}

const Header: FC<Props> = ({ isSelected, options }) => {
  const text = options?.content?.length ? options.content[0] : textPlaceholder;

  return (
    <StyledHeader cssProps={options?.cssProperties}>
      {isSelected ? (
        <EditableText placeHolder={textPlaceholder} />
      ) : text}
    </StyledHeader>
  );
}

export default Header;
