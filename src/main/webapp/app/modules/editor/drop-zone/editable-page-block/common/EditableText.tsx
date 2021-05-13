import React, { ChangeEvent, FC } from 'react';
import styled, { CSSProperties } from "styled-components";
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from "react-redux";
import { updateEditingPageBlockContent } from "app/entities/block/block.reducer";
import useCurrentEditingBlock from "app/modules/editor/style-manager/useCurrentEditingBlock";

const StyledTextArea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  margin: 0;
  background: transparent;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

const TextArea = styled(StyledTextArea)<{ cssProps: CSSProperties}>(({ cssProps }) => ({
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
    <TextArea cssProps={cssProps} placeholder={content} value={content} onChange={handleOnChange} autoFocus/>
  );
}

export default EditableText;
