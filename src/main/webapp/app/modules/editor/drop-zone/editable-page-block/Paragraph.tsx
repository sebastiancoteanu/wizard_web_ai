import React, { FC } from 'react';
import styled from "styled-components";
import EditableText from "app/modules/editor/drop-zone/editable-page-block/common/EditableText";

const textPlaceholder = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in ultricies elit. ' +
  'Praesent rutrum enim ut tincidunt vulputate. Ut dictum metus et mi mattis, eu ultricies ante congue. ' +
  'Ut sit amet velit sit amet felis posuere consequat a vitae nunc.';

const StyledParagraph = styled.p`
  display: flex;
`;

interface Props {
  isSelected: boolean;
  text?: string;
}

const Paragraph: FC<Props> = ({ isSelected, text }) => (
  <StyledParagraph>
    {isSelected ? (
      <EditableText />
    ) : (
      text || textPlaceholder
    )}
  </StyledParagraph>
);

export default Paragraph;
