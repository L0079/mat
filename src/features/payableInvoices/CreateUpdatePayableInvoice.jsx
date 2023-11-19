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

import { PAYABLE_INVOICE_RECEIVED_STATUS_ID } from "../../utils/constants";

const Item = styled.span`
  //font-family: "Sono";
  text-align: center;
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
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? payableInvoice : purchaseOrder,
  });
  const { errors } = formState;

  const { isLoading: isLoadingPaymentTerms, paymentTerms } = usePaymentTerms();
  const { isLoading: isLoadingCC, costCenters } = useCC("Cost");

  const [amount, setAmount] = useState(
    isEditSession ? payableInvoice?.amount : purchaseOrder?.amount
  );
  const [taxes, setTaxes] = useState(
    isEditSession
      ? payableInvoice?.totalAmount - payableInvoice?.amount
      : purchaseOrder?.totalAmount - purchaseOrder?.amount
  );
  const totalAmount = amount + taxes;

  const { isCreating, createPayableInvoice } = useCreatePayableInvoice();
  const { isUpdating, updatePayableInvoice } = useUpdatePayableInvoice();

  function onSubmit(data) {
    const values = { ...data };

    if (isEditSession) {
      // UPDATE
      delete values["currencies"];
      delete values["payableInvoiceStatus"];
      delete values["suppliers"];
      delete values["paymentTerms"];
      delete values["id"];
      console.log("VALUES", values, editId);

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
        statusId: PAYABLE_INVOICE_RECEIVED_STATUS_ID,
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
          id="taxes"
          defaultValue={taxes}
          {...register("taxes", {
            onChange: (e) => {
              changeTaxes(e);
            },
          })}
          disabled={isDisabled}
        />
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
