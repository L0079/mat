import PropTypes from "prop-types";

import Spinner from "../../ui/Spinner";
import { usePayableInvoicesGetByPoNumber } from "./usePayableInvoicesGetByPoNumber";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import PayableInvoiceRow from "./PayableInvoiceRow";

function PayableInvoicesByPoNumber({ orderNumber, poArray }) {
  const { isLoading, payableInvoicesByPoNumber } =
    usePayableInvoicesGetByPoNumber({
      orderNumber,
      poArray,
    });

  if (isLoading) return <Spinner />;

  return (
    <>
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
            data={payableInvoicesByPoNumber}
            render={(payableInvoice) => (
              <PayableInvoiceRow
                payableInvoice={payableInvoice}
                key={payableInvoice.id}
              />
            )}
          />
        </Table>
      </Menus>
    </>
  );
}

PayableInvoicesByPoNumber.propTypes = {
  orderNumber: PropTypes.string,
  poArray: PropTypes.array,
};
export default PayableInvoicesByPoNumber;
