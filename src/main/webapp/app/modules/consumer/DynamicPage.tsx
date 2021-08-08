import React, { FC, useEffect } from 'react';
import { IPage } from "app/shared/model/page.model";
import { useDispatch, useSelector } from "react-redux";
import { getEntities } from "app/entities/block/block.reducer";
import { IRootState } from "app/shared/reducers";
import styled from "styled-components";
import { renderBlockType } from "app/modules/editor/drop-zone/editable-page-block";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
`;

const BlockWrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
`;

interface Props {
  page: IPage;
}

const DynamicPage: FC<Props> = ({ page }) => {
  const dispatch = useDispatch();
  const { entities: pageBlocks, loading } = useSelector<IRootState, IRootState['block']>(state => state.block);

  useEffect(() => {
    dispatch(getEntities(page.selectedPageDraftId));
  }, []);

  return (
    <Wrapper>
      {pageBlocks.map((block, index) => (
        <BlockWrapper key={block.id}>
          {renderBlockType(block)}
        </BlockWrapper>
      ))}
    </Wrapper>
  );
};

export default DynamicPage;
