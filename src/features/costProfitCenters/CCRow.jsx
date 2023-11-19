import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "../../ui/Modal";
import { HiOutlinePencilSquare, HiTrash } from "react-icons/hi2";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateUpdateCC from "./CreateUpdateCC";
import { useDeleteCC } from "./useDeleteCC";

const Item = styled.div`
  //font-family: "Sono";
  text-align: center;
  font-weight: 500;
`;

function CCRow({ ccItem }) {
  const { id, costCenter, type, description } = ccItem;
  const { isDeleting, deleteCC } = useDeleteCC();
  const isBusy = isDeleting;

  return (
    <Table.Row>
      <Item>{costCenter}</Item>
      <Item>{type}</Item>
      <Item>{description}</Item>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="cc-edit">
              <Menus.Button icon={<HiOutlinePencilSquare />}>Edit</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="confirm-delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="cc-edit">
          <CreateUpdateCC costCenter={ccItem} />
        </Modal.Window>
        <Modal.Window name="confirm-delete">
          <ConfirmDelete
            resourceName={`cost center ${costCenter}`}
            onConfirm={() => deleteCC(id)}
            disabled={isBusy}
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

CCRow.propTypes = { ccItem: PropTypes.object };
export default CCRow;
