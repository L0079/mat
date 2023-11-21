import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "../../ui/Modal";
import { HiOutlineEye, HiOutlinePencilSquare, HiTrash } from "react-icons/hi2";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateUpdateSupplier from "./CreateUpdateSupplier";
// import { useDeleteCustomer } from "./useDeleteCustomer";

const Item = styled.div`
  //font-family: "Sono";
  text-align: center;
  font-weight: 500;
`;
const ItemLeft = styled.div`
  //font-family: "Sono";
  text-align: left;
  font-weight: 500;
`;

function SupplierRow({ supplier }) {
  const {
    id,
    supplier: supplierName,
    PIVA,
    emailAddress,
    phoneNumber,
  } = supplier;
  const paymentTerm = supplier.paymentTerms?.code;
  // const { isDeleting, deleteSupplier } = useDeleteSupplier();
  // const isBusy = isDeleting;

  return (
    <Table.Row>
      <ItemLeft>{supplierName}</ItemLeft>
      <Item>{PIVA}</Item>
      <Item>{paymentTerm}</Item>
      <Item>{emailAddress}</Item>
      <Item>{phoneNumber}</Item>
      <Item>{}</Item>
      {/* da implementare i contatti */}
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="supplier-details">
              <Menus.Button icon={<HiOutlineEye />}>Details</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="supplier-edit">
              <Menus.Button icon={<HiOutlinePencilSquare />}>Edit</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="supplier-delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        {/* 
        <Modal.Window name="customer-delete">
          <ConfirmDelete
            resourceName={`customer ${customerName}`}
            onConfirm={() => deleteCustomer(id)}
            disabled={isBusy}
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window> */}
        <Modal.Window name="supplier-details">
          <CreateUpdateSupplier supplier={supplier} isDisplay={true} />
        </Modal.Window>
        <Modal.Window name="supplier-edit">
          <CreateUpdateSupplier supplier={supplier} />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

SupplierRow.propTypes = { supplier: PropTypes.object };
export default SupplierRow;
