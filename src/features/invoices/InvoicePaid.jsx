import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Tag from "../../ui/Tag";
import { useUpdateInvoiceStatus } from "./useUpdateInvoiceStatus";
import SpinnerMini from "../../ui/SpinnerMini";
import { PAID_STATUS_ID } from "../../utils/constants";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

function InvoicePaid({ invoice = {}, onCloseModal }) {
  const {
    id: editId,
    invoiceNumber,
    customers: { customer, splitPayment },
    amount,
    totalAmount,
    currencies: { currency },
    taxCodes: { code: taxCode },
    invoiceDate,
    duePaymentDate,
    paymentDate,
    paymentTerms: { code: paymentTermsCode },
    poNumber,
    note,
  } = invoice;

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const { isUpdating, updateInvoice } = useUpdateInvoiceStatus();

  function onSubmit(data) {
    const values = { ...data };

    updateInvoice(
      {
        invoice: { ...values, statusId: PAID_STATUS_ID },
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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Invoice Number" error={errors?.amount?.message}>
        <Stacked id="invoiceNumber">{invoiceNumber}</Stacked>
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
      <FormRow label="Invoice Date">
        <Stacked id="Invoice Date">{invoiceDate}</Stacked>
      </FormRow>

      <FormRow label="Due Payment Date">
        <Stacked id="Due Payment Date">{duePaymentDate}</Stacked>
      </FormRow>
      <FormRow label="PO number">
        <Stacked id="poNumber">{poNumber}</Stacked>
      </FormRow>
      <FormRow label="Payment Date" error={errors?.paymentDate?.message}>
        <Input
          type="date"
          id="paymentDate"
          defaultValue={format(new Date(), "yyyy-MM-dd")}
          {...register("paymentDate", { required: "this field is required" })}
          disabled={isUpdating}
        ></Input>
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

InvoicePaid.propTypes = {
  invoice: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default InvoicePaid;
