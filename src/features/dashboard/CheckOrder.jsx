import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import OrdersByOrderNumber from "./OrdersByOrderNumber";
import { useFiscalYear } from "../settings/useFiscalYear";

const StyledSpan = styled.span`
  font-size: large;
  margin-right: 10px;
`;

function CheckOrder() {
  const { register, handleSubmit, reset, formState } = useForm({});
  const { errors } = formState;
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <StyledSpan>Order Number:</StyledSpan>
        <Input
          type="text"
          id="orderNumber"
          {...register("orderNumber", {
            required: "Please enter order number",
          })}
          disabled={isDisabled}
        />
      </Form>
      {orderNumber && <OrdersByOrderNumber orderNumber={orderNumber} />}
    </>
  );
}

export default CheckOrder;
