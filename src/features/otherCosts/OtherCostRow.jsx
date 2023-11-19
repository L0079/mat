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
} from "react-icons/hi2";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import ConfirmStatusChange from "../../ui/ConfirmStatusChange";
import PayableInvoicePaid from "./PayableInvoicePaid";
import { useDeletePayableInvoice } from "./useDeletePayableInvoice";
import { PAYABLE_REGISTERED_STATUS_ID } from "../../utils/constants";
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

function OtherCostRow({ otherCost }) {
  const {
    id,
    otherCostsStatus: { code: status },
    otherCostsDocType: { code: docType },
    documentNumber,
    documentDate,
    amount,
    totalAmount,
    currencies: { currency },
    suppliers: { supplier },
    paymentDate,
    duePaymentDate,
    note,
  } = otherCost;

  const statusToTagName = {
    created: "blue",
    registered: "indigo",
    paid: "silver",
  };

  const { isDeleting, deletePayableInvoice } = useDeletePayableInvoice();
  const { isUpdating, updatePayableInvoice } = useUpdatePayableInvoiceStatus();

  const isBusy = isDeleting || isUpdating;

  {
    /* <div></div>
  <div>Doc. Type</div>
  <div>Doc. #</div>
  <div>Doc. Date</div>
  <div>Supplier</div>
  <div>Amount</div>
  <div>Total Amount</div>
  <div>Payment Due On</div>
  <div>Note</div>
  <div></div> */
  }

  return (
    <Table.Row>
      <Tag type={statusToTagName[status]}>{status}</Tag>
      <Item>{documentNumber}</Item>
      <Item>{format(new Date(documentDate), "dd MMM yyyy")}</Item>
      <Supplier>{supplier}</Supplier>
      <Amount>{formatCurrency(amount, currency)}</Amount>
      <Amount>{formatCurrency(totalAmount, currency)}</Amount>
      <Item>{duePaymentDate}</Item>
      <Item>{note}</Item>
      <Modal>
        {/* 
                  <Menus.Menu>
                  <Menus.Toggle id={paId} />
          <Menus.List id={paId}>
            <Modal.Open opens="payable-invoice-details">
              <Menus.Button icon={<HiOutlineEye />}>Details</Menus.Button>
            </Modal.Open>

            {status === "received" && (
              <>
                <Modal.Open opens="payable-invoice-edit">
                  <Menus.Button icon={<HiOutlinePencilSquare />}>
                    Edit
                  </Menus.Button>
                </Modal.Open>

                <Modal.Open opens="payable-invoice-register">
                  <Menus.Button icon={<HiOutlineBookOpen />}>
                    Register
                  </Menus.Button>
                </Modal.Open>

                <Modal.Open opens="confirm-delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </>
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
        </Modal.Window> */}
      </Modal>
    </Table.Row>
  );
}

OtherCostRow.propTypes = { otherCost: PropTypes.object };
export default OtherCostRow;
