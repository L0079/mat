import PurchaseOrderOperations from "../features/purchaseOrder/PoOperations";
import PoTable from "../features/purchaseOrder/PoTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function PurchaseOrders() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Purchase Orders</Heading>
        <PurchaseOrderOperations />
      </Row>
      <PoTable />
    </>
  );
}

export default PurchaseOrders;
