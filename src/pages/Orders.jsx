import OrderFilter from "../features/orders/OrderFilter";
import OrderOperations from "../features/orders/OrderOperations";
import OrdersTable from "../features/orders/OrdersTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Orders() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h3">Orders</Heading>
        <OrderFilter />
        <OrderOperations />
      </Row>
      <OrdersTable />
    </>
  );
}

export default Orders;
