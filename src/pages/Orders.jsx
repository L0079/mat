import OrderFilter from "../features/orders/OrderFilter";
import OrderOperations from "../features/orders/OrderOperations";
import OrdersTable from "../features/orders/OrdersTable";
import Heading from "../ui/Heading";
import { HeaderRow, TitleAndOperation } from "../ui/HeaderRow";

function Orders() {
  const label = "Orders";
  const labelSize = label.length + 1;
  return (
    <>
      <HeaderRow>
        <TitleAndOperation labelSize={`${labelSize}rem`}>
          <Heading as="h3">{label}</Heading>
          <OrderOperations />
        </TitleAndOperation>
        <OrderFilter />
      </HeaderRow>

      <OrdersTable />
    </>
  );
}

export default Orders;
