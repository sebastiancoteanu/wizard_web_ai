import React, { FC, useState } from 'react';
import styled from "styled-components";
import PrimaryButton from "app/modules/ui-kit/PrimaryButton";
import SecondaryButton from "app/modules/ui-kit/SecondaryButton";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";
import { PageDraftState } from "app/entities/page-draft/page-draft.reducer";
import { updateAllEntities } from "app/entities/block/block.reducer";
import { IBlock } from "app/shared/model/block.model";

const Wrapper = styled.div`
  margin-left: auto;
`;

const PublishButton = styled(PrimaryButton)`
  margin-right: 15px;
`;

const TopActionButtons: FC = () => {
  const dispatch = useDispatch();
  const { entities: blocks, updating } = useSelector<IRootState, IRootState['block']>(state => state.block);
  const canSaveAsDraft = useSelector<IRootState, PageDraftState['draftHasChanged']>(state => state.pageDraft.draftHasChanged);
  const canPublish = false;

  const handleSaveAsDraft = () => {
    dispatch(updateAllEntities(blocks as IBlock[]));
  };

  return (
    <Wrapper>
      <PublishButton disabled={canPublish}>Publish</PublishButton>
      <SecondaryButton disabled={!canSaveAsDraft || updating} onClick={handleSaveAsDraft}>Save draft</SecondaryButton>
    </Wrapper>
  );
}

export default TopActionButtons;
