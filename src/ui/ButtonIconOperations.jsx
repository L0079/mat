import styled, { css } from "styled-components";

const ButtonIconOperations = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-brand-600);
  }

  ${(props) =>
    props.float === "right" &&
    css`
      float: right;
    `}
  ${(props) =>
    props.float === "left" &&
    css`
      float: left;
    `}
`;

export default ButtonIconOperations;
