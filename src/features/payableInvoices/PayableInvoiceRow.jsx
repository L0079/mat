import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "../../ui/Modal";
import { format } from "date-fns";
import {
  HiOutlinePencilSquare,
  HiOutlineEye,
  HiTrash,
  HiOutlineCurrencyEuro,
  HiOutlineBookOpen,
  HiOutlineEnvelope,
} from "react-icons/hi2";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import ConfirmStatusChange from "../../ui/ConfirmStatusChange";
import PayableInvoicePaid from "./PayableInvoicePaid";
import { useDeletePayableInvoice } from "./useDeletePayableInvoice";
import {
  PAYABLE_RECEIVED_STATUS_ID,
  PAYABLE_REGISTERED_STATUS_ID,
} from "../../utils/constants";
import CreateUpdatePayableInvoice from "./CreateUpdatePayableInvoice";
import { useUpdatePayableInvoiceStatus } from "./useUpdatePayableInvoiceStatus";

const Amount = styled.div`
  //font-family: "Sono";
  text-align: end;
  margin-right: 10px;
  font-weight: 500;
`;

const Item = styled.div`
  //font-family: "Sono";
  text-align: center;
  font-weight: 500;
`;

const Supplier = styled.div`
  //font-family: "Sono";
  text-align: start;
  font-weight: 500;
`;

function PayableInvoiceRow({ payableInvoice }) {
  const {
    id: paId,
    invoiceNumber,
    amount,
    taxes,
    totalAmount,
    invoiceDate,
    suppliers: { supplier },
    currencies: { currency },
    payableInvoiceStatus: { status },
    duePaymentDate,
    poNumber,
  } = payableInvoice;

  const statusToTagName = {
    waiting: "green",
    received: "blue",
    registered: "indigo",
    paid: "silver",
  };

  const { isDeleting, deletePayableInvoice } = useDeletePayableInvoice();
  const { isUpdating, updatePayableInvoice } = useUpdatePayableInvoiceStatus();

  const isBusy = isDeleting || isUpdating;

  return (
    <Table.Row>
      <Tag type={statusToTagName[status]}>{status}</Tag>
      <Item>{invoiceNumber}</Item>
      <Item>{format(new Date(invoiceDate), "dd MMM yyyy")}</Item>
      <Supplier>{supplier}</Supplier>
      <Amount>{formatCurrency(amount, currency)}</Amount>
      <Amount>{formatCurrency(taxes, currency)}</Amount>
      <Amount>{formatCurrency(totalAmount, currency)}</Amount>
      <Item>{duePaymentDate}</Item>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={paId} />
          <Menus.List id={paId}>
            <Modal.Open opens="payable-invoice-details">
              <Menus.Button icon={<HiOutlineEye />}>Details</Menus.Button>
            </Modal.Open>

            {(status === "waiting" || status === "received") && (
              <Modal.Open opens="payable-invoice-edit">
                <Menus.Button icon={<HiOutlinePencilSquare />}>
                  Edit
                </Menus.Button>
              </Modal.Open>
            )}

            {status === "waiting" && (
              <Modal.Open opens="payable-invoice-arrival">
                <Menus.Button icon={<HiOutlineEnvelope />}>
                  Received
                </Menus.Button>
              </Modal.Open>
            )}

            {status === "received" && (
              <Modal.Open opens="payable-invoice-register">
                <Menus.Button icon={<HiOutlineBookOpen />}>
                  Register
                </Menus.Button>
              </Modal.Open>
            )}

            {status === "waiting" && (
              <Modal.Open opens="confirm-delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            )}

            {status === "registered" && (
              <Modal.Open opens="payable-invoice-payment">
                <Menus.Button icon={<HiOutlineCurrencyEuro />}>
                  Paid
                </Menus.Button>
              </Modal.Open>
            )}
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="payable-invoice-details">
          <CreateUpdatePayableInvoice
            payableInvoice={payableInvoice}
            isDisplay={true}
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>

        <Modal.Window name="payable-invoice-edit">
          <CreateUpdatePayableInvoice
            payableInvoice={payableInvoice}
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>

        <Modal.Window name="confirm-delete">
          <ConfirmDelete
            resourceName={`invoice ${invoiceNumber}`}
            onConfirm={() => deletePayableInvoice(paId)}
            disabled={isBusy}
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>

        <Modal.Window name="payable-invoice-arrival">
          <ConfirmStatusChange
            resourceName={`payable invoice ${invoiceNumber}`}
            newStatus="RECEIVED"
            onConfirm={() =>
              updatePayableInvoice({
                payableInvoice: { statusId: PAYABLE_RECEIVED_STATUS_ID },
                id: paId,
              })
            }
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>

        <Modal.Window name="payable-invoice-register">
          <ConfirmStatusChange
            resourceName={`payable invoice ${invoiceNumber}`}
            newStatus="REGISTERED"
            onConfirm={() =>
              updatePayableInvoice({
                payableInvoice: { statusId: PAYABLE_REGISTERED_STATUS_ID },
                id: paId,
              })
            }
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>

        <Modal.Window name="payable-invoice-payment">
          <PayableInvoicePaid
            payableInvoice={payableInvoice}
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

PayableInvoiceRow.propTypes = { payableInvoice: PropTypes.object };
export default PayableInvoiceRow;
