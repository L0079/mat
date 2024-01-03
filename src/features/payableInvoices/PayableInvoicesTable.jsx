//import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import { usePayableInvoices } from "./usePayableInvoices";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import PayableInvoiceRow from "./PayableInvoiceRow";
import Pagination from "../../ui/Pagination";

function PayableInvoicesTable() {
  const { isLoading, error, payableInvoices, count } = usePayableInvoices();

  if (isLoading) return <Spinner />;
  if (error) return;

  if (!payableInvoices.length > 0)
    return <Empty resource={"payable invoices"} />;

  return (
    <Menus>
      <Table
        role="table"
        columns="0.5fr 0.8fr 0.6fr 1.5fr 0.8fr 0.8fr 0.6fr 0.6fr 0.3fr"
      >
        <Table.Header>
          <div></div>
          <div>Invoice #</div>
          <div>Invoice Date</div>
          <div>Customer</div>
          <div>Amount</div>
          <div>Taxes</div>
          <div>Total Amount</div>
          <div>Payment Due On</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={payableInvoices}
          render={(payableInvoice) => (
            <PayableInvoiceRow
              payableInvoice={payableInvoice}
              key={payableInvoice.id}
            />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default PayableInvoicesTable;
