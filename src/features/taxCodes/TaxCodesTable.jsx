import { HiOutlinePlusCircle } from "react-icons/hi2";

import Spinner from "../../ui/Spinner";
import { useTaxCodes } from "./useTaxCodes";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import TaxCodeRow from "./TaxCodeRow";
import ButtonIconOperations from "../../ui/ButtonIconOperations";
import CreateUpdateTaxCode from "./CreateUpdateTaxCode";

function TaxCodesTable() {
  const { isLoading, error, taxCodes } = useTaxCodes();

  if (isLoading) return <Spinner />;
  if (error) return;

  if (!taxCodes.length > 0) return <Empty resource={"tax-codes"} />;

  return (
    <Menus>
      <Table role="table" columns="0.8fr 1.5fr 0.8fr 0.5fr">
        <Table.Header>
          <div>Code</div>
          <div>Type</div>
          <div>Value</div>
          <div>
            <Modal>
              <Modal.Open opens="taxCode-create">
                <ButtonIconOperations float="right">
                  <HiOutlinePlusCircle />
                </ButtonIconOperations>
              </Modal.Open>
              <Modal.Window name="taxCode-create">
                <CreateUpdateTaxCode />
              </Modal.Window>
            </Modal>
          </div>
        </Table.Header>
        <Table.Body
          data={taxCodes}
          render={(taxCode) => (
            <TaxCodeRow taxCodeItem={taxCode} key={taxCode.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default TaxCodesTable;
