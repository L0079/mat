import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { add as addDays } from "date-fns";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import Tag from "../../ui/Tag";
import { useTaxCodes } from "./useTaxCodes";
import { useCustomers } from "../customers/useCustomers";
import { useCurrencies } from "./useCurrencies";
import { usePaymentTerms } from "./usePaymentTerms";
import { useCreateInvoice } from "./useInsertInvoice";
import { useUpdateInvoice } from "./useUpdateInvoice";
import {
  invoiceDefaultValues,
  SPLIT_PAYMENT,
  CREATED_STATUS_ID,
} from "../../utils/constants";

function InvoiceDetails({ invoice = {}, isDisplay = false, onCloseModal }) {
  const { id: editId, ...editValues } = invoice;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isLoading: isLoadingTaxCodes, taxCodes } = useTaxCodes();
  const { isLoading: isLoadingCustomers, customers } = useCustomers();
  const { isLoading: isLoadingCurrencies, currencies } = useCurrencies();
  const { isLoading: isLoadingPaymentTerms, paymentTerms } = usePaymentTerms();

  const [customerIdx, setCustomerIdx] = useState(0);
  const [tcode, setTcode] = useState({
    code: "IVA-22",
    created_at: "",
    id: 1,
    type: "percentage",
    value: 22,
  });
  const [amount, setAmount] = useState(isEditSession ? invoice?.amount : 0); //da sistemare eventualmente con il val iniziale
  const totalAmount = tcode
    ? tcode.type === "percentage"
      ? amount + (amount * Number(tcode.value)) / 100
      : amount + Number(tcode.value)
    : amount;

  const { isCreating, createInvoice } = useCreateInvoice();
  const { isUpdating, updateInvoice } = useUpdateInvoice();

  function onSubmit(data) {
    const values = { ...data };
    //   //   taxCode2: tcode,
    //   //   totalAmount: totalAmount,
    //   //   customer: customers[customerIdx],

    console.log("InvoiceDetails SUBMIT", values);

    if (isEditSession) {
      // UPDATE
      updateInvoice(
        { invoice: { ...values }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createInvoice(
        { statusId: CREATED_STATUS_ID, totalAmount: totalAmount, ...values },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function handleReset() {
    setAmount(0);
    reset();
  }

  function handleTaxSelect(e) {
    setTcode(taxCodes.filter((t) => t.id === e.target.value)[0]);
  }
  function changeAmount(e) {
    setAmount(Number(e.target.value));
  }

  function handleCustomerSelect(e) {
    setCustomerIdx(e.target.value - 1);
    if (customers[e.target.value - 1].splitPayment) setTcode(SPLIT_PAYMENT);
  }

  const isBusy =
    isLoadingTaxCodes ||
    isLoadingCustomers ||
    isLoadingCurrencies ||
    isLoadingPaymentTerms;

  const isDisabled = isDisplay || isCreating || isUpdating;

  if (isBusy) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Customer" error={errors?.customer?.message}>
        <Select
          id="customerId"
          name="customerId"
          valueName="id"
          labelName="customer"
          //          defaultValue={editValues?.customerId}
          options={customers}
          handleChange={handleCustomerSelect}
          register={register}
          disabled={isDisabled}
        />
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
      </FormRow>

      <FormRow label="Currency" error={errors?.currency?.message}>
        <Select
          name="currencyId"
          id="currencyId"
          valueName="id"
          labelName="currency"
          options={currencies}
          defaultValue={invoiceDefaultValues.currency}
          register={register}
          disabled={isDisabled}
        />
      </FormRow>

      <FormRow label="Tax Code" error={errors?.taxCode?.message}>
        {customers[customerIdx]?.splitPayment ? (
          <Tag type="indigo">SPLIT</Tag>
        ) : (
          <Select
            name="taxCodeId"
            id="taxCodeId"
            valueName="id"
            labelName="code"
            defaultValue={invoiceDefaultValues.taxCode}
            options={taxCodes}
            register={register}
            handleChange={handleTaxSelect}
            disabled={isDisabled}
          />
        )}
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
          valueName="id"
          labelName="code"
          options={paymentTerms}
          defaultValue={invoiceDefaultValues.paymentTermsId}
          // E' giusto ma non funziona
          //   defaultValue={
          //     paymentTerms.filter(
          //       (c) => c.id === customers[customerIdx].paymentTermsId
          //     )[0].code
          //   }
          register={register}
          disabled={isDisabled}
        />
      </FormRow>

      <FormRow label="Invoice Date" error={errors?.invoiceDate?.message}>
        <Input
          type="date"
          id="invoiceDate"
          defaultValue={new Date()}
          {...register("invoiceDate", { required: "this field is required" })}
          disabled={isDisabled}
        ></Input>
      </FormRow>

      <FormRow label="Due Payment Date" error={errors?.duePaymentDate?.message}>
        <Input
          type="date"
          id="duePaymentDate"
          defaultValue={addDays(new Date(), { days: 60 })}
          {...register("duePaymentDate")}
          disabled={isDisabled}
        ></Input>
      </FormRow>

      <FormRow label="PO number" error={errors?.poNumber?.message}>
        <Input
          type="string"
          id="poNumber"
          defaultValue={invoiceDefaultValues.poNumber}
          {...register("poNumber")}
          disabled={isDisabled}
        />
      </FormRow>

      <FormRow label="Note" error={errors?.note?.message}>
        <Textarea
          id="note"
          defaultValue={invoiceDefaultValues.note}
          {...register("note")}
          disabled={isDisabled}
        />
      </FormRow>

      {!isDisplay && (
        <>
          <Button disabled={isDisabled}>Submit</Button>
          <Button onClick={handleReset}>Reset</Button>
        </>
      )}
    </Form>
  );
}
InvoiceDetails.propTypes = {
  invoice: PropTypes.object,
  isDisplay: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

export default InvoiceDetails;
