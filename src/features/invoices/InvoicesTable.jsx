//import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import { useInvoices } from "./useInvoices";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import InvoiceRow from "./InvoiceRow";
import Pagination from "../../ui/Pagination";

function InvoicesTable() {
  const { isLoading, error, invoices, count } = useInvoices();

  if (isLoading) return <Spinner />;
  if (error) return;

  if (!invoices.length > 0) return <Empty resource={"invoices"} />;

  return (
    <Menus>
      <Table role="table">
        <Table.Header>
          <div></div>
          <div>Invoice #</div>
          <div>Invoice Date</div>
          <div>Customer</div>
          <div>Amount</div>
          <div>Total Amount</div>
          <div>Payment</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={invoices}
          render={(invoice) => (
            <InvoiceRow invoice={invoice} key={invoice.id} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default InvoicesTable;
