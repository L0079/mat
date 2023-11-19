import Heading from "../ui/Heading";
import Row from "../ui/Row";
import OtherCostsOperations from "../features/otherCosts/OtherCostsOperations";
import OtherCostsTable from "../features/otherCosts/OtherCostsTable";

function OtherCosts() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Other Costs</Heading>

        <OtherCostsOperations />
      </Row>
      <OtherCostsTable />
    </>
  );
}

export default OtherCosts;
