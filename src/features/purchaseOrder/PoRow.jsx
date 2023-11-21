import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "../../ui/Modal";
import { format } from "date-fns";
import { HiOutlinePencilSquare, HiOutlineEye, HiTrash } from "react-icons/hi2";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import CreateUpdatePayableInvoice from "../payableInvoices/CreateUpdatePayableInvoice";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeletePurchaseOrder } from "./useDeletePurchaseOrder";
import CreateUpdatePO from "./CreateUpdatePO";

const Item = styled.div`
  //font-family: "Sono";
  text-align: center;
  font-weight: 500;
`;

const ItemIU = styled.div`
  //font-family: "Sono";
  text-align: center;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--color-brand-600);
`;

const Amount = styled.div`
  //font-family: "Sono";
  text-align: end;
  margin-right: 10px;
  font-weight: 500;
`;

const Supplier = styled.div`
  //font-family: "Sono";
  text-align: start;
  font-weight: 500;
`;

function PoRow({ purchaseOrder }) {
  const {
    id,
    poNumber,
    amount,
    poDate,
    suppliers: { supplier },
    currencies: { currency },
    orderNumber,
    internalPO,
    toBePaid,
  } = purchaseOrder;
  const opportunity = internalPO ? "" : purchaseOrder.orders.opportunity;
  //  paymentTerms: { code },

  const { isDeletingPO, deletePurchaseOrder } = useDeletePurchaseOrder();
  const isBusy = isDeletingPO;
  const showPayableInvoice = toBePaid > 0;

  return (
    <Table.Row>
      <Item>{poNumber}</Item>
      <Item>{format(new Date(poDate), "dd MMM yyyy")}</Item>
      <Supplier>{supplier}</Supplier>
      <Amount>{formatCurrency(amount, currency)}</Amount>
      {internalPO ? <ItemIU>Internal Use</ItemIU> : <Item>{orderNumber}</Item>}
      <Item>{opportunity}</Item>
      <Item>{formatCurrency(toBePaid, currency)}</Item>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="po-details">
              <Menus.Button icon={<HiOutlineEye />}>Details</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="po-edit">
              <Menus.Button icon={<HiOutlinePencilSquare />}>Edit</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="confirm-delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="create-payable-invoice">
              <Menus.Button icon={<LiaFileInvoiceDollarSolid />}>
                Create Payable Invoice
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="po-details">
          <CreateUpdatePO
            po={purchaseOrder}
            isDisplay={true}
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>

        <Modal.Window name="po-">
          <CreateUpdatePO
            po={purchaseOrder}
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>

        <Modal.Window name="confirm-delete">
          <ConfirmDelete
            resourceName={`purchase order ${poNumber}`}
            onConfirm={() => deletePurchaseOrder(poNumber)}
            disabled={isBusy}
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>

        <Modal.Window name="create-payable-invoice">
          <CreateUpdatePayableInvoice
            purchaseOrder={purchaseOrder}
            isDisplay={false}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

PoRow.propTypes = { purchaseOrder: PropTypes.object };
export default PoRow;
