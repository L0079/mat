import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CustomersOperations from "../features/customers/CustomersOperations";
import CustomersTable from "../features/customers/CustomersTable";

function Customers() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h3">Customers</Heading>
        <CustomersOperations />
      </Row>
      <CustomersTable />
    </>
  );
}

export default Customers;
