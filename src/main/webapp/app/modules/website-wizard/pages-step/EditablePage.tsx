import React, { FC, useState } from 'react';
import styled from "styled-components";
import EditableField from "app/modules/website-wizard/common/EditableField";
import { Icons } from "app/modules/assets/fonts/icons";
import Icon from "app/modules/ui-kit/Icon";
import BorderButton from "app/modules/ui-kit/BorderButton";
import { IconSize } from "app/modules/ui-kit/types";

const Wrapper = styled.div`
  display: flex;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const FieldWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

const CreatePageButton = styled(BorderButton)`
  white-space: nowrap;
  text-transform: uppercase;
  margin-left: 8px;
`;

const CreatePageButtonIcon = styled(Icon)`
  margin-right: 10px;
  margin-left: -6px;
`;

const ReadonlyPage = styled.div`
  min-height: 42px;
  display: flex;
  align-items: center;
  width: 100%;
  transition: all 0.1s ease-in;
  padding-left: 17px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.ivory};
  }
`;

interface Props {
  value: string;
  name: string;
  isEditOnly?: boolean;
  label?: string,
  placeholder?: string,
  handleChange: (value: string) => void;
  onSave?: (value: string) => void;
}

const EditablePage: FC<Props> = ({
  value,
  name,
  isEditOnly,
  label,
  placeholder,
  handleChange,
  onSave,
}) => {
  const [isEditing, setEditing] = useState(isEditOnly);

  const handleOnBlur = () => {
    if (!isEditOnly) {
      setEditing(false);
    }
  }

  return (
    <Wrapper onClick={() => setEditing(true)}>
      {isEditing ? (
        <FieldWrapper>
          <EditableField
            autoFocus
            name={name}
            value={value}
            handleChange={(_, newValue) => handleChange(newValue)}
            label={label}
            placeholder={placeholder}
            onBlur={handleOnBlur}
          />
          {isEditOnly && (
            <CreatePageButton onClick={() => onSave(value)}>
              <CreatePageButtonIcon name={Icons.Plus} size={IconSize.SMALL} />
              Add
            </CreatePageButton>
          )}
        </FieldWrapper>
      ) : (
        <ReadonlyPage>{value}</ReadonlyPage>
      )}
    </Wrapper>
  );
};

export default EditablePage;
