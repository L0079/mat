import styled from "styled-components";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CheckOrder from "../features/dashboard/CheckOrder";

const StyledContainer = styled.div`
  max-width: 100%;
  margin-left: 40px;
  align-items: center;
`;

function OrderStatus() {
  return (
    <StyledContainer>
      <Row type="horizontal">
        <Heading as="h3">Order Status</Heading>
      </Row>
      <CheckOrder />
    </StyledContainer>
  );
}

export default OrderStatus;
