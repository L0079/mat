import { HiOutlinePlusCircle } from "react-icons/hi2";

import Spinner from "../../ui/Spinner";
import { usePaymentTerms } from "./usePaymentTerms";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import PaymentTermRow from "./PaymentTermRow";
import ButtonIconOperations from "../../ui/ButtonIconOperations";
import CreateUpdatePaymentTerm from "./CreateUpdatePaymentTerm";

function PaymentTermsTable() {
  const { isLoading, error, paymentTerms } = usePaymentTerms();

  if (isLoading) return <Spinner />;
  if (error) return;

  if (!paymentTerms.length > 0) return <Empty resource={"payment-terms"} />;

  return (
    <Menus>
      <Table role="table" columns="0.8fr 1.5fr 0.8fr 0.5fr 0.5fr">
        <Table.Header>
          <div>Code</div>
          <div>Description</div>
          <div>Delay</div>
          <div>Starting...</div>
          <div>
            <Modal>
              <Modal.Open opens="paymentTerm-create">
                <ButtonIconOperations float="right">
                  <HiOutlinePlusCircle />
                </ButtonIconOperations>
              </Modal.Open>
              <Modal.Window name="paymentTerm-create">
                <CreateUpdatePaymentTerm />
              </Modal.Window>
            </Modal>
          </div>
        </Table.Header>
        <Table.Body
          data={paymentTerms}
          render={(paymentTerm) => (
            <PaymentTermRow
              paymentTermItem={paymentTerm}
              key={paymentTerm.id}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default PaymentTermsTable;
