import React, { ChangeEvent, FC, InputHTMLAttributes } from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 4px;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 12px;
  font-weight: bold;
`;

const Input = styled.input`
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.lightestGray};
  background: transparent;
  color: ${({ theme }) => theme.colors.darkestGray};
  padding: 8px 40px 8px 16px;

  ::placeholder {
    color: ${({ theme }) => theme.colors.lightestGray};
  }

  &:focus {
    outline: none;
  }
`;

const UrlPreview = styled.div`
  margin-top: 4px;
  font-size: 12px;
  text-transform: lowercase;
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
  valuePreview?: string;
  handleChange: (name: string, value: string) => void;
}

const EditableField: FC<Props> = ({
  value,
  name,
  handleChange,
  label,
  placeholder,
  valuePreview,
  onFocus,
  onBlur,
  autoFocus = false,
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(name, e.target.value);
  };

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <Input
        autoFocus={autoFocus}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        spellCheck="false"
      />
      {valuePreview && <UrlPreview>{valuePreview}</UrlPreview>}
    </Wrapper>
  );
};

export default EditableField;
