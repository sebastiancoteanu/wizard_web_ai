import React, { FC, useState } from 'react';
import styled from "styled-components";
import PrimaryButton from "app/modules/ui-kit/PrimaryButton";
import SecondaryButton from "app/modules/ui-kit/SecondaryButton";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";
import { PageDraftState } from "app/entities/page-draft/page-draft.reducer";
import { updateAllEntities } from "app/entities/block/block.reducer";
import { IBlock } from "app/shared/model/block.model";
import useEditingPage from "app/modules/editor/side-menu/pages/useEditingPage";
import { updateEntity } from "app/entities/page/page.reducer";
import Spinner from "app/modules/ui-kit/Spinner";
import CognitiveService from "app/utils/CognitiveService";
import ContentModeratorModal from "app/modules/editor/content-moderator-modal";

const Wrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const PublishButton = styled(PrimaryButton)`
  margin-right: 15px;
`;

const TopActionButtons: FC = () => {
  const [isModeratorModalOpen, setModeratorModalOpen] = useState(false);
  const [warnings, setWarnings] = useState([]);

  const dispatch = useDispatch();
  const {
    entities: blocks,
    updating: saveDraftInProgress
  } = useSelector<IRootState, IRootState['block']>(state => state.block);

  const { updating: publishPageInProgress } = useSelector<IRootState, IRootState['page']>(state => state.page);

  const { page } = useEditingPage();

  const canSaveAsDraft = useSelector<IRootState, PageDraftState['draftHasChanged']>(
    state => state.pageDraft.draftHasChanged
  ) && !saveDraftInProgress;

  const canPublish = page.id && !page.isPublished && !publishPageInProgress;

  const handleSaveAsDraft = async () => {
    const textToAnalyze = CognitiveService.compressTextBlocks(blocks as IBlock[]);
    const moderationWarnings = await CognitiveService.textModeration(textToAnalyze);

    if (moderationWarnings.length) {
      setWarnings(moderationWarnings);
      setModeratorModalOpen(true);
      return;
    }

    return dispatch(updateAllEntities(blocks as IBlock[]))
  };

  const handlePublishPage = () => {
    dispatch(updateEntity({
      ...page,
      isPublished: true,
    }));
  };

  return (
    <Wrapper>
      <PublishButton
        disabled={!canPublish}
        onClick={handlePublishPage}
      >
        {publishPageInProgress ? <Spinner /> : <span>Publish</span>}
      </PublishButton>
      <SecondaryButton
        disabled={!canSaveAsDraft}
        onClick={handleSaveAsDraft}
      >
        {saveDraftInProgress ? <Spinner /> : <span>Save draft</span>}
      </SecondaryButton>
      {isModeratorModalOpen && (
        <ContentModeratorModal
          setModalOpen={setModeratorModalOpen}
          warnings={warnings}
        />
      )}
    </Wrapper>
  );
}

export default TopActionButtons;
