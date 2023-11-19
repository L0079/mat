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
import CreateUpdateOtherCosts from "./CreateUpdateOtherCosts";
import { useDeleteOtherCost } from "./useDeleteOtherCost";
import { useUpdateOtherCost } from "./useUpdateOtherCost";
import OtherCostPaid from "./OtherCostsPaid";
import { OTHER_COSTS_REGISTERED_STATUS_ID } from "../../utils/constants";

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
    otherCostsStatus: { status },
    otherCostsDocTypes: { code: docType },
    documentNumber,
    documentDate,
    amount,
    totalAmount,
    currencies: { currency },
    suppliers: { supplier },
    duePaymentDate,
    note,
  } = otherCost;

  const statusToTagName = {
    created: "blue",
    registered: "indigo",
    paid: "silver",
  };

  const { isDeleting, deleteOtherCost } = useDeleteOtherCost();
  const { isUpdating, updateOtherCost } = useUpdateOtherCost();
  const isBusy = isDeleting || isUpdating;

  return (
    <Table.Row>
      <Tag type={statusToTagName[status]}>{status}</Tag>
      <Item>{docType}</Item>
      <Item>{documentNumber}</Item>
      <Item>{format(new Date(documentDate), "dd MMM yyyy")}</Item>
      <Supplier>{supplier}</Supplier>
      <Amount>{formatCurrency(amount, currency)}</Amount>
      <Amount>{formatCurrency(totalAmount, currency)}</Amount>
      <Item>{duePaymentDate}</Item>
      <Item>{note}</Item>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="other-cost-details">
              <Menus.Button icon={<HiOutlineEye />}>Details</Menus.Button>
            </Modal.Open>

            {status === "created" && (
              <>
                <Modal.Open opens="other-cost-edit">
                  <Menus.Button icon={<HiOutlinePencilSquare />}>
                    Edit
                  </Menus.Button>
                </Modal.Open>

                <Modal.Open opens="other-cost-register">
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
              <Modal.Open opens="other-cost-payment">
                <Menus.Button icon={<HiOutlineCurrencyEuro />}>
                  Paid
                </Menus.Button>
              </Modal.Open>
            )}
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="other-cost-details">
          <CreateUpdateOtherCosts
            otherCost={otherCost}
            isDisplay={true}
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>
        <Modal.Window name="confirm-delete">
          <ConfirmDelete
            resourceName={`other cost ${documentNumber}`}
            onConfirm={() => deleteOtherCost(id)}
            disabled={isBusy}
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>
        <Modal.Window name="other-cost-edit">
          <CreateUpdateOtherCosts
            otherCost={otherCost}
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>
        <Modal.Window name="other-cost-register">
          <ConfirmStatusChange
            resourceName={`cost document ${documentNumber}`}
            newStatus="REGISTERED"
            onConfirm={() =>
              updateOtherCost({
                otherCost: { statusId: OTHER_COSTS_REGISTERED_STATUS_ID },
                id: id,
              })
            }
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>
        <Modal.Window name="other-cost-payment">
          <OtherCostPaid
            otherCost={otherCost}
            onCloseModal={() => {
              return <Modal.Open opens="" />;
            }}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

OtherCostRow.propTypes = { otherCost: PropTypes.object };
export default OtherCostRow;
