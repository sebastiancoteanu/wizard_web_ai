import React, { ChangeEvent, FC, InputHTMLAttributes } from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Input = styled.input`
  transition: all ease-in 0.1s;
  border: 1px solid ${({ theme }) => `${theme.colors.darkestGray}8c`};
  border-radius: 2px;
  background: ${({theme}) => theme.colors.gray} none;
  color: ${({ theme }) => `${theme.colors.lightestGray}bd`};
  display: flex;
  width: 100%;
  padding: 4px 6px;
  box-sizing: border-box;
  min-height: 28.8px;
  -webkit-text-fill-color: ${({ theme }) => `${theme.colors.lightestGray}bd`};
  -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.colors.gray} inset;

  &:focus {
    outline: none;
    background: ${({theme}) => theme.colors.darkestGray};
    color: ${({ theme }) => theme.colors.lightestGray};
    -webkit-text-fill-color: ${({ theme }) => theme.colors.lightestGray};
    -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.colors.darkestGray} inset;
  }
`;

const Label = styled.label`
  margin-bottom: 2px;
  font-size: 12px;
  font-weight: bold;
`;

interface EditableProp extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  onChange: (name: string, value: InputHTMLAttributes<HTMLInputElement>['value']) => void;
}

const EditableProp: FC<EditableProp> = ({
  className,
  name,
  label,
  value = '',
  type,
  onChange,
  ...rest
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  return (
    <Wrapper className={className}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input name={name} type={type} value={value} onChange={handleChange} spellCheck={false} {...rest} />
    </Wrapper>
  )
};

function hasEqualValues(prevProps, nextProps) {
  return prevProps.value === nextProps.value;
}

const MemoizedEditableProp = React.memo(EditableProp, hasEqualValues);
export default MemoizedEditableProp;
