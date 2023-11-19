import styled from "styled-components";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { OTHER_COSTS_PAID_ID } from "../../utils/constants";
import { formatCurrency } from "../../utils/helpers";
import { useUpdateOtherCost } from "./useUpdateOtherCost";
import SpinnerMini from "../../ui/SpinnerMini";

const Item = styled.div`
  //font-family: "Sono";
  text-align: center;
  font-weight: 500;
`;

const ShortDiv = styled.div`
  //font-family: "Sono";
  text-align: center;
  font-weight: 500;
  max-width: 100px;
`;

const ButtonsDiv = styled.div`
  //font-family: "Sono";
  margin-top: 30px;
  margin-left: 8%;
  margin-right: 8%;
  display: flex;
  justify-content: space-between;
`;

function CreateUpdateOtherCosts({ otherCost = {}, onCloseModal }) {
  const {
    id,
    suppliers: { supplier },
    otherCostsDocTypes: { description: documentType },
    currencies: { currency },
    documentNumber,
    amount,
    taxes,
    totalAmount,
    documentDate,
    duePaymentDate,
    note,
  } = otherCost;

  const { register, handleSubmit, errors } = useForm();
  const { isUpdating, updateOtherCost } = useUpdateOtherCost();

  function onSubmit(data) {
    const values = data;
    updateOtherCost(
      { otherCost: { ...values, statusId: OTHER_COSTS_PAID_ID }, id },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Supplier">
        <Item>{supplier}</Item>
      </FormRow>
      <FormRow label="Note">
        <Item>{note}</Item>
      </FormRow>
      <FormRow label="Document Number">
        <Item>{documentNumber}</Item>
        <ShortDiv>
          <Item>{documentType}</Item>
        </ShortDiv>
      </FormRow>
      <FormRow label="Document Date">
        <Item>{documentDate}</Item>
      </FormRow>
      <FormRow label="Amount">
        <Item>{formatCurrency(amount, currency)}</Item>
      </FormRow>
      <FormRow label="Taxes">
        <Item>{formatCurrency(taxes, currency)}</Item>
      </FormRow>
      <FormRow label="Total Amount">
        <Item>{formatCurrency(totalAmount, currency)}</Item>
      </FormRow>
      <FormRow label="Due Payment Date">
        <Item>{duePaymentDate}</Item>
      </FormRow>

      <FormRow label="Payment Date" error={errors?.duePaymentDate?.message}>
        <Input
          type="date"
          id="duePaymentDate"
          defaultValue={format(new Date(), "yyyy-MM-dd")}
          {...register("paymentDate", {
            required: "this field is required",
          })}
        ></Input>
      </FormRow>

      <ButtonsDiv>
        <Button onClick={onCloseModal}>Cancel</Button>
        <Button disabled={isUpdating} position="inline-end">
          {isUpdating ? <SpinnerMini /> : "Reg.Payment"}{" "}
        </Button>
      </ButtonsDiv>
    </Form>
  );
}
CreateUpdateOtherCosts.propTypes = {
  otherCost: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default CreateUpdateOtherCosts;
