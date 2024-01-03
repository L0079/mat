import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

function InvoiceOperations() {
  return (
    <TableOperations>
      <Filter
        filteredField="statusId"
        options={[
          { value: 0, label: "all" },
          { value: 1, label: "created" },
          { value: 2, label: "registered" },
          { value: 3, label: "sent" },
          { value: 4, label: "paid" },
        ]}
      />
    </TableOperations>
  );
}

export default InvoiceOperations;
