import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "../../ui/Modal";
import { HiOutlineEye, HiOutlinePencilSquare, HiTrash } from "react-icons/hi2";

import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateUpdateCustomer from "./CreateUpdateCustomer";
import { useDeleteCustomer } from "./useDeleteCustomer";

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

function CustomerRow({ customer }) {
  const { id, customer: customerName, PIVA, splitPayment, SDIcode } = customer;
  const paymentTerm = customer.paymentTerms?.code;
  const { isDeleting, deleteCustomer } = useDeleteCustomer();
  const isBusy = isDeleting;

  return (
    <Table.Row>
      <ItemLeft>{customerName}</ItemLeft>
      <Item>{PIVA}</Item>
      <Item> {splitPayment ? <Tag type="indigo">SPLIT</Tag> : "-"}</Item>
      <Item>{SDIcode}</Item>
      <Item>{paymentTerm}</Item>
      <Item>{}</Item>
      {/* da implementare i contatti */}
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="customer-details">
              <Menus.Button icon={<HiOutlineEye />}>Details</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="customer-edit">
              <Menus.Button icon={<HiOutlinePencilSquare />}>Edit</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="customer-delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="customer-details">
          <CreateUpdateCustomer customer={customer} isDisplay={true} />
        </Modal.Window>
        <Modal.Window name="customer-edit">
          <CreateUpdateCustomer customer={customer} />
        </Modal.Window>
        <Modal.Window name="customer-delete">
          <ConfirmDelete
            resourceName={`customer ${customerName}`}
            onConfirm={() => deleteCustomer(id)}
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

CustomerRow.propTypes = { customer: PropTypes.object };
export default CustomerRow;
