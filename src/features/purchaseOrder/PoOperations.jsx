import { useNavigate } from "react-router-dom";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import ButtonIconOperations from "../../ui/ButtonIconOperations";
import TableOperations from "../../ui/TableOperations";

function PurchaseOrderOperations() {
  const navigate = useNavigate();

  return (
    <TableOperations>
      <ButtonIconOperations>
        <HiOutlinePlusCircle onClick={() => navigate("/po")} />
      </ButtonIconOperations>
    </TableOperations>
  );
}

export default PurchaseOrderOperations;
