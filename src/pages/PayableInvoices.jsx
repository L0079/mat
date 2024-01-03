import Heading from "../ui/Heading";
import Row from "../ui/Row";
import PayableInvoicesTable from "../features/payableInvoices/PayableInvoicesTable";
import PayableInvoiceOperations from "../features/payableInvoices/PayableInvoiceOperations";

function PayableInvoices() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h3">Payable Invoices</Heading>
        <PayableInvoiceOperations />
      </Row>
      <PayableInvoicesTable />
    </>
  );
}

export default PayableInvoices;
