import styled from "styled-components";
import { MdPublishedWithChanges } from "react-icons/md";
import { useFiscalYear } from "./useFiscalYear";
import SpinnerMini from "../../ui/SpinnerMini";
import ButtonIconOperations from "../../ui/ButtonIconOperations";
import { useState } from "react";
import Modal from "../../ui/Modal";
import ConfirmUpdate from "../../ui/ConfirmUpdate";
import { useUpdateFiscalYear } from "./useUpdateFiscalYear";

const StyledDiv = styled.div`
  //font-family: "Sono";
  display: flex;
  align-items: center;
  vertical-align: center;
`;

const StyledHeading = styled.h3`
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 1;
  margin-top: -20px;
`;

const Input = styled.input`
  padding: 0.8rem 0.8rem;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  max-width: 10rem;
  margin-left: 10px;
  margin-right: 15px;
`;

function SetFiscalYear() {
  const [fiscalYear, setFiscalYear] = useState(2022);
  const { isLoading, fiscalYear: fyObj } = useFiscalYear();
  const { updateFiscalYear } = useUpdateFiscalYear();

  if (isLoading) return <SpinnerMini />;

  return (
    <StyledDiv>
      <StyledHeading>
        {"Fiscal Year: "}

        <Input
          type="number"
          defaultValue={fyObj.fiscalYear}
          onChange={(e) => setFiscalYear(e.target.value)}
        />

        <Modal>
          <Modal.Open opens="change-fiscalYear">
            <ButtonIconOperations>
              <MdPublishedWithChanges />
            </ButtonIconOperations>
          </Modal.Open>

          <Modal.Window name="change-fiscalYear">
            <ConfirmUpdate
              resourceName={"the Fiscal Year"}
              onConfirm={() => updateFiscalYear({ fiscalYear: fiscalYear })}
              onCloseModal={() => {
                return <Modal.Open opens="" />;
              }}
            />
          </Modal.Window>
        </Modal>
      </StyledHeading>
    </StyledDiv>
  );
}

export default SetFiscalYear;
