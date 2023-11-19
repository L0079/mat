import styled from "styled-components";
import { useState } from "react";
import { FaSquareCaretDown } from "react-icons/fa6";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import CurrenciesTable from "../currencies/CurrenciesTable";
import TaxCodesTable from "../taxCodes/TaxCodesTable";
import PaymentTermsTable from "../paymentTerms/PaymentTermsTable";
import CCTable from "../costProfitCenters/CCTable";

const StyledDiv = styled.div`
  //font-family: "Sono";
  //  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  outline: none;
  display: flex;
  align-items: center;
  gap: 1.6rem;

  *:focus {
    outline: 0 !important;
  }
  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

function ParametersSetting() {
  const [showTable, setShowTable] = useState(0);

  function handleshowTable(tab) {
    if (tab === showTable) setShowTable(0);
    else setShowTable(tab);
  }

  return (
    <>
      <Row>
        <StyledDiv>
          <StyledButton onClick={() => handleshowTable(1)}>
            <Heading as="h3">Currencies</Heading>
            <FaSquareCaretDown />
          </StyledButton>

          <StyledButton onClick={() => handleshowTable(2)}>
            <Heading as="h3">Tax Codes</Heading>
            <FaSquareCaretDown />
          </StyledButton>

          <StyledButton onClick={() => handleshowTable(3)}>
            <Heading as="h3">Payment Terms</Heading>
            <FaSquareCaretDown />
          </StyledButton>

          <StyledButton onClick={() => handleshowTable(4)}>
            <Heading as="h3">Cost&Profit Centers</Heading>
            <FaSquareCaretDown />
          </StyledButton>
        </StyledDiv>
      </Row>
      <Row>
        {showTable === 1 && <CurrenciesTable />}
        {showTable === 2 && <TaxCodesTable />}
        {showTable === 3 && <PaymentTermsTable />}
        {showTable === 4 && <CCTable />}
      </Row>
    </>
  );
}

export default ParametersSetting;
