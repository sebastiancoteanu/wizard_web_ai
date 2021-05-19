import styled from "styled-components";
import BaseButton from "app/modules/ui-kit/BaseButton";

const BorderButton = styled(BaseButton)`
  padding: 10px 20px;
  box-sizing: border-box;
  height: 40px;
  border-radius: 40px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.main};
  background: transparent;
  
  &:hover:not(:disabled), &:focus:not(:disabled) {
    color: ${({ theme }) => theme.palette.neutral.white};
    background: ${({ theme }) => theme.palette.primary.main};
  }
`;

export default BorderButton;
