import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

function PayableInvoiceOperations() {
  return (
    <TableOperations>
      <Filter
        filteredField="statusId"
        options={[
          { value: 0, label: "all" },
          { value: 1, label: "waiting" },
          { value: 2, label: "received" },
          { value: 3, label: "registered" },
          { value: 4, label: "paid" },
        ]}
      />
    </TableOperations>
  );
}

export default PayableInvoiceOperations;
