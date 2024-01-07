import PropTypes from "prop-types";
import styled from "styled-components";

import { useOrdersGetByOrderNumber } from "./useOrdersGetByOrderNumber";
import { useInvoicesGetByOrderNumber } from "./useInvoicesGetByOrderNumber";
import { usePurchaseOrdersGetByOrderNumber } from "./usePurchaseOrderGetByOrderNumber";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import InvoiceTable2 from "../invoices/InvoiceTable_2";
import PoRow from "../purchaseOrder/PoRow";
import { formatCurrency } from "../../utils/helpers";
import Heading from "../../ui/Heading";
import LineSeparator from "../../ui/LineSeparator";
import { useState } from "react";
import PayableInvoicesByPoNumber from "../payableInvoices/PayableInvoicesByPoNumber";

const StyledContainer = styled.div`
  max-width: 100%;
  margin-top: 15px;
  display: grid;
  flex-direction: row;
  grid-template-columns: 24fr 5fr;
  column-gap: 15px;
  align-items: center;
`;
const Item = styled.div`
  //font-family: "Sono";
  text-align: center;
  font-weight: 500;
`;
const ClickableDiv = styled.div`
  //font-family: "Sono";
  margin-left: 8%;
  margin-right: 8%;
  background-color: var(--color-indigo-100);
  max-width: 18rem;
  min-width: 18rem;
  padding: 0.5rem;
  text-align: center;
  border-radius: 5px;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

function OrdersByOrderNumber({ orderNumber }) {
  const { isLoading, ordersByOrderNumber } = useOrdersGetByOrderNumber({
    orderNumber,
  });
  const { isLoading: isLoadingInvoices, invoicesByOrderNumber } = useInvoicesGetByOrderNumber({ orderNumber });
  const { isLoading: isLoadingPOs, purchaseOrdersByOrderNumber } = usePurchaseOrdersGetByOrderNumber({
    orderNumber,
  });
  const [showInvoices, setShowInvoices] = useState(false);
  const [showPayableInvoices, setShowPayableInvoices] = useState(false);
  function toggleShowInvoices() {
    setShowInvoices((showInvoices) => !showInvoices);
  }
  function toggleShowPayableInvoices() {
    setShowPayableInvoices((showPayableInvoices) => !showPayableInvoices);
  }

  if (isLoading || isLoadingInvoices || isLoadingPOs) return <Spinner />;

  if (Object.keys(ordersByOrderNumber).length === 0) return <div>No records found</div>;

  const {
    orderNumber: orderNum,
    orderDate,
    amount,
    toBeBilled,
    opportunity,
    customers: { customer },
  } = ordersByOrderNumber[0];
  let poArray = purchaseOrdersByOrderNumber.map(({ poNumber }) => poNumber);

  return (
    <>
      <Heading as="h3" type="tableHeader">
        Order
      </Heading>
      <StyledContainer>
        <Table columns="0.9fr 1.4fr 0.9fr 0.9fr 0.9fr 0.9fr 0.2fr">
          <Table.Header>
            <div>Order #</div>
            <div>Customer</div>
            <div>Order Date</div>
            <div>Opportunity</div>
            <div>Amount</div>
            <div>To be billed</div>
            <div></div>
          </Table.Header>
          <Table.Row>
            <Item>{orderNum}</Item>
            <Item>{customer}</Item>
            <Item>{orderDate}</Item>
            <Item>{opportunity}</Item>
            <Item>{formatCurrency(amount)}</Item>
            <Item>{formatCurrency(toBeBilled)}</Item>
          </Table.Row>
        </Table>
        <ClickableDiv onClick={toggleShowInvoices}>Show Invoices</ClickableDiv>
      </StyledContainer>
      {showInvoices && (
        <>
          <Heading as="h3" type="tableHeader">
            Invoices
          </Heading>
          <StyledContainer>
            <InvoiceTable2 invoices={invoicesByOrderNumber} />
          </StyledContainer>
        </>
      )}
      <LineSeparator />
      <Heading as="h3" type="tableHeader">
        Purchase Orders
      </Heading>
      <StyledContainer>
        <Menus>
          <Table columns="0.5fr 0.5fr 1.2fr 0.6fr 0.6fr 0.6fr 0.6fr 0.2fr">
            <Table.Header>
              <div>PO #</div>
              <div>PO Date</div>
              <div>Supplier</div>
              <div>Amount</div>
              <div>Order Number</div>
              <div>Opportunity</div>
              <div>To Be Paid</div>
              <div></div>
            </Table.Header>
            <Table.Body
              data={purchaseOrdersByOrderNumber}
              render={(purchaseOrder) => <PoRow purchaseOrder={purchaseOrder} key={purchaseOrder.id} />}
            />
          </Table>
        </Menus>
        <ClickableDiv onClick={toggleShowPayableInvoices}>Show Payable Invoices</ClickableDiv>
      </StyledContainer>
      {showPayableInvoices && (
        <>
          <Heading as="h3" type="tableHeader">
            Payable Invoices
          </Heading>
          <StyledContainer>
            <PayableInvoicesByPoNumber orderNumber={orderNumber} poArray={poArray} />
          </StyledContainer>
        </>
      )}
    </>
  );
}

OrdersByOrderNumber.propTypes = { orderNumber: PropTypes.string };
export default OrdersByOrderNumber;
