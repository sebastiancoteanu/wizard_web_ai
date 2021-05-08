import React, { FC } from 'react';
import styled from "styled-components";
import EditableText from "app/modules/editor/drop-zone/editable-page-block/EditableText";

interface Props {
  isSelected: boolean;
  text?: string;
}

const Wrapper = styled.div`
  display: flex;
`;

const StyledParagraph = styled.p`
  margin: 0;
`;

const Paragraph: FC<Props> = ({ isSelected, text }) => (
  <Wrapper>
    {isSelected ? (
      <EditableText />
    ) : (
      <StyledParagraph>{text || 'Type your text here'}</StyledParagraph>
    )}
  </Wrapper>
);

export default Paragraph;
