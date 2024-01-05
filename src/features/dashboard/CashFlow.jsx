import styled from "styled-components";
import { isEqual, parseISO, addDays, format, getMonth, endOfMonth, getDayOfYear } from "date-fns";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import { useInvoicesNoPage } from "./useInvoicesNoPage";
import { usePayableInvoicesNoPage } from "./usePayableInvoicesNoPage";
import { useOtherCostsNoPage } from "../otherCosts/useOtherCostsNoPage";
import { useFiscalYear } from "../settings/useFiscalYear";
import { useBankBalances } from "../bankBalances/useBankBalances";
import { MONTHS_SHORT, SENT_STATUS_ID } from "../../utils/constants";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import ButtonIcon from "../../ui/ButtonIcon";
import CashFlowGraph from "./CashFlowGraph";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
`;

const TableContainer = styled.div`
  display: flex;
  min-width: 600px;
  align-items: center;
`;
const Item = styled.div`
  //font-family: "Sono";
  min-width: 150px;
  padding: 0.8rem 0.4rem;
  text-align: center;
  font-weight: 500;
`;
const ItemThin = styled.div`
  //font-family: "Sono";
  min-width: 30px;
  padding: 0.8rem 0.4rem;
  text-align: center;
  font-weight: 500;
`;

function CashFlow() {
  const { isLoading, error, invoices } = useInvoicesNoPage();
  const {
    isLoading: isLoadingPayableInvoices,
    error: errorPayableInvoices,
    payableInvoices,
  } = usePayableInvoicesNoPage();
  const { isLoading: isLoadingOtherCosts, error: errorOtherCosts, otherCosts } = useOtherCostsNoPage();
  const { isLoading: isLoadingFY, fiscalYear: fyObj } = useFiscalYear();
  const { isLoading: isLoadingBB, bankBalances } = useBankBalances();
  const [month, setMonth] = useState(0);

  if (isLoading || isLoadingPayableInvoices || isLoadingOtherCosts || isLoadingFY || isLoadingBB) return <Spinner />;
  if (error || errorPayableInvoices || errorOtherCosts) return;

  const fiscalYear = fyObj.fiscalYear;
  const initialBalance = bankBalances[0].availableBalance;

  //let year = [];
  let year = [
    {
      date: new Date(fiscalYear, 0, 1),
      in: 0,
      out: 0,
      balance: initialBalance,
    },
  ];
  for (let i = 0; i < 366; i++) {
    year.push({
      date: addDays(new Date(fiscalYear, 0, 1), i),
      in: 0,
      out: 0,
      balance: 0,
    });
  }

  for (let i = 1; i < 365; i++) {
    invoices.forEach(function (inv) {
      if (isEqual(parseISO(inv.duePaymentDate), year[i].date) && inv.statusId === SENT_STATUS_ID) {
        year[i].in = year[i].in + inv.totalAmount;
      }
    });
  }

  for (let i = 1; i < 365; i++) {
    payableInvoices.forEach(function (inv) {
      if (isEqual(parseISO(inv.duePaymentDate), year[i].date)) {
        year[i].out = year[i].out - inv.totalAmount;
      }
    });
  }

  for (let i = 1; i < 365; i++) {
    otherCosts.forEach(function (oc) {
      if (isEqual(parseISO(oc.duePaymentDate), year[i].date)) {
        year[i].out = year[i].out - oc.totalAmount;
      }
    });
  }

  for (let i = 1; i < 365; i++) {
    year[i].balance = year[i - 1].balance + year[i].in + year[i].out;
  }

  //-----------------------------------------------------------------------------------

  const currentMonth = getMonth(new Date());

  const inM1 = year.filter((e) => getMonth(e.date) === month).reduce((acc, elm) => (acc = acc + elm.in), 0);
  const inM2 = year.filter((e) => getMonth(e.date) === month + 1).reduce((acc, elm) => (acc = acc + elm.in), 0);
  const inM3 = year.filter((e) => getMonth(e.date) === month + 2).reduce((acc, elm) => (acc = acc + elm.in), 0);

  const outM1 = year.filter((e) => getMonth(e.date) === month).reduce((acc, elm) => (acc = acc + elm.out), 0);
  const outM2 = year.filter((e) => getMonth(e.date) === month + 1).reduce((acc, elm) => (acc = acc + elm.out), 0);
  const outM3 = year.filter((e) => getMonth(e.date) === month + 2).reduce((acc, elm) => (acc = acc + elm.out), 0);

  const startDay = getDayOfYear(new Date(fiscalYear, month, 1));
  const endDay = getDayOfYear(endOfMonth(new Date(fiscalYear, month + 2, 1)));

  const graphData = year.slice();
  graphData.forEach((elm, idx) => (graphData[idx].date = format(elm.date, "dd/MM/yyyy")));

  function incMonth() {
    if (month < 9) setMonth((month) => month + 1);
  }
  function decMonth() {
    if (month > currentMonth) setMonth((month) => month - 1);
  }

  return (
    <Container>
      <TableContainer>
        <Table columns="0.5fr 2fr 2fr 2fr 0.5fr">
          <Table.Header>
            <ItemThin>
              <ButtonIcon onClick={decMonth} disabled={month === 0}>
                <FaArrowAltCircleLeft />
              </ButtonIcon>
            </ItemThin>
            <Item>{MONTHS_SHORT[month]}</Item>
            <Item>{MONTHS_SHORT[month + 1]}</Item>
            <Item>{MONTHS_SHORT[month + 2]}</Item>
            <ItemThin>
              <ButtonIcon onClick={incMonth} disabled={month === 9}>
                <FaArrowAltCircleRight />
              </ButtonIcon>
            </ItemThin>
          </Table.Header>
          <Table.Row>
            <ItemThin>IN</ItemThin>
            <Item>{formatCurrency(inM1)}</Item>
            <Item>{formatCurrency(inM2)}</Item>
            <Item>{formatCurrency(inM3)}</Item>
            <ItemThin></ItemThin>
          </Table.Row>
          <Table.Row>
            <ItemThin>OUT</ItemThin>
            <Item>{formatCurrency(outM1)}</Item>
            <Item>{formatCurrency(outM2)}</Item>
            <Item>{formatCurrency(outM3)}</Item>
            <ItemThin></ItemThin>
          </Table.Row>
        </Table>
      </TableContainer>
      <CashFlowGraph graphData={year} start={startDay} end={endDay} />
    </Container>
  );
  //-----------------------------------------------------------------------------------
  // year.forEach((elm, idx) => (year[idx].date = format(elm.date, "dd/MM/yyyy")));
  //  return <CashFlowGraph graphData={year} />;
}

export default CashFlow;
