import styled, { css } from "styled-components";

export const HeaderRow = styled.div`
  max-width: 100%;
  margin: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleAndOperation = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.labelSize} 5rem;
  flex-direction: row;
  align-items: center;
`;

TitleAndOperation.defaultProps = { labelSize: "10rem" };
