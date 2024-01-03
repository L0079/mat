import styled from "styled-components";

import InvoicesAging from "../features/dashboard/InvoicesAging";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const StyledContainer = styled.div`
  max-width: 100%;
  margin-left: 40px;
  align-items: center;
`;

function InvoicesStatus() {
  return (
    <StyledContainer>
      <Row type="horizontal">
        <Heading as="h3">Invoices Aging</Heading>
      </Row>
      <InvoicesAging />
    </StyledContainer>
  );
}

export default InvoicesStatus;
