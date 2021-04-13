import styled from "styled-components";
import BaseButton from "app/modules/ui-kit/BaseButton";

const SecondaryButton = styled(BaseButton)`
  padding: 10px 20px;
  box-sizing: border-box;
  height: 40px;
  border-radius: 40px;
  background:  ${({ theme }) => theme.palette.neutral.white};
  color: ${({ theme }): string => theme.palette.primary.main};
  box-shadow: 4px 4px 5px 0 rgba(13, 39, 80, 0.16);

  &:hover {
    color: ${({ theme }): string => theme.palette.primary.main};
  }

  &:disabled {
    box-shadow: none;
    background:  ${({ theme }) => theme.palette.neutral.disabledGrey};
    color: ${({ theme }) => theme.palette.neutral.white};
  }
`;

export default SecondaryButton;
