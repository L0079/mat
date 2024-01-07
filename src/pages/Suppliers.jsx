import Heading from "../ui/Heading";
import SuppliersOperations from "../features/suppliers/SuppliersOperations";
import SuppliersTable from "../features/suppliers/SuppliersTable";
import { HeaderRow, TitleAndOperation } from "../ui/HeaderRow";

function Suppliers() {
  const label = "Suppliers";
  const labelSize = label.length + 1;
  return (
    <>
      <HeaderRow>
        <TitleAndOperation labelSize={`${labelSize}rem`}>
          <Heading as="h3">{label}</Heading>
          <SuppliersOperations />
        </TitleAndOperation>
      </HeaderRow>

      <SuppliersTable />
    </>
  );
}

export default Suppliers;
