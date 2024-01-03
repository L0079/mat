import Heading from "../ui/Heading";
import Row from "../ui/Row";
import InvoicesTable from "../features/invoices/InvoicesTable";
import InvoiceOperations from "../features/invoices/InvoiceOperations";

function Invoices() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h3">Invoices</Heading>
        <InvoiceOperations />
      </Row>
      <InvoicesTable />
    </>
  );
}

export default Invoices;
