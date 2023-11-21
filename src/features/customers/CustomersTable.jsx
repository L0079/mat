import Spinner from "../../ui/Spinner";
import { useCustomers } from "./useCustomers";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import CustomerRow from "./CustomerRow";

function CustomersTable() {
  const { isLoading, error, customers } = useCustomers();

  if (isLoading) return <Spinner />;
  if (error) return;

  return (
    <Menus>
      <Table role="table" columns="1fr 0.4fr 0.3fr 0.3fr 0.5fr 0.8fr 0.3fr">
        <Table.Header>
          <div>Customer</div>
          <div>PIVA</div>
          <div>SPLIT</div>
          <div>SDI</div>
          <div>Payment Terms</div>
          <div>Admin Contact</div>
          <div></div>
        </Table.Header>
        {!customers.length > 0 && <Empty resource={"Customers"} />}
        <Table.Body
          data={customers}
          render={(customer) => (
            <CustomerRow customer={customer} key={customer.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CustomersTable;
