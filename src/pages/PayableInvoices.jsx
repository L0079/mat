import Heading from "../ui/Heading";
import Row from "../ui/Row";
import PayableInvoicesTable from "../features/payableInvoices/PayableInvoicesTable";
import PayableInvoiceOperations from "../features/PayableInvoices/PayableInvoiceOperations";

function Invoices() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Payable Invoices</Heading>
        <PayableInvoiceOperations />
      </Row>
      <PayableInvoicesTable />
    </>
  );
}

export default Invoices;
