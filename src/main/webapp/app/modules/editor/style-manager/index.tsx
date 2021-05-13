import React, { FC } from 'react';
import styled from "styled-components";
import StyleSection from "app/modules/editor/style-manager/StyleSection";
import EditableProp from "app/modules/editor/style-manager/EditableProp";
import { useDispatch } from "react-redux";
import { IBlock } from "app/shared/model/block.model";
import useCurrentEditingBlock from "app/modules/editor/style-manager/useCurrentEditingBlock";
import { updateEditingPageBlockCss } from "app/entities/block/block.reducer";
import SpacingSection from "app/modules/editor/style-manager/spacing-section";

const Wrapper = styled.div`
  padding: 12px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  flex: 0 0 300px;
  background: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.lightestGray};
`;

const InlineGroupProps = styled.div`
  display: flex;
  padding: 0 12px;
  
  &:not(:first-child) {
    margin-top: 12px;
  }

  > div {
    &:not(:last-child) {
      margin-right: 12px;
    }
  }
`;

const StyleManager: FC<{ options?: IBlock['options'] }> = ({ options }) => {
  const editingBlock = useCurrentEditingBlock();
  const dispatch = useDispatch()

  const handleOnChange = (name, value) => {
    dispatch(updateEditingPageBlockCss({ [name]: value }));
  };

  const cssProps = editingBlock?.options?.cssProperties;

  return (
    <Wrapper>
      <StyleSection title="Typography" isDefaultOpen>
        <InlineGroupProps>
          <EditableProp name="fontSize" label="Font size" value={cssProps?.fontSize} onChange={handleOnChange} />
          <EditableProp name="fontWeight" label="Font weight" value={cssProps?.fontWeight} onChange={handleOnChange} />
        </InlineGroupProps>
        <InlineGroupProps>
          <EditableProp name="letterSpacing" label="Letter spacing" value={cssProps?.letterSpacing} onChange={handleOnChange} />
          <EditableProp name="textDecoration" label="Text decoration" value={cssProps?.textDecoration} onChange={handleOnChange} />
        </InlineGroupProps>
        <InlineGroupProps>
          <EditableProp name="color" label="Font color" value={cssProps?.color} type="color" onChange={handleOnChange} />
          <EditableProp name="lineHeight" label="Line height" value={cssProps?.lineHeight} onChange={handleOnChange} />
        </InlineGroupProps>
      </StyleSection>
      <StyleSection title="Sizes" isDefaultOpen>
        <InlineGroupProps>
          <EditableProp name="width" label="Width" value={cssProps?.width} onChange={handleOnChange} />
          <EditableProp name="height" label="Height" value={cssProps?.height} onChange={handleOnChange} />
        </InlineGroupProps>
        <InlineGroupProps>
          <EditableProp name="minWidth" label="Min width" value={cssProps?.minWidth} onChange={handleOnChange} />
          <EditableProp name="maxWidth" label="Max width" value={cssProps?.maxWidth} onChange={handleOnChange} />
        </InlineGroupProps>
        <InlineGroupProps>
          <EditableProp name="minHeight" label="Min height" value={cssProps?.minHeight} onChange={handleOnChange} />
          <EditableProp name="maxHeight" label="Max height" value={cssProps?.maxHeight} onChange={handleOnChange} />
        </InlineGroupProps>
      </StyleSection>
      <SpacingSection />
    </Wrapper>
  );
};

export default StyleManager;
