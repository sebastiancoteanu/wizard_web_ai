import styled from "styled-components";
import EditableProp from "app/modules/editor/style-manager/EditableProp";
import IconButton from "app/modules/ui-kit/IconButton";

export const StyledEditablePage = styled(EditableProp)`
  input {
    min-height: 46px;
    padding: 6px 8px;
    -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.colors.darkestGray} inset;
    
    &:focus {
      -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.colors.lighter} inset;
    }
  }
`;

export const ActionButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.lightestGray};
  font-size: 12px;
  
  &:not(:last-child) {
    margin-right: 6px;
  }
`;
