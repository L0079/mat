//import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import { usePurchaseOrders } from "./usePurchaseOrders";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import PoRow from "./PoRow";

function PoTable() {
  const { isLoading, error, purchaseOrders } = usePurchaseOrders();

  if (isLoading) return <Spinner />;
  if (error) return;

  if (!purchaseOrders.length > 0) return <Empty resource={"purchase orders"} />;

  return (
    <Menus>
      <Table
        role="table"
        columns="0.5fr 0.5fr 0.8fr 0.6fr 0.6fr 0.6fr 0.6fr 0.4fr"
      >
        <Table.Header>
          <div>PO #</div>
          <div>PO Date</div>
          <div>Supplier</div>
          <div>Amount</div>
          <div>Order Number</div>
          <div>Opportunity</div>
          <div>To Be Paid</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={purchaseOrders}
          render={(purchaseOrder) => (
            <PoRow purchaseOrder={purchaseOrder} key={purchaseOrder.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default PoTable;
