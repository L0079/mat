import styled, { css } from "styled-components";

export const Row = styled.div`
  display: flex;
  margin: 2rem 4rem;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `};
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `};
`;

Row.defaultProps = { type: "vertical" };

export default Row;
