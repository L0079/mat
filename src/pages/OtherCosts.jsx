import Heading from "../ui/Heading";
import OtherCostsOperations from "../features/otherCosts/OtherCostsOperations";
import OtherCostsFilter from "../features/otherCosts/OtherCostsFilter";
import OtherCostsTable from "../features/otherCosts/OtherCostsTable";
import { HeaderRow, TitleAndOperation } from "../ui/HeaderRow";

function OtherCosts() {
  const label = "Other Costs";
  const labelSize = label.length + 1;
  return (
    <>
      <HeaderRow>
        <TitleAndOperation labelSize={`${labelSize}rem`}>
          <Heading as="h3">{label}</Heading>
          <OtherCostsOperations />
        </TitleAndOperation>
        <OtherCostsFilter />
      </HeaderRow>

      <OtherCostsTable />
    </>
  );
}

export default OtherCosts;
