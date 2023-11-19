import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "../../ui/Modal";
import { HiOutlinePencilSquare, HiTrash } from "react-icons/hi2";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateUpdateTaxCode from "./CreateUpdateTaxCode";
import { useDeleteTaxCode } from "./useDeleteTaxCode";

const Item = styled.div`
  //font-family: "Sono";
  text-align: center;
  font-weight: 500;
`;

function TaxCodeRow({ taxCodeItem }) {
  const { id, code, type, value } = taxCodeItem;
  const { isDeleting, deleteTaxCode } = useDeleteTaxCode();
  const isBusy = isDeleting;

  return (
    <Table.Row>
      <Item>{code}</Item>
      <Item>{type}</Item>
      <Item>{value}</Item>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="taxCode-edit">
              <Menus.Button icon={<HiOutlinePencilSquare />}>Edit</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="taxCode-delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="taxCode-edit">
          <CreateUpdateTaxCode taxCode={taxCodeItem} />
        </Modal.Window>
        <Modal.Window name="taxCode-delete">
          <ConfirmDelete
            resourceName={`taxCode ${code}`}
            onConfirm={() => deleteTaxCode(id)}
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

TaxCodeRow.propTypes = { taxCodeItem: PropTypes.object };
export default TaxCodeRow;
