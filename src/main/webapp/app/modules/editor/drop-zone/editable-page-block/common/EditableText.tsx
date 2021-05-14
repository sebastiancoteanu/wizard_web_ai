import React, { ChangeEvent, FC } from 'react';
import styled, { CSSProperties } from "styled-components";
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch } from "react-redux";
import { updateEditingPageBlockContent } from "app/entities/block/block.reducer";
import useCurrentEditingBlock from "app/modules/editor/style-manager/useCurrentEditingBlock";

const StyledTextArea = styled(TextareaAutosize)<{ cssProps: CSSProperties}>`
  width: 100%;
  border: none;
  margin: 0;
  background: transparent;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

const TextArea = styled(StyledTextArea)(({ cssProps }) => ({
  ...cssProps,
  margin: '0 !important',
  padding: '0 !important',
}));

interface Props {
  cssProps?: CSSProperties;
  placeHolder: string;
}

const EditableText: FC<Props> = ({ placeHolder, cssProps }) => {
  const editingBlock = useCurrentEditingBlock();
  const dispatch = useDispatch()

  const content = editingBlock?.options?.content?.length ? editingBlock.options.content[0] : placeHolder;

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateEditingPageBlockContent([e.target.value]));
  };

  return (
    <TextArea
      spellCheck={false}
      placeholder={content}
      value={content}
      onChange={handleOnChange}
      autoFocus
      {...{cssProps}}
    />
  );
};

export default EditableText;
