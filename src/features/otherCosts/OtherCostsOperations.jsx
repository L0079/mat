import { useNavigate } from "react-router-dom";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import ButtonIconOperations from "../../ui/ButtonIconOperations";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

function OtherCostsOperations() {
  const navigate = useNavigate();

  return (
    <>
      <TableOperations>
        <Filter
          filteredField="statusId"
          options={[
            { value: 0, label: "all" },
            { value: 1, label: "created" },
            { value: 2, label: "registered" },
            { value: 3, label: "paid" },
          ]}
        />
      </TableOperations>

      <TableOperations>
        <ButtonIconOperations>
          <HiOutlinePlusCircle onClick={() => navigate("/cost")} />
        </ButtonIconOperations>
      </TableOperations>
    </>
  );
}

export default OtherCostsOperations;
