import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "../../ui/Modal";
import { HiOutlinePencilSquare, HiTrash } from "react-icons/hi2";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateUpdateCurrency from "./CreateUpdateCurrency";
import { useDeleteCurrency } from "./useDeleteCurrency";

const Item = styled.div`
  //font-family: "Sono";
  text-align: center;
  font-weight: 500;
`;

function CurrencyRow({ currencyItem }) {
  const { id, currency, description, conversionRate } = currencyItem;
  const { isDeleting, deleteCurrency } = useDeleteCurrency();
  const isBusy = isDeleting;

  return (
    <Table.Row>
      <Item>{currency}</Item>
      <Item>{description}</Item>
      <Item>{conversionRate}</Item>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="currency-edit">
              <Menus.Button icon={<HiOutlinePencilSquare />}>Edit</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="confirm-delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="currency-edit">
          <CreateUpdateCurrency currency={currencyItem} />
        </Modal.Window>
        <Modal.Window name="confirm-delete">
          <ConfirmDelete
            resourceName={`currency ${currency}`}
            onConfirm={() => deleteCurrency(id)}
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

CurrencyRow.propTypes = { currencyItem: PropTypes.object };
export default CurrencyRow;
