import { HiOutlinePlusCircle } from "react-icons/hi2";

import Spinner from "../../ui/Spinner";
import { useCC } from "./useCC";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import CCRow from "./CCRow";
import ButtonIconOperations from "../../ui/ButtonIconOperations";
import CreateUpdateCC from "./CreateUpdateCC";

function CCTable() {
  const { isLoading, error, costCenters } = useCC();

  if (isLoading) return <Spinner />;
  if (error) return;

  return (
    <Menus>
      <Table role="table" columns="0.5fr 0.5fr 2fr 0.5fr">
        <Table.Header>
          <div>Cost Center</div>
          <div>Type</div>
          <div>Description</div>
          <div>
            <Modal>
              <Modal.Open opens="cc-create">
                <ButtonIconOperations float="right">
                  <HiOutlinePlusCircle />
                </ButtonIconOperations>
              </Modal.Open>
              <Modal.Window name="cc-create">
                <CreateUpdateCC />
              </Modal.Window>
            </Modal>
          </div>
        </Table.Header>
        {!costCenters.length > 0 && <Empty resource={"costCenters"} />}
        <Table.Body
          data={costCenters}
          render={(costCenter) => (
            <CCRow ccItem={costCenter} key={costCenter.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CCTable;
