import React, { FC } from 'react';
import { Modal, ModalBody, ModalContent } from 'reactstrap';
import { Icons } from "app/modules/assets/fonts/icons";
import styled from "styled-components";
import IconButton from "app/modules/ui-kit/IconButton";
import Icon from "app/modules/ui-kit/Icon";
import Warnings from "app/modules/editor/content-moderator-modal/Warnings";
import { ContentWarnings } from "app/modules/editor/types";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px 0;
  margin-bottom: 12px;
  border-top: 6px solid ${({ theme }) => theme.colors.danger};
`;

const Body = styled(ModalBody)`
  
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.danger};
  justify-content: center;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 24px;
`;

const ErrorIcon = styled(Icon)`
  font-size: 40px;
  margin-right: 8px;
`;

const CloseModalButton = styled(IconButton)`
  background: ${({ theme }) => theme.colors.lightestGray};
  border-radius: 50%;
  padding: 8px;
  font-size: 6px;
  margin-left: auto;
`;

interface Props {
  setModalOpen: (_: boolean) => void;
  warnings: ContentWarnings;
}

const ContentModeratorModal: FC<Props> = ({ setModalOpen, warnings }) => {
  // TODO: loading handle properly
  return (
    <Modal isOpen toggle={() => setModalOpen(false)} centered>
      <Header>
        <CloseModalButton name={Icons.Cancel} onClick={() => setModalOpen(false)} />
      </Header>
      <Body>
        <TitleWrapper>
          <ErrorIcon name={Icons.Error} />
          <Title>Not allowed to save</Title>
        </TitleWrapper>
        <Warnings warnings={warnings} />
      </Body>
    </Modal>
  )
}

export default ContentModeratorModal;
