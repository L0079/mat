import { useNavigate } from "react-router-dom";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import ButtonIconOperations from "../../ui/ButtonIconOperations";
import TableOperations from "../../ui/TableOperations";

function OrderOperations() {
  const navigate = useNavigate();

  return (
    <TableOperations>
      <ButtonIconOperations>
        <HiOutlinePlusCircle onClick={() => navigate("/order")} />
      </ButtonIconOperations>
    </TableOperations>
  );
}

export default OrderOperations;
