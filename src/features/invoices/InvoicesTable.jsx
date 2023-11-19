//import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import { useInvoices } from "./useInvoices";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import InvoiceRow from "./InvoiceRow";

function InvoicesTable() {
  const { isLoading, error, invoices } = useInvoices();

  if (isLoading) return <Spinner />;
  if (error) return;

  if (!invoices.length > 0) return <Empty resource={"invoices"} />;

  // const filterValue = searchParams.get("discount") || "all";
  // const sortValue = searchParams.get("sortBy") || "name-asc";

  // let filteredCabins = cabins;
  // if (filterValue === "no-discount")
  //   filteredCabins = cabins.filter((c) => c.discount === 0);
  // if (filterValue === "with-discount")
  //   filteredCabins = cabins.filter((c) => c.discount > 0);

  // console.log(sortValue);

  // let sortedCabins = filteredCabins;
  // const [field, direction] = sortValue.split("-");
  // const modifier = direction === "asc" ? 1 : -1;
  // sortedCabins = filteredCabins.sort(
  //   (a, b) => (a[field] - b[field]) * modifier
  // );

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
      </Table>
    </Menus>
  );
}

export default InvoicesTable;
