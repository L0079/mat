import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import ButtonIcon from "../../ui/ButtonIcon";
import OrdersByOrderNumber from "./OrdersByOrderNumber";
import { useFiscalYear } from "../settings/useFiscalYear";

const StyledSpan = styled.span`
  font-size: large;
  margin-right: 10px;
`;

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  gap: 2.4rem;
  &:has(button) {
    display: flex;
    justify-content: flex-start;
    gap: 1.2rem;
  }
`;

function CheckOrder() {
  const { register, handleSubmit, formState } = useForm({});
  const [orderNumber, setOrderNumber] = useState("");
  const isDisabled = false;
  const { isLoading: isLoadingFY, fiscalYear: fyObj } = useFiscalYear();

  if (isLoadingFY) return <Spinner />;
  const fiscalYear = fyObj.fiscalYear;

  function onSubmit(data) {
    const { orderNumber: ord } = data;
    let on = ord;
    if (!ord.includes("/")) on = ord + "/" + fiscalYear;
    setOrderNumber(on);
  }

  return (
    <>
      <Form type="medium" onSubmit={handleSubmit(onSubmit)}>
        <StyledFormRow>
          <StyledSpan>Order Number:</StyledSpan>
          <Input
            type="text"
            id="orderNumber"
            {...register("orderNumber", {
              required: "Please enter order number",
            })}
            disabled={isDisabled}
          />
          <ButtonIcon>
            <FaSearch />
          </ButtonIcon>
        </StyledFormRow>
      </Form>
      {orderNumber && <OrdersByOrderNumber orderNumber={orderNumber} />}
    </>
  );
}

export default CheckOrder;
