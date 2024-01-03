import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { format, add as addDays } from "date-fns";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import { usePaymentTerms } from "../paymentTerms/usePaymentTerms";
import { useCreatePayableInvoice } from "./useInsertPayableInvoice";
import { useUpdatePayableInvoice } from "./useUpdatePayableInvoice";
import { useCC } from "../costProfitCenters/useCC";
import { PAYABLE_WAITING_STATUS_ID } from "../../utils/constants";

const Item = styled.span`
  //font-family: "Sono";
  text-align: left;
  font-weight: 500;
`;

const ButtonsDiv = styled.div`
  //font-family: "Sono";
  margin-top: 30px;
  margin-left: 8%;
  margin-right: 8%;
  display: flex;
  justify-content: space-between;
`;

const ClickableDiv = styled.div`
  //font-family: "Sono";
  margin-left: 8%;
  margin-right: 8%;
  background-color: var(--color-indigo-100);
  max-width: 10rem;
  padding: 0.5rem;
  text-align: center;
  border-radius: 5px;
`;

function CreateUpdatePayableInvoice({
  purchaseOrder = {},
  payableInvoice = {},
  isDisplay = false,
  onCloseModal,
}) {
  // if purchaseOrder exist, it is a new payable invoice that has to be created

  const {
    supplierId,
    suppliers: { supplier },
    poNumber,
    currencyId,
    currencies: { currency },
    paymentTermsId,
    costCenterId,
  } = Object.keys(purchaseOrder).length > 0 ? purchaseOrder : payableInvoice;

  const isEditSession = Object.keys(payableInvoice).length > 0;
  const editId = isEditSession ? payableInvoice?.id : null;

  const { isLoading: isLoadingPaymentTerms, paymentTerms } = usePaymentTerms();
  const { isLoading: isLoadingCC, costCenters } = useCC("Cost");

  const [amount, setAmount] = useState(
    isEditSession ? payableInvoice?.amount : purchaseOrder?.toBePaid
  );

  // if it is a new payable invoice default taxes to 22%, the user could modify it
  const [taxes, setTaxes] = useState(
    isEditSession
      ? payableInvoice?.totalAmount - payableInvoice?.amount
      : Number((Number(purchaseOrder?.toBePaid) * 0.22).toFixed(2))
  );
  const totalAmount = Number((amount + taxes).toFixed(2));

  const { isCreating, createPayableInvoice } = useCreatePayableInvoice();
  const { isUpdating, updatePayableInvoice } = useUpdatePayableInvoice();

  const { register, handleSubmit, reset, resetField, formState } = useForm({
    defaultValues: isEditSession
      ? payableInvoice
      : {
          ...purchaseOrder,
          amount: amount,
          taxes: taxes,
          totalAmount: totalAmount,
        },
  });
  const { errors } = formState;

  function onSubmit(data) {
    const values = { ...data };

    if (isEditSession) {
      // UPDATE
      delete values["currencies"];
      delete values["payableInvoiceStatus"];
      delete values["suppliers"];
      delete values["paymentTerms"];
      delete values["id"];

      updatePayableInvoice(
        { payableInvoice: { ...values }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      const insValues = {
        invoiceNumber: values.invoiceNumber,
        supplierId,
        amount,
        totalAmount,
        currencyId,
        paymentTermsId: values.paymentTermsId,
        invoiceDate: values.invoiceDate,
        paymentDate: values.paymentDate,
        statusId: PAYABLE_WAITING_STATUS_ID,
        poNumber,
        note: values.note,
        duePaymentDate: values.duePaymentDate,
        costCenterId: values.costCenterId,
        taxes,
      };

      createPayableInvoice(insValues, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  function changeAmount(e) {
    setAmount(Number(e.target.value));
  }
  function changeTaxes(e) {
    setTaxes(Number(e.target.value));
  }
  function handleReset() {
    setAmount(0);
    setTaxes(0);
    reset();
  }
  function setTo22() {
    setTaxes(Number(((amount * 22) / 100).toFixed(2)));
    resetField("taxes", { defaultValue: taxes });
  }

  const isBusy = isLoadingPaymentTerms || isLoadingCC;
  const isDisabled = isDisplay || isCreating || isUpdating;

  if (isBusy) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Supplier">
        <Item>{supplier}</Item>
      </FormRow>

      <FormRow label="PurchaseOrder Number">
        <Item>{poNumber}</Item>
      </FormRow>

      <FormRow label="Invoice Number" error={errors?.invoiceNumber?.message}>
        <Input
          type="text"
          id="invoiceNumber"
          {...register("invoiceNumber", { required: "this field is required" })}
          disabled={isDisabled}
        />
      </FormRow>

      <FormRow label="Invoice Date" error={errors?.invoiceDate?.message}>
        <Input
          type="date"
          id="invoiceDate"
          defaultValue={format(new Date(), "yyyy-MM-dd")}
          {...register("invoiceDate", { required: "this field is required" })}
          disabled={isDisabled}
        ></Input>
      </FormRow>

      <FormRow label="Amount" error={errors?.amount?.message}>
        <Input
          type="number"
          step="0.01"
          id="amount"
          {...register("amount", {
            required: "this field is required",
            onChange: (e) => {
              changeAmount(e);
            },
          })}
          disabled={isDisabled}
        />
        <Item>{currency}</Item>
      </FormRow>

      <FormRow label="Taxes">
        <Input
          type="number"
          step="0.01"
          id="taxes"
          // defaultValue={taxes}
          {...register("taxes", {
            onChange: (e) => {
              changeTaxes(e);
            },
          })}
          disabled={isDisabled}
        />

        <Item>
          <ClickableDiv onClick={() => (isDisabled ? null : setTo22())}>
            SET to 22%
          </ClickableDiv>
        </Item>
      </FormRow>

      <FormRow label="Total Amount">
        <Input
          type="number"
          id="totalAmount"
          value={totalAmount}
          disabled={true}
        />
      </FormRow>

      <FormRow label="Payment Terms" error={errors?.paymentTerms?.message}>
        <Select
          name="paymentTermsId"
          id="paymentTerms"
          defaultValue={paymentTermsId}
          valueName="id"
          labelName="code"
          options={paymentTerms}
          register={register}
          disabled={isDisabled}
        />
      </FormRow>

      <FormRow label="Due Payment Date" error={errors?.duePaymentDate?.message}>
        <Input
          type="date"
          id="duePaymentDate"
          defaultValue={addDays(new Date(), { days: 60 })}
          {...register("duePaymentDate", {
            required: "this field is required",
          })}
          disabled={isDisabled}
        ></Input>
      </FormRow>

      <FormRow label="Cost Center" error={errors?.costCenterId?.message}>
        <Select
          name="costCenterId"
          id="costCenterId"
          valueName="id"
          defaultValue={costCenterId}
          labelName="description"
          options={costCenters}
          register={register}
          disabled={isDisabled}
        />
      </FormRow>

      <FormRow label="Note" error={errors?.note?.message}>
        <Textarea id="note" {...register("note")} disabled={isDisabled} />
      </FormRow>

      {!isDisplay && (
        <ButtonsDiv>
          <Button onClick={handleReset}>Reset</Button>
          <Button disabled={isDisabled}>
            {isEditSession ? "Update" : "Create"}
          </Button>
        </ButtonsDiv>
      )}
    </Form>
  );
}
CreateUpdatePayableInvoice.propTypes = {
  purchaseOrder: PropTypes.object,
  payableInvoice: PropTypes.object,
  isDisplay: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

export default CreateUpdatePayableInvoice;
