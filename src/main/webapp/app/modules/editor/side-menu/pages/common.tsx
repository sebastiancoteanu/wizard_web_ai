import styled from "styled-components";
import EditableProp from "app/modules/editor/style-manager/EditableProp";

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