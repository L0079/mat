import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import { useCustomers } from "../customers/useCustomers";
import { useCurrencies } from "../currencies/useCurrencies";
import { usePaymentTerms } from "../paymentTerms/usePaymentTerms";
import { useCreateOrder } from "./useInsertOrder";
import { useUpdateOrder } from "./useUpdateOrder";
import { useFiscalYear } from "../settings/useFiscalYear";
import { orderDefaultValues } from "../../utils/constants";
import SpinnerMini from "../../ui/SpinnerMini";

const ButtonsDiv = styled.div`
  //font-family: "Sono";
  margin-top: 30px;
  margin-left: 8%;
  margin-right: 8%;
  display: flex;
  justify-content: space-between;
`;

const InputON = styled.input`
  padding: 0.8rem 1.2rem;
  max-width: 11rem;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
`;

const StyledSpan = styled.span`
  padding: 0.8rem 1.2rem;
  max-width: 11rem;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  float: left;
`;

export default function CreateUpdateOrder({
  order = {},
  isDisplay = false,
  onCloseModal,
}) {
  //  const { id: editId, ...editValues } = order;
  const { orderNumber: editON, ...editValues } = order;
  //  const isEditSession = Boolean(editId);
  const isEditSession = Boolean(editON);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isLoading: isLoadingCustomers, customers } = useCustomers();
  const { isLoading: isLoadingCurrencies, currencies } = useCurrencies();
  const { isLoading: isLoadingPaymentTerms, paymentTerms } = usePaymentTerms();
  const { isLoading: isLoadingFY, fiscalYear: fyObj } = useFiscalYear();

  const { isCreating, createOrder } = useCreateOrder();
  const { isUpdating, updateOrder } = useUpdateOrder();

  const navigate = useNavigate();

  function onSubmit(data) {
    const values = { ...data };
    delete values["currencies"];
    delete values["customers"];
    delete values["paymentTerms"];

    if (isEditSession) {
      // UPDATE
      // Check Order number:

      updateOrder(
        { order: { ...values }, orderNumber: editON },
        {
          onSuccess: () => {
            reset();
            onCloseModal ? onCloseModal() : navigate(-1);
          },
        }
      );
    } else {
      let on = values.orderNumber;
      if (!values.orderNumber.includes("/"))
        on = values.orderNumber + "/" + fiscalYear;

      createOrder(
        { ...values, orderNumber: on, toBeBilled: values.amount },
        {
          onSuccess: () => {
            reset();
            onCloseModal ? onCloseModal() : navigate(-1);
          },
        }
      );
    }
  }

  function handleReset() {
    if (isEditSession) onCloseModal ? onCloseModal() : navigate(-1);
    else reset();
  }

  const isBusy =
    isLoadingFY ||
    isLoadingCustomers ||
    isLoadingCurrencies ||
    isLoadingPaymentTerms;

  const isDisabled = isDisplay || isCreating || isUpdating;

  if (isBusy) return <Spinner />;
  const fiscalYear = fyObj.fiscalYear;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Order Number">
        {isEditSession ? (
          <InputON
            id="orderNumber"
            defaultValue={order?.orderNumber.split("/")[0]}
            disabled={true}
          />
        ) : (
          <InputON
            id="orderNumber"
            {...register("orderNumber", {
              required: "this field is required",
            })}
            disabled={isDisabled}
          />
        )}

        <StyledSpan>/ {fiscalYear}</StyledSpan>
      </FormRow>

      <FormRow label="Customer" error={errors?.customer?.message}>
        <Select
          id="customerId"
          name="customerId"
          valueName="id"
          labelName="customer"
          options={customers}
          register={register}
          disabled={isDisabled}
        />
      </FormRow>
      <FormRow label="Amount" error={errors?.amount?.message}>
        <Input
          type="number"
          step="0.01"
          id="amount"
          {...register("amount", {
            required: "this field is required",
          })}
          disabled={isDisabled}
        />
      </FormRow>

      <FormRow label="Currency" error={errors?.currency?.message}>
        <Select
          name="currencyId"
          id="currencyId"
          valueName="id"
          labelName="currency"
          options={currencies}
          defaultValue={orderDefaultValues.currencyId}
          register={register}
          disabled={isDisabled}
        />
      </FormRow>

      <FormRow label="Order Date" error={errors?.orderDate?.message}>
        <Input
          type="date"
          id="orderDate"
          defaultValue={format(new Date(), "yyyy-MM-dd")}
          {...register("orderDate", { required: "this field is required" })}
          disabled={isDisabled}
        ></Input>
      </FormRow>

      <FormRow label="Payment Terms" error={errors?.paymentTerms?.message}>
        <Select
          name="paymentTermsId"
          id="paymentTerms"
          valueName="id"
          labelName="code"
          options={paymentTerms}
          defaultValue={orderDefaultValues.paymentTermsId}
          register={register}
          disabled={isDisabled}
        />
      </FormRow>

      <FormRow label="PO number" error={errors?.poNumber?.message}>
        <Input
          type="string"
          id="poNumber"
          {...register("poNumber")}
          disabled={isDisabled}
        />
      </FormRow>

      <FormRow label="Opportunity" error={errors?.opportunity?.message}>
        <Input
          id="opportunity"
          {...register("opportunity", {
            required: "this field is required",
          })}
          disabled={isDisabled}
        />
      </FormRow>

      <FormRow label="Note" error={errors?.note?.message}>
        <Textarea id="note" {...register("note")} disabled={isDisabled} />
      </FormRow>

      {!isDisplay && (
        <ButtonsDiv>
          <Button onClick={handleReset}>
            {isEditSession ? "Cancel" : "Reset"}
          </Button>
          <Button disabled={isDisabled}>
            {isDisabled ? <SpinnerMini /> : isEditSession ? "Update" : "Insert"}
          </Button>
        </ButtonsDiv>
      )}
    </Form>
  );
}
CreateUpdateOrder.propTypes = {
  order: PropTypes.object,
  isDisplay: PropTypes.bool,
  onCloseModal: PropTypes.func,
};
