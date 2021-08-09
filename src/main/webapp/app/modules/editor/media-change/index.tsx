import React, { ChangeEvent, FC, useState } from 'react';
import styled from "styled-components";
import SecondaryButton from "app/modules/ui-kit/SecondaryButton";
import { Modal, ModalBody } from 'reactstrap';
import { Icons } from "app/modules/assets/fonts/icons";
import IconButton from "app/modules/ui-kit/IconButton";
import useCurrentEditingBlock from "app/modules/editor/style-manager/useCurrentEditingBlock";
import { useDispatch } from "react-redux";
import { updateEditingPageBlockContent } from "app/entities/block/block.reducer";
import PrimaryButton from "app/modules/ui-kit/PrimaryButton";

const OpenModalTrigger = styled(SecondaryButton)`
  font-size: 12px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  margin: 16px 16px 0;
  border-bottom: 1px solid ${({theme}) => theme.colors.lightestGray};
`;

const Title = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.darkestGray};
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  background: transparent;
  padding: 6px 10px;
  border: 1px solid ${({ theme }) => theme.colors.lightestGray};
  margin-top: 16px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.darkestGray};


  ::placeholder {
    color: ${({ theme }) => theme.colors.darkestGray};
  }

  &:focus {
    outline: none;
  }
`;

const DropToUpload = styled.div`
  width: 100%;
  height: 150px;
  border: 2px dashed ${({ theme }) => theme.colors.lightestGray};
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkestGray};
`;

const CloseModalButton = styled(IconButton)`
  background: ${({ theme }) => theme.colors.lightestGray};
  border-radius: 50%;
  padding: 8px;
  font-size: 6px;
`;

const DragDropHint = styled.div`
  padding-bottom: 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkestGray};
`;

const ConfirmButton = styled(PrimaryButton)`
  margin-left: auto;
  margin-top: 16px;
  display: flex;
`;

interface Props {
  index: number;
}

const MediaChange: FC<Props> = ({ index }) => {
  const editingBlock = useCurrentEditingBlock();
  const content = editingBlock?.options?.content || Array(3).fill('');
  const [src, setSrc] = useState(content['index']);
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSrc(e.target.value);
  };

  const handleConfirm = () => {
    content[index] = src;
    dispatch(updateEditingPageBlockContent(content));
    setModalOpen(false);
  }

  const onClose = () => setModalOpen(false);

  return (
    <>
      <OpenModalTrigger onClick={() => setModalOpen(true)}>Change</OpenModalTrigger>
      {isModalOpen && (
        <Modal isOpen toggle={onClose} centered>
          <Header>
            <Title>Change Image</Title>
            <CloseModalButton name={Icons.Cancel} onClick={onClose} />
          </Header>
          <ModalBody>
            <DragDropHint>
              Drag and drop your image here
            </DragDropHint>
            <DropToUpload>
              .JPG, .PNG
            </DropToUpload>
            <Input onChange={handleOnChange} placeholder="Image source" />
            <ConfirmButton onClick={handleConfirm} disabled={!src}>Confirm</ConfirmButton>
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default MediaChange;