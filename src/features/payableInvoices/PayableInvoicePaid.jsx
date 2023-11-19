import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useUpdatePayableInvoiceStatus } from "./useUpdatePayableInvoiceStatus";
import SpinnerMini from "../../ui/SpinnerMini";
import { PAYABLE_PAID_STATUS_ID } from "../../utils/constants";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

function PayableInvoicePaid({ payableInvoice = {}, onCloseModal }) {
  const {
    id: editId,
    invoiceNumber,
    suppliers: { supplier },
    amount,
    totalAmount,
    currencies: { currency },
    invoiceDate,
    duePaymentDate,
    paymentTerms: { code: paymentTermsCode },
    poNumber,
    note,
  } = payableInvoice;

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const { isUpdating, updatePayableInvoice } = useUpdatePayableInvoiceStatus();

  function onSubmit(data) {
    const values = { ...data };

    updatePayableInvoice(
      {
        payableInvoice: {
          statusId: PAYABLE_PAID_STATUS_ID,
          paymentDate: values.paymentDate,
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
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Supplier">
        <Stacked id="supplier">{supplier}</Stacked>
      </FormRow>
      <FormRow label="PO number">
        <Stacked id="poNumber">{poNumber}</Stacked>
      </FormRow>
      <FormRow label="Invoice Number">
        <Stacked id="invoiceNumber">{invoiceNumber}</Stacked>
      </FormRow>
      <FormRow label="Invoice Date">
        <Stacked id="Invoice Date">{invoiceDate}</Stacked>
      </FormRow>

      <FormRow label="Amount">
        <Stacked id="amount">{formatCurrency(amount, currency)}</Stacked>
      </FormRow>

      <FormRow label="Total Amount">
        <Stacked id="totalAmount">
          {formatCurrency(totalAmount, currency)}
        </Stacked>
      </FormRow>

      <FormRow label="Payment Terms">
        <Stacked id="paymentTerms">{paymentTermsCode}</Stacked>
      </FormRow>

      <FormRow label="Note" error={errors?.note?.message}>
        <Stacked id="note">{note}</Stacked>
      </FormRow>

      <FormRow label="Due Payment Date">
        <Stacked id="Due Payment Date">{duePaymentDate}</Stacked>
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

      <Button disabled={isUpdating} position="inline-end">
        {isUpdating ? <SpinnerMini /> : "Reg.Payment"}
      </Button>
    </Form>
  );
}

PayableInvoicePaid.propTypes = {
  payableInvoice: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default PayableInvoicePaid;
