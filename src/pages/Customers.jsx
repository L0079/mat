import Heading from "../ui/Heading";
import CustomersOperations from "../features/customers/CustomersOperations";
import CustomersTable from "../features/customers/CustomersTable";
import { HeaderRow, TitleAndOperation } from "../ui/HeaderRow";

function Customers() {
  const label = "Customers";
  const labelSize = label.length + 1;
  return (
    <>
      <HeaderRow>
        <TitleAndOperation labelSize={`${labelSize}rem`}>
          <Heading as="h3">{label}</Heading>
          <CustomersOperations />
        </TitleAndOperation>
      </HeaderRow>

      <CustomersTable />
    </>
  );
}

export default Customers;
