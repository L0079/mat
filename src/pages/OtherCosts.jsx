import Heading from "../ui/Heading";
import Row from "../ui/Row";
import OtherCostsOperations from "../features/otherCosts/OtherCostsOperations";
import OtherCostsTable from "../features/otherCosts/OtherCostsTable";

function OtherCosts() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h3">Other Costs</Heading>
        <OtherCostsOperations />
      </Row>
      <OtherCostsTable />
    </>
  );
}

export default OtherCosts;
