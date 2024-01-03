import Spinner from "../../ui/Spinner";
import { useSuppliers } from "./useSuppliers";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import SupplierRow from "./SupplierRow";

function SuppliersTable() {
  const { isLoading, error, suppliers, count } = useSuppliers();

  if (isLoading) return <Spinner />;
  if (error) return;

  return (
    <Menus>
      <Table role="table" columns="1fr 0.4fr 0.4fr 0.6fr 0.6fr 0.6fr 0.2fr">
        <Table.Header>
          <div>Supplier</div>
          <div>PIVA</div>
          <div>Payment Terms</div>
          <div>E-mail</div>
          <div>Phone Number</div>
          <div>Admin Contact</div>
        </Table.Header>
        {!suppliers.length > 0 && <Empty resource={"Suppliers"} />}
        <Table.Body
          data={suppliers}
          render={(supplier) => (
            <SupplierRow supplier={supplier} key={supplier.id} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default SuppliersTable;
