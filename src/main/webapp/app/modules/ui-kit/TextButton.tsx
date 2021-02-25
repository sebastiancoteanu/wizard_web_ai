import styled from "styled-components";

const TextButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  position: relative;
  top: 0;
  border: none;
  outline: none;
  cursor: pointer;
  background: transparent;
  padding: 0;
  font-weight: normal;

  &:link, &:active, &:hover, &:visited {
    text-decoration: none;
    color: inherit;
  }
`;

export default TextButton;
