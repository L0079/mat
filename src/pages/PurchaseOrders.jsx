import PurchaseOrderOperations from "../features/purchaseOrder/PoOperations";
import PoTable from "../features/purchaseOrder/PoTable";
import PurchaseFilter from "../features/purchaseOrder/PurchaseFilter";
import Heading from "../ui/Heading";
import { HeaderRow, TitleAndOperation } from "../ui/HeaderRow";

function PurchaseOrders() {
  const label = "Purchase Orders";
  const labelSize = label.length + 1;
  return (
    <>
      <HeaderRow>
        <TitleAndOperation labelSize={`${labelSize}rem`}>
          <Heading as="h3">{label}</Heading>
          <PurchaseOrderOperations />
        </TitleAndOperation>
        <PurchaseFilter />
      </HeaderRow>

      <PoTable />
    </>
  );
}

export default PurchaseOrders;
