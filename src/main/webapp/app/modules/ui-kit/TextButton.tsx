import styled from "styled-components";
import BaseButton from "app/modules/ui-kit/BaseButton";

const TextButton = styled(BaseButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  top: 0;
  background: transparent;
  padding: 0;
  font-weight: normal;
`;

export default TextButton;
