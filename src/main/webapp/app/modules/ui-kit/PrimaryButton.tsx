import styled from "styled-components";
import BaseButton from "app/modules/ui-kit/BaseButton";

const PrimaryButton = styled(BaseButton)`
  padding: 10px 20px;
  box-sizing: border-box;
  height: 40px;
  border-radius: 40px;
  background:  ${({ theme }) => (
    ` linear-gradient(
      104deg, 
      ${theme.palette.primary.main} 9%, 
      ${theme.palette.primary.second} 92%
    )`
  )};
  color: ${({ theme }) => theme.palette.neutral.white};
  box-shadow: 4px 4px 5px 0 rgba(13, 39, 80, 0.16);
  transition: all .1s ease-in;

  &:hover {
    background:  ${({ theme }) => theme.palette.neutral.white};
    color: ${({ theme }) => theme.palette.primary.main};
    box-shadow: 4px 4px 5px 0 rgba(13, 39, 80, 0.16);
  }
  
  &:disabled {
    box-shadow: none;
    background:  ${({ theme }) => theme.palette.neutral.disabledGrey};
    color: ${({ theme }) => theme.palette.neutral.white};
  }
`;

export default PrimaryButton;
