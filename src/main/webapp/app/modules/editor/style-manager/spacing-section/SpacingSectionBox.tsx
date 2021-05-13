import React, { FC } from 'react';
import styled from "styled-components";
import EditableProp from "app/modules/editor/style-manager/EditableProp";
import useCurrentEditingBlock from "app/modules/editor/style-manager/useCurrentEditingBlock";
import { useDispatch } from "react-redux";
import { updateEditingPageBlockCss } from "app/entities/block/block.reducer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;
`;

const InlineProps = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const EditableSpaceProp = styled(EditableProp)`
  max-width: 40px;
  justify-content: center;
  
  > input, input:focus {
    background-color: transparent;
    -webkit-box-shadow: none;
  }
  
  > input {
    text-align: center;
    padding: 0;
    border: none;
  }
`;

const Placeholder = styled.div<{ hasChildren: boolean }>`
  width: 100%;
  min-height: 20px;
  flex: 1;
  background: ${({ theme, hasChildren }) => hasChildren ? 'transparent' : theme.colors.gray};

  > div {
    border: 5px solid ${({ theme }) => theme.colors.gray};
  }
`;

const Title = styled.div`
  text-transform: uppercase;
  font-size: 10px;
  position: absolute;
  left: 8px;
  top: 8px;
  letter-spacing: 0.5px;
`;

interface Props {
  namePrefix: string;
  title: string;
}

const SpacingSectionBox: FC<Props> = ({ children, title, namePrefix }) => {
  const editingBlock = useCurrentEditingBlock();
  const dispatch = useDispatch()

  const handleOnChange = (name, value) => {
    dispatch(updateEditingPageBlockCss({ [namePrefix + name]: value }));
  };

  const cssProps = editingBlock?.options?.cssProperties;

  const getComputedValue = (name) => {
    return (cssProps && cssProps[namePrefix + name]) || 0;
  }

  return (
    <Wrapper>
      <Title>{title}</Title>
      <EditableSpaceProp name="Top" onChange={handleOnChange} value={getComputedValue("Top")} />
      <InlineProps>
        <EditableSpaceProp name="Left" onChange={handleOnChange} value={getComputedValue("Left")} />
        <Placeholder hasChildren={!!children}>{children}</Placeholder>
        <EditableSpaceProp name="Right" onChange={handleOnChange} value={getComputedValue("Right")} />
      </InlineProps>
      <EditableSpaceProp name="Bottom" onChange={handleOnChange} value={getComputedValue("Bottom")} />
    </Wrapper>
  );
}

export default SpacingSectionBox;
