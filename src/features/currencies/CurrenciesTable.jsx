import { HiOutlinePlusCircle } from "react-icons/hi2";

import Spinner from "../../ui/Spinner";
import { useCurrencies } from "./useCurrencies";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import CurrencyRow from "./CurrencyRow";
import ButtonIconOperations from "../../ui/ButtonIconOperations";
import CreateUpdateCurrency from "./CreateUpdateCurrency";

function OrdersTable() {
  const { isLoading, error, currencies } = useCurrencies();

  if (isLoading) return <Spinner />;
  if (error) return;

  if (!currencies.length > 0) return <Empty resource={"currencies"} />;

  return (
    <Menus>
      <Table role="table" columns="0.8fr 1.5fr 0.8fr 0.5fr">
        <Table.Header>
          <div>Currency</div>
          <div>Description</div>
          <div>Conversion Rate</div>
          <div>
            <Modal>
              <Modal.Open opens="currency-create">
                <ButtonIconOperations float="right">
                  <HiOutlinePlusCircle />
                </ButtonIconOperations>
              </Modal.Open>
              <Modal.Window name="currency-create">
                <CreateUpdateCurrency />
              </Modal.Window>
            </Modal>
          </div>
        </Table.Header>
        <Table.Body
          data={currencies}
          render={(currency) => (
            <CurrencyRow currencyItem={currency} key={currency.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default OrdersTable;
