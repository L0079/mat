import styled from "styled-components";
import { isAfter, isBefore, parseISO } from "date-fns";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { formatCurrency } from "../../utils/helpers";
import { useInvoicesNoPage } from "./useInvoicesNoPage";
import { useOrdersGetToBeBilled } from "./useOrdersGetToBeBilled";
import { usePayableInvoicesNoPage } from "./usePayableInvoicesNoPage";
import { usePurchaseOrdersGetToBePaid } from "./usePurchaseOrdersGetToBePaid";

const StyledTable = styled.table`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  width: 100%;
`;

const StyledHeader = styled.tr`
  padding: 0.8rem 2.2rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  text-align: center;
`;

const StyledRow = styled.tr`
  padding: 0.8rem 2.2rem;
`;

const StyledTD = styled.td`
  padding: 0.8rem 0.1rem;
  font-weight: 200;
  font-size: 1.2rem;
  text-align: center;
`;

const StyledTDtotal = styled.td`
  padding: 0.8rem 0.1rem;
  font-weight: 600;
  text-align: center;
  color: var(--color-red-800);
`;

const StyledTH = styled.th`
  padding: 0.8rem 0.4rem;
  text-align: center;
`;

const StyledCaption = styled.caption`
  caption-side: left;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 0.2fr 1fr;
  column-gap: 2.4rem;
  align-items: left;
  transition: none;
`;

