import styled from "styled-components";

const StyledHr = styled.hr`
  margin-top: 15px;
  margin-bottom: 15px;
  border-color: var(--color-grey-300);
`;

function LineSeparator() {
  return <StyledHr />;
}

export default LineSeparator;
