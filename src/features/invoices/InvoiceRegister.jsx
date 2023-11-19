import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Tag from "../../ui/Tag";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUpdateInvoiceStatus } from "./useUpdateInvoiceStatus";
import { useFiscalYear } from "../settings/useFiscalYear";
import { REGISTERED_STATUS_ID } from "../../utils/constants";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const StyledSpan = styled.span`
  padding: 0.8rem 1.2rem;
  max-width: 11rem;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  float: left;
`;

function InvoiceRegister({ invoice = {}, onCloseModal }) {
  const {
    id: editId,
    customers: { customer, splitPayment },
    amount,
    totalAmount,
    currencies: { currency },
    // taxCodes: { code: taxCode },
    invoiceDate,
    duePaymentDate,
    paymentTerms: { code: paymentTermsCode },
    poNumber,
    note,
  } = invoice;

  const taxCode = splitPayment ? "" : invoice.taxCodes.code;

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const { isUpdating, updateInvoice } = useUpdateInvoiceStatus();
  const { isLoading: isLoadingFY, fiscalYear: fyObj } = useFiscalYear();

  function onSubmit(data) {
    const values = { ...data };

    let invNum = values.invoiceNumber;
    if (!values.invoiceNumber.includes("/"))
      invNum = values.invoiceNumber + "/" + fiscalYear;

    updateInvoice(
      {
        invoice: {
          ...values,
          invoiceNumber: invNum,
          statusId: REGISTERED_STATUS_ID,
        },
        id: editId,
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  if (isLoadingFY) return <Spinner />;
  const fiscalYear = fyObj.fiscalYear;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Invoice Number" error={errors?.amount?.message}>
        <Input
          id="invoiceNumber"
          {...register("invoiceNumber", { required: "this field is required" })}
          disabled={isUpdating}
        />
        <StyledSpan>/ {fiscalYear}</StyledSpan>
      </FormRow>
      <FormRow label="Customer">
        <Stacked id="customer">{customer}</Stacked>
      </FormRow>
      <FormRow label="Amount">
        <Stacked id="amount">{amount}</Stacked>
      </FormRow>
      <FormRow label="Currency">
        <Stacked id="currency">{currency}</Stacked>
      </FormRow>
      <FormRow label="Tax Code">
        {splitPayment ? (
          <Tag type="indigo">SPLIT</Tag>
        ) : (
          <Stacked id="taxCode">{taxCode}</Stacked>
        )}
      </FormRow>
      <FormRow label="Total Amount">
        <Stacked id="totalAmount">{totalAmount}</Stacked>
      </FormRow>
      <FormRow label="Payment Terms">
        <Stacked id="paymentTerms">{paymentTermsCode}</Stacked>
      </FormRow>
      <FormRow label="Invoice Date" error={errors?.invoiceDate?.message}>
        <Input
          type="date"
          id="invoiceDate"
          defaultValue={invoiceDate}
          {...register("invoiceDate", { required: "this field is required" })}
          disabled={isUpdating}
        ></Input>
      </FormRow>

      <FormRow label="Due Payment Date" error={errors?.duePaymentDate?.message}>
        <Input
          type="date"
          id="duePaymentDate"
          defaultValue={duePaymentDate}
          {...register("duePaymentDate", {
            required: "this field is required",
          })}
          disabled={isUpdating}
        ></Input>
      </FormRow>
      <FormRow label="Customer PO number" error={errors?.poNumber?.message}>
        <Stacked id="poNumber">{poNumber}</Stacked>
      </FormRow>
      <FormRow label="Note" error={errors?.note?.message}>
        <Stacked id="note">{note}</Stacked>
      </FormRow>

      <Button disabled={isUpdating} position="inline-end">
        {isUpdating ? <SpinnerMini /> : "Register"}
      </Button>
    </Form>
  );
}

InvoiceRegister.propTypes = {
  invoice: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default InvoiceRegister;
