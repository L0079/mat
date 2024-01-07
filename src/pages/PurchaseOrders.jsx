import PurchaseOrderOperations from "../features/purchaseOrder/PoOperations";
import PoTable from "../features/purchaseOrder/PoTable";
import PurchaseFilter from "../features/purchaseOrder/PurchaseFilter";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function PurchaseOrders() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h3">Purchase Orders</Heading>
        <PurchaseFilter />
        <PurchaseOrderOperations />
      </Row>
      <PoTable />
    </>
  );
}

export default PurchaseOrders;
