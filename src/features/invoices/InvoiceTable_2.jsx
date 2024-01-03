import PropTypes from "prop-types";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import InvoiceRow2 from "./InvoiceRow_2";

function InvoiceTable2({ invoices }) {
  return (
    <Menus>
      <Table
        role="table"
        columns="0.3fr 0.9fr 1fr 1fr 1.5fr 1fr 1fr 0.7fr 0.3fr"
      >
        <Table.Header>
          <div></div>
          <div>Invoice #</div>
          <div>Invoice Date</div>
          <div>Due Payment Date</div>
          <div>Customer</div>
          <div>Amount</div>
          <div>Total Amount</div>
          <div>Delay on Payment</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={invoices}
          render={(invoice) => (
            <InvoiceRow2 invoice={invoice} key={invoice.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

InvoiceTable2.propTypes = { invoices: PropTypes.array };
export default InvoiceTable2;
