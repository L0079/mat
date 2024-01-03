import styled from "styled-components";
import { isAfter, isBefore, parseISO, add } from "date-fns";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import InvoiceTable2 from "../invoices/InvoiceTable_2";
import { useInvoicesNoPage } from "./useInvoicesNoPage";
import { SENT_STATUS_ID } from "../../utils/constants";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import LineSeparator from "../../ui/LineSeparator";

const StyledContainer = styled.div`
  max-width: 65%;
  /* margin-left: 40px; */
  align-items: center;
`;
const StyledContainerWide = styled.div`
  max-width: 80%;
  align-items: center;
`;
const Item = styled.div`
  //font-family: "Sono";
  text-align: center;
  font-weight: 500;
`;
const ItemLeft = styled.div`
  //font-family: "Sono"
  margin-left: 10px;
  text-align: left;
  font-weight: 500;
`;
const ClickableDiv = styled.div`
  //font-family: "Sono";
  margin-left: 8%;
  margin-right: 8%;
  background-color: var(--color-indigo-100);
  max-width: 16rem;
  padding: 0.5rem;
  text-align: center;
  border-radius: 5px;
`;

function InvoicesAging() {
  const [showTable, setShowTable] = useState(0);

  const { isLoading, error, invoices } = useInvoicesNoPage();
  if (isLoading) return <Spinner />;
  if (error) return;

  if (!invoices.length > 0) return <Empty resource={"invoices"} />;
  const toBePaidInvoices = invoices.filter(function (inv) {
    return inv.statusId === SENT_STATUS_ID;
  });
  const toBePaidInvoices_amount = toBePaidInvoices.reduce(function (acc, inv) {
    return acc + inv.amount;
  }, 0);
  const toBePaidInvoices_totalAmount = toBePaidInvoices.reduce(function (
    acc,
    inv
  ) {
    return acc + inv.totalAmount;
  },
  0);

  const pastDueInvoices_1W = toBePaidInvoices.filter(function (inv) {
    if (
      inv.duePaymentDate &&
      isAfter(new Date(), parseISO(inv.duePaymentDate)) &&
      isBefore(new Date(), add(parseISO(inv.duePaymentDate), { days: 7 }))
    )
      return true;
    else return false;
  });
  const pastDueInvoices_1W_amount = pastDueInvoices_1W.reduce(function (
    acc,
    inv
  ) {
    return acc + inv.amount;
  },
  0);
  const pastDueInvoices_1W_totalAmount = pastDueInvoices_1W.reduce(function (
    acc,
    inv
  ) {
    return acc + inv.totalAmount;
  },
  0);

  const pastDueInvoices_1M = toBePaidInvoices.filter(function (inv) {
    if (
      inv.duePaymentDate &&
      isAfter(new Date(), add(parseISO(inv.duePaymentDate), { days: 6 })) &&
      isBefore(new Date(), add(parseISO(inv.duePaymentDate), { months: 1 }))
    )
      return true;
    else return false;
  });
  const pastDueInvoices_1M_amount = pastDueInvoices_1M.reduce(function (
    acc,
    inv
  ) {
    return acc + inv.amount;
  },
  0);
  const pastDueInvoices_1M_totalAmount = pastDueInvoices_1M.reduce(function (
    acc,
    inv
  ) {
    return acc + inv.totalAmount;
  },
  0);

  const pastDueInvoices_2M = toBePaidInvoices.filter(function (inv) {
    if (
      inv.duePaymentDate &&
      isAfter(new Date(), add(parseISO(inv.duePaymentDate), { months: 1 })) &&
      isBefore(new Date(), add(parseISO(inv.duePaymentDate), { months: 2 }))
    )
      return true;
    else return false;
  });
  const pastDueInvoices_2M_amount = pastDueInvoices_2M.reduce(function (
    acc,
    inv
  ) {
    return acc + inv.amount;
  },
  0);
  const pastDueInvoices_2M_totalAmount = pastDueInvoices_2M.reduce(function (
    acc,
    inv
  ) {
    return acc + inv.totalAmount;
  },
  0);

  const pastDueInvoices_critical = toBePaidInvoices.filter(function (inv) {
    if (
      inv.duePaymentDate &&
      isAfter(new Date(), add(parseISO(inv.duePaymentDate), { months: 2 }))
    )
      return true;
    else return false;
  });
  const pastDueInvoices_critical_amount = pastDueInvoices_critical.reduce(
    function (acc, inv) {
      return acc + inv.amount;
    },
    0
  );
  const pastDueInvoices_critical_totalAmount = pastDueInvoices_critical.reduce(
    function (acc, inv) {
      return acc + inv.totalAmount;
    },
    0
  );

  function toggleShowTable(id) {
    if (id === showTable) setShowTable(0);
    else setShowTable(id);
  }

  return (
    <>
      <StyledContainer>
        <Table columns="1.3fr 0.9fr 0.9fr 0.9fr 0.4fr">
          <Table.Header>
            <ItemLeft>Invoices aging</ItemLeft>
            <div># Invoices</div>
            <div>Amount</div>
            <div>Total Amount</div>
            <div></div>
          </Table.Header>
          <Table.Row>
            <ItemLeft>TO BE PAID INVOICES</ItemLeft>
            <Item>{toBePaidInvoices.length}</Item>
            <Item>{formatCurrency(toBePaidInvoices_amount)}</Item>
            <Item>{formatCurrency(toBePaidInvoices_totalAmount)}</Item>
            {toBePaidInvoices.length > 0 && (
              <ClickableDiv onClick={() => toggleShowTable(1)}>
                Details
              </ClickableDiv>
            )}
          </Table.Row>
          <Table.Row>
            <ItemLeft>PAST DUE within 1W</ItemLeft>
            <Item>{pastDueInvoices_1W.length}</Item>
            <Item>{formatCurrency(pastDueInvoices_1W_amount)}</Item>
            <Item>{formatCurrency(pastDueInvoices_1W_totalAmount)}</Item>
            {pastDueInvoices_1W.length > 0 && (
              <ClickableDiv onClick={() => toggleShowTable(2)}>
                Details
              </ClickableDiv>
            )}
          </Table.Row>
          <Table.Row>
            <ItemLeft>PAST DUE between 1W and 1M</ItemLeft>
            <Item>{pastDueInvoices_1M.length}</Item>
            <Item>{formatCurrency(pastDueInvoices_1M_amount)}</Item>
            <Item>{formatCurrency(pastDueInvoices_1M_totalAmount)}</Item>
            {pastDueInvoices_1M.length > 0 && (
              <ClickableDiv onClick={() => toggleShowTable(3)}>
                Details
              </ClickableDiv>
            )}
          </Table.Row>
          <Table.Row>
            <ItemLeft>PAST DUE between 1M and 2M</ItemLeft>
            <Item>{pastDueInvoices_2M.length}</Item>
            <Item>{formatCurrency(pastDueInvoices_2M_amount)}</Item>
            <Item>{formatCurrency(pastDueInvoices_2M_totalAmount)}</Item>
            {pastDueInvoices_2M.length > 0 && (
              <ClickableDiv onClick={() => toggleShowTable(4)}>
                Details
              </ClickableDiv>
            )}
          </Table.Row>
          <Table.Row>
            <ItemLeft>PAST DUE over 2M</ItemLeft>
            <Item>{pastDueInvoices_critical.length}</Item>
            <Item>{formatCurrency(pastDueInvoices_critical_amount)}</Item>
            <Item>{formatCurrency(pastDueInvoices_critical_totalAmount)}</Item>
            {pastDueInvoices_critical.length > 0 && (
              <ClickableDiv onClick={() => toggleShowTable(5)}>
                Details
              </ClickableDiv>
            )}
          </Table.Row>
        </Table>
      </StyledContainer>

      <StyledContainerWide>
        {showTable === 1 && (
          <>
            <LineSeparator />
            <InvoiceTable2 invoices={toBePaidInvoices} />
          </>
        )}
        {showTable === 2 && (
          <>
            <LineSeparator />
            <InvoiceTable2 invoices={pastDueInvoices_1W} />
          </>
        )}
        {showTable === 3 && (
          <>
            <LineSeparator />
            <InvoiceTable2 invoices={pastDueInvoices_1M} />
          </>
        )}
        {showTable === 4 && (
          <>
            <LineSeparator />
            <InvoiceTable2 invoices={pastDueInvoices_2M} />
          </>
        )}
        {showTable === 5 && (
          <>
            <LineSeparator />
            <InvoiceTable2 invoices={pastDueInvoices_critical} />
          </>
        )}
      </StyledContainerWide>
    </>
  );
}

export default InvoicesAging;