function QuartesTable() {
  //----------
  const fiscalYear = 2024;
  //----------
  function reduceMonth(inv, fy, month) {
    const monthTotal = inv.reduce(function (acc, inv) {
      let amt = 0;
      const fy1 = month === 1 ? fy - 1 : fy;
      const month1 = fy1 === fy - 1 ? 12 : month;
      const day1 = fy1 === fy - 1 ? 31 : 1;
      const fy2 = month === 12 ? fy + 1 : fy;
      const month2 = month === 12 ? 1 : month + 1;

      if (
        isAfter(
          parseISO(inv.invoiceDate),
          new Date(Number(fy1), Number(month1) - 1, Number(day1))
        ) &&
        isBefore(
          parseISO(inv.invoiceDate),
          new Date(Number(fy2), Number(month2) - 1, 1)
        )
      ) {
        amt = inv.amount;
      }
      return acc + amt;
    }, 0);
    return monthTotal;
  }

  const { isLoading, error, invoices } = useInvoicesNoPage();
  const { isLoading: isLoadingOrders, ordersToBeBilled } =
    useOrdersGetToBeBilled();
  const {
    isLoading: isLoadingPI,
    error: errorPI,
    payableInvoices,
  } = usePayableInvoicesNoPage();
  const { isLoading: isLoadingPurchaseOrders, ordersToBePaid } =
    usePurchaseOrdersGetToBePaid();

  if (isLoading || isLoadingOrders || isLoadingPI || isLoadingPurchaseOrders)
    return <Spinner />;
  if (error || errorPI) return;

  if (!invoices.length > 0) return <Empty resource={"invoices"} />;

  const toBeBilled = ordersToBeBilled?.reduce(function (acc, ord) {
    return acc + ord.toBeBilled;
  }, 0);
  const toBePaid = ordersToBePaid?.reduce(function (acc, ord) {
    return acc + ord.toBePaid;
  }, 0);

  const january = reduceMonth(invoices, fiscalYear, 1);
  const february = reduceMonth(invoices, fiscalYear, 2);
  const march = reduceMonth(invoices, fiscalYear, 3);
  const april = reduceMonth(invoices, fiscalYear, 4);
  const may = reduceMonth(invoices, fiscalYear, 5);
  const june = reduceMonth(invoices, fiscalYear, 6);
  const july = reduceMonth(invoices, fiscalYear, 7);
  const august = reduceMonth(invoices, fiscalYear, 8);
  const september = reduceMonth(invoices, fiscalYear, 9);
  const october = reduceMonth(invoices, fiscalYear, 10);
  const november = reduceMonth(invoices, fiscalYear, 11);
  const december = reduceMonth(invoices, fiscalYear, 12);
  const q1 = january + february + march;
  const q2 = april + may + june;
  const q3 = july + august + september;
  const q4 = october + november + december;

  const januaryPI = reduceMonth(payableInvoices, fiscalYear, 1);
  const februaryPI = reduceMonth(payableInvoices, fiscalYear, 2);
  const marchPI = reduceMonth(payableInvoices, fiscalYear, 3);
  const aprilPI = reduceMonth(payableInvoices, fiscalYear, 4);
  const mayPI = reduceMonth(payableInvoices, fiscalYear, 5);
  const junePI = reduceMonth(payableInvoices, fiscalYear, 6);
  const julyPI = reduceMonth(payableInvoices, fiscalYear, 7);
  const augustPI = reduceMonth(payableInvoices, fiscalYear, 8);
  const septemberPI = reduceMonth(payableInvoices, fiscalYear, 9);
  const octoberPI = reduceMonth(payableInvoices, fiscalYear, 10);
  const novemberPI = reduceMonth(payableInvoices, fiscalYear, 11);
  const decemberPI = reduceMonth(payableInvoices, fiscalYear, 12);
  const q1PI = januaryPI + februaryPI + marchPI;
  const q2PI = aprilPI + mayPI + junePI;
  const q3PI = julyPI + augustPI + septemberPI;
  const q4PI = octoberPI + novemberPI + decemberPI;

  return (
    <>
      <Heading as="h2">Fiscal Year {fiscalYear}</Heading>
      {/* ----------------------------------------------------------------- */}
      <StyledTable>
        <StyledCaption>Turnover on order received</StyledCaption>
        <thead>
          <StyledHeader>
            <StyledTH>JAN</StyledTH>
            <StyledTH>FEB</StyledTH>
            <StyledTH>MAR</StyledTH>
            <StyledTH>Q1</StyledTH>
            <StyledTH>APR</StyledTH>
            <StyledTH>MAY</StyledTH>
            <StyledTH>JUN</StyledTH>
            <StyledTH>Q2</StyledTH>
            <StyledTH>JUL</StyledTH>
            <StyledTH>AUG</StyledTH>
            <StyledTH>SEP</StyledTH>
            <StyledTH>Q3</StyledTH>
            <StyledTH>OCT</StyledTH>
            <StyledTH>NOV</StyledTH>
            <StyledTH>DEC</StyledTH>
            <StyledTH>Q4</StyledTH>
            <StyledTH>Turnover</StyledTH>
          </StyledHeader>
        </thead>
        <tbody>
          <StyledRow>
            <StyledTD>{formatCurrency(january)}</StyledTD>
            <StyledTD>{formatCurrency(february)}</StyledTD>
            <StyledTD>{formatCurrency(march)}</StyledTD>
            <StyledTDtotal>{formatCurrency(q1)}</StyledTDtotal>
            <StyledTD>{formatCurrency(april)}</StyledTD>
            <StyledTD>{formatCurrency(may)}</StyledTD>
            <StyledTD>{formatCurrency(june)}</StyledTD>
            <StyledTDtotal>{formatCurrency(q2)}</StyledTDtotal>
            <StyledTD>{formatCurrency(july)}</StyledTD>
            <StyledTD>{formatCurrency(august)}</StyledTD>
            <StyledTD>{formatCurrency(september)}</StyledTD>
            <StyledTDtotal>{formatCurrency(q3)}</StyledTDtotal>
            <StyledTD>{formatCurrency(october)}</StyledTD>
            <StyledTD>{formatCurrency(november)}</StyledTD>
            <StyledTD>{formatCurrency(december)}</StyledTD>
            <StyledTDtotal>{formatCurrency(q4)}</StyledTDtotal>
            <StyledTD>{formatCurrency(q1 + q2 + q3 + q4)}</StyledTD>
          </StyledRow>
        </tbody>
      </StyledTable>

      {/* ----------------------------------------------------------------- */}
      <StyledTable>
        <StyledCaption>Costs due to purchase orders</StyledCaption>
        <thead>
          <StyledHeader>
            <StyledTH>JAN</StyledTH>
            <StyledTH>FEB</StyledTH>
            <StyledTH>MAR</StyledTH>
            <StyledTH>Q1</StyledTH>
            <StyledTH>APR</StyledTH>
            <StyledTH>MAY</StyledTH>
            <StyledTH>JUN</StyledTH>
            <StyledTH>Q2</StyledTH>
            <StyledTH>JUL</StyledTH>
            <StyledTH>AUG</StyledTH>
            <StyledTH>SEP</StyledTH>
            <StyledTH>Q3</StyledTH>
            <StyledTH>OCT</StyledTH>
            <StyledTH>NOV</StyledTH>
            <StyledTH>DEC</StyledTH>
            <StyledTH>Q4</StyledTH>
            <StyledTH>Total Costs</StyledTH>
          </StyledHeader>
        </thead>
        <tbody>
          <StyledRow>
            <StyledTD>{formatCurrency(januaryPI)}</StyledTD>
            <StyledTD>{formatCurrency(februaryPI)}</StyledTD>
            <StyledTD>{formatCurrency(marchPI)}</StyledTD>
            <StyledTDtotal>{formatCurrency(q1PI)}</StyledTDtotal>
            <StyledTD>{formatCurrency(aprilPI)}</StyledTD>
            <StyledTD>{formatCurrency(mayPI)}</StyledTD>
            <StyledTD>{formatCurrency(junePI)}</StyledTD>
            <StyledTDtotal>{formatCurrency(q2PI)}</StyledTDtotal>
            <StyledTD>{formatCurrency(julyPI)}</StyledTD>
            <StyledTD>{formatCurrency(augustPI)}</StyledTD>
            <StyledTD>{formatCurrency(septemberPI)}</StyledTD>
            <StyledTDtotal>{formatCurrency(q3PI)}</StyledTDtotal>
            <StyledTD>{formatCurrency(octoberPI)}</StyledTD>
            <StyledTD>{formatCurrency(novemberPI)}</StyledTD>
            <StyledTD>{formatCurrency(decemberPI)}</StyledTD>
            <StyledTDtotal>{formatCurrency(q4PI)}</StyledTDtotal>
            <StyledTD>{formatCurrency(q1PI + q2PI + q3PI + q4PI)}</StyledTD>
          </StyledRow>
        </tbody>
      </StyledTable>
      <div>
        <Row>
          <span>Invoices not yet scheduled for:</span>
          <span>{formatCurrency(toBeBilled)}</span>
        </Row>
        <Row>
          <span>Payable invoices not yet scheduled for:</span>
          <span>{formatCurrency(toBePaid)}</span>
        </Row>
      </div>
    </>
  );
}

export default QuartesTable;
