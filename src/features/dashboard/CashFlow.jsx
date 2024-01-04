import { isEqual, parseISO, addDays, format } from "date-fns";

import { useInvoicesNoPage } from "./useInvoicesNoPage";
import { usePayableInvoicesNoPage } from "./usePayableInvoicesNoPage";
import { useOtherCosts } from "../otherCosts/useOtherCosts";
import { useFiscalYear } from "../settings/useFiscalYear";
import { useBankBalances } from "../bankBalances/useBankBalances";
import Spinner from "../../ui/Spinner";
import CashFlowGraph from "./CashFlowGraph";

function CashFlow() {
  const { isLoading, error, invoices } = useInvoicesNoPage();
  const {
    isLoading: isLoadingPayableInvoices,
    error: errorPayableInvoices,
    payableInvoices,
  } = usePayableInvoicesNoPage();
  const {
    isLoading: isLoadingOtherCosts,
    error: errorOtherCosts,
    otherCosts,
  } = useOtherCosts();
  const { isLoading: isLoadingFY, fiscalYear: fyObj } = useFiscalYear();
  const { isLoading: isLoadingBB, bankBalances } = useBankBalances();

  if (
    isLoading ||
    isLoadingPayableInvoices ||
    isLoadingOtherCosts ||
    isLoadingFY ||
    isLoadingBB
  )
    return <Spinner />;
  if (error || errorPayableInvoices || errorOtherCosts) return;

  const fiscalYear = fyObj.fiscalYear;
  const initialBalance = bankBalances[0].availableBalance;
  console.log("BB", initialBalance);

  let year = [
    {
      date: new Date(fiscalYear, 0, 1),
      in: 0,
      out: 0,
      balance: initialBalance,
    },
  ];
  for (let i = 1; i < 365; i++) {
    year.push({
      date: addDays(new Date(fiscalYear, 0, 1), i),
      in: 0,
      out: 0,
      balance: 0,
    });
  }

  for (let i = 1; i < 365; i++) {
    invoices.forEach(function (inv) {
      if (isEqual(parseISO(inv.duePaymentDate), year[i].date)) {
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

  year.forEach((elm, idx) => (year[idx].date = format(elm.date, "dd/MM/yyyy")));
  return <CashFlowGraph graphData={year} />;
}

export default CashFlow;
