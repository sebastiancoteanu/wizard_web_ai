import React, { FC, useEffect } from 'react';
import EditorWorkingSpace from "app/modules/editor/editor-working-space";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";
import { IUser } from "app/shared/model/user.model";
import { getEntityByUserId } from "app/entities/app-user/app-user.reducer";
import PageLoader from "app/modules/ui-kit/PageLoader";
import styled from "styled-components";
import WebsiteWizard from "app/modules/website-wizard";

const LoaderWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Editor: FC = () => {
  const account = useSelector<IRootState, IUser>(state => state.authentication.account);
  const { loading, entity, errorMessage } = useSelector<IRootState, IRootState['appUser']>(state => state.appUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (account.id) {
      dispatch(getEntityByUserId(account.id));
    }
  }, [account.id]);

  if (errorMessage) {
    return errorMessage;
  }

  if (loading) {
    return (
      <LoaderWrapper>
        <PageLoader />
      </LoaderWrapper>
    );
  }

  return entity.websiteId ? (
    <EditorWorkingSpace websiteId={entity.websiteId} />
  ) : (
    <WebsiteWizard userId={entity.id} />
  );
}

export default Editor;
