//import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import { useOrders } from "./useOrders";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import OrderRow from "./OrderRow";

function OrdersTable() {
  const { isLoading, error, orders } = useOrders();

  if (isLoading) return <Spinner />;
  if (error) return;

  if (!orders.length > 0) return <Empty resource={"orders"} />;

  return (
    <Menus>
      <Table
        role="table"
        columns="0.6fr 1.3fr 0.6fr 0.6fr 1fr 0.6fr 0.6fr 0.4fr"
      >
        <Table.Header>
          <div>Order #</div>
          <div>Customer</div>
          <div>Order Date</div>
          <div>Amount</div>
          <div>Payment</div>
          <div>Opportunity</div>
          <div>To Be Billed</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={orders}
          render={(order) => <OrderRow order={order} key={order.id} />}
        />
      </Table>
    </Menus>
  );
}

export default OrdersTable;
