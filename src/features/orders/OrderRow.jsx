import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "../../ui/Modal";
import { format } from "date-fns";
import { HiOutlinePencilSquare, HiOutlineEye, HiTrash } from "react-icons/hi2";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import CreateUpdateInvoice from "../invoices/CreateUpdateInvoice";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteOrder } from "./useDeleteOrder";
import CreateUpdateOrder from "./CreateUpdateOrder";

const Item = styled.div`
  //font-family: "Sono";
  text-align: center;
  font-weight: 500;
`;

const Amount = styled.div`
  //font-family: "Sono";
  text-align: end;
  margin-right: 10px;
  font-weight: 500;
`;

const Customer = styled.div`
  //font-family: "Sono";
  text-align: start;
  font-weight: 500;
`;

function OrderRow({ order }) {
  const {
    id,
    orderNumber,
    amount,
    orderDate,
    customers: { customer },
    currencies: { currency },
    paymentTerms: { code },
    opportunity,
    toBeBilled,
  } = order;

  const { isDeleting, deleteOrder } = useDeleteOrder();
  const isBusy = isDeleting;
  const showInvoice = toBeBilled > 0;

  return (
    <Table.Row>
      <Item>{orderNumber}</Item>
      <Customer>{customer}</Customer>
      <Item>{format(new Date(orderDate), "dd MMM yyyy")}</Item>
      <Amount>{formatCurrency(amount, currency)}</Amount>
      <Item>{code}</Item>
      <Item>{opportunity}</Item>
      <Item>{formatCurrency(toBeBilled, currency)}</Item> {/* To Br Billed */}
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="create-invoice">
              {showInvoice ? (
                <Menus.Button icon={<LiaFileInvoiceDollarSolid />}>
                  Create Invoice
                </Menus.Button>
              ) : (
                <span></span>
              )}
            </Modal.Open>
            <Modal.Open opens="order-details">
              <Menus.Button icon={<HiOutlineEye />}>Details</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="order-edit">
              <Menus.Button icon={<HiOutlinePencilSquare />}>Edit</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="confirm-delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="create-invoice">
          <CreateUpdateInvoice invoiceCustomer={order} isDisplay={false} />
        </Modal.Window>
        <Modal.Window name="order-details">
          <CreateUpdateOrder order={order} isDisplay={true} />
        </Modal.Window>
        <Modal.Window name="order-edit">
          <CreateUpdateOrder order={order} isDisplay={false} />
        </Modal.Window>
        <Modal.Window name="confirm-delete">
          <ConfirmDelete
            resourceName={`order ${orderNumber}`}
            onConfirm={() => deleteOrder(orderNumber)}
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

OrderRow.propTypes = { order: PropTypes.object };
export default OrderRow;
