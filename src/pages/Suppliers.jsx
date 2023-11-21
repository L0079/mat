import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SuppliersOperations from "../features/suppliers/SuppliersOperations";
import SuppliersTable from "../features/suppliers/SuppliersTable";

function Suppliers() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Suppliers</Heading>
        <SuppliersOperations />
      </Row>
      <SuppliersTable />
    </>
  );
}

export default Suppliers;
