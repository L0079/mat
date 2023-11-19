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
import { HiOutlineMail } from "react-icons/hi";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import InvoiceRegister from "./InvoiceRegister";
import ConfirmStatusChange from "../../ui/ConfirmStatusChange";
import InvoicePaid from "./InvoicePaid";
import { useDeleteInvoice } from "./useDeleteInvoice";
import { useUpdateInvoiceStatus } from "./useUpdateInvoiceStatus";
import { SENT_STATUS_ID } from "../../utils/constants";
import CreateUpdateInvoice from "./CreateUpdateInvoice";

//import ConfirmDelete from "../../ui/ConfirmDelete";

// const Invoice = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: "Sono";
// `;

// const Stacked = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.2rem;

//   & span:first-child {
//     font-weight: 500;
//   }

//   & span:last-child {
//     color: var(--color-grey-500);
//     font-size: 1.2rem;
//   }
// `;

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

const Customer = styled.div`
  //font-family: "Sono";
  text-align: start;
  font-weight: 500;
`;

function InvoiceRow({ invoice }) {
  const {
    id: invoiceId,
    invoiceNumber,
    amount,
    totalAmount,
    invoiceDate,
    customers: { customer },
    currencies: { currency },
    invoiceStatus: { status },
    paymentTerms: { code },
  } = invoice;

  const statusToTagName = {
    created: "blue",
    registered: "indigo",
    sent: "green",
    paid: "silver",
    partiallyPaid: "red",
  };

  const { isDeleting, deleteInvoice } = useDeleteInvoice();
  const { isUpdating, updateInvoice } = useUpdateInvoiceStatus();

  const isBusy = isDeleting || isUpdating;

  return (
    <Table.Row>
      <Tag type={statusToTagName[status]}>{status}</Tag>
      <Item>{invoiceNumber}</Item>
      <Item>{format(new Date(invoiceDate), "dd MMM yyyy")}</Item>
      <Customer>{customer}</Customer>
      <Amount>{formatCurrency(amount, currency)}</Amount>
      <Amount>{formatCurrency(totalAmount, currency)}</Amount>
      <Item>{code}</Item>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={invoiceId} />
          <Menus.List id={invoiceId}>
            <Modal.Open opens="invoice-details">
              <Menus.Button icon={<HiOutlineEye />}>Details</Menus.Button>
            </Modal.Open>

            {status === "created" && (
              <>
                <Modal.Open opens="invoice-edit">
                  <Menus.Button icon={<HiOutlinePencilSquare />}>
                    Edit
                  </Menus.Button>
                </Modal.Open>

                <Modal.Open opens="invoice-register">
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
              <Modal.Open opens="confirm-sent">
                <Menus.Button icon={<HiOutlineMail />}>Sent</Menus.Button>
              </Modal.Open>
            )}

            {status === "sent" && (
              <Modal.Open opens="confirm-paid">
                <Menus.Button icon={<HiOutlineCurrencyEuro />}>
                  Paid
                </Menus.Button>
              </Modal.Open>
            )}
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="invoice-details">
          <CreateUpdateInvoice invoice={invoice} isDisplay={true} />
        </Modal.Window>
        <Modal.Window name="invoice-edit">
          <CreateUpdateInvoice invoice={invoice} isDisplay={false} />
        </Modal.Window>
        <Modal.Window name="invoice-register">
          <InvoiceRegister
            invoice={invoice}
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>

        <Modal.Window name="confirm-delete">
          <ConfirmDelete
            resourceName={`invoice ${invoiceNumber}`}
            onConfirm={() => deleteInvoice(invoiceId)}
            disabled={isBusy}
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>

        <Modal.Window name="confirm-sent">
          <ConfirmStatusChange
            resourceName={`invoice ${invoiceNumber}`}
            newStatus="SENT"
            onConfirm={() =>
              updateInvoice({
                invoice: { statusId: SENT_STATUS_ID },
                id: invoiceId,
              })
            }
            disabled={isBusy}
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>

        <Modal.Window name="confirm-paid">
          <InvoicePaid
            invoice={invoice}
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

InvoiceRow.propTypes = { invoice: PropTypes.object };
export default InvoiceRow;
