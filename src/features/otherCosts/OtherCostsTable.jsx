//import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import { useOtherCosts } from "./useOtherCosts";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import OtherCostRow from "./OtherCostRow";
import Pagination from "../../ui/Pagination";

function OtherCostsTable() {
  const { isLoading, otherCosts, count } = useOtherCosts();

  if (isLoading) return <Spinner />;
  if (!otherCosts.length > 0) return <Empty resource={"Other Costs"} />;

  return (
    <Menus>
      <Table
        role="table"
        // columns="0.4fr 0.4fr 0.6fr 0.6fr 1fr 0.6fr 0.6fr 0.6fr 0.6fr 0.2fr"
        columns="0.4fr 0.4fr 0.6fr 0.6fr 1fr 0.6fr 0.6fr 0.6fr 0.2fr"
      >
        <Table.Header>
          <div></div>
          <div>Doc. Type</div>
          <div>Doc. #</div>
          <div>Doc. Date</div>
          <div>Supplier</div>
          <div>Amount</div>
          <div>Total Amount</div>
          <div>Payment Due On</div>
          {/* <div>Note</div> */}
          <div></div>
        </Table.Header>
        <Table.Body
          data={otherCosts}
          render={(otherCost) => <OtherCostRow otherCost={otherCost} key={otherCost.id} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default OtherCostsTable;
