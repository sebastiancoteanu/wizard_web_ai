import React, { FC } from 'react';
import styled, { CSSProperties } from "styled-components";
import EditableText from "app/modules/editor/drop-zone/editable-page-block/common/EditableText";
import { IBlock } from "app/shared/model/block.model";

const textPlaceholder = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in ultricies elit. ' +
  'Praesent rutrum enim ut tincidunt vulputate. Ut dictum metus et mi mattis, eu ultricies ante congue. ' +
  'Ut sit amet velit sit amet felis posuere consequat a vitae nunc.';

const PreStyledParagraph = styled.p`
  width: 100%;
  display: flex;
`;

const StyledParagraph = styled(PreStyledParagraph)<{ cssProps: CSSProperties}>(({ cssProps }) => ({
  ...cssProps
}));

interface Props extends Pick<IBlock, 'options'> {
  isSelected: boolean;
  text?: string;
}

const Paragraph: FC<Props> = ({ isSelected, options }) => {
  const text = options?.content?.length ? options.content[0] : textPlaceholder;

  return (
    <StyledParagraph cssProps={options?.cssProperties}>
      {isSelected ? (
        <EditableText placeHolder={textPlaceholder} cssProps={options?.cssProperties} />
      ) : text}
    </StyledParagraph>
  );
}

export default Paragraph;
