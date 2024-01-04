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
import Tag from "../../ui/Tag";
import { useTaxCodes } from "../taxCodes/useTaxCodes";
import { usePaymentTerms } from "../paymentTerms/usePaymentTerms";
import { useCreateInvoice } from "./useInsertInvoice";
import { useUpdateInvoice } from "./useUpdateInvoice";
import { useCC } from "../costProfitCenters/useCC";
import {
  invoiceDefaultValues,
  CREATED_STATUS_ID,
  SPLIT_PAYMENT_ID,
} from "../../utils/constants";

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

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

function CreateUpdateInvoice({
  invoiceCustomer = {},
  invoice = {},
  isDisplay = false,
  onCloseModal,
}) {
  // if invoiceCustomer exist, it is a new invoice that has to be created
  const {
    customerId,
    customers: { customer, splitPayment, PIVA, SDIcode },
    // id: orderId,
    orderNumber,
    currencyId,
    currencies: { currency },
  } = Object.keys(invoiceCustomer).length > 0 ? invoiceCustomer : invoice;

  const isEditSession = Object.keys(invoice).length > 0;
  const editId = isEditSession ? invoice?.id : null;
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession
      ? invoice
      : { ...invoiceCustomer, amount: invoiceCustomer.toBeBilled },
  });
  const { errors } = formState;

  const { isLoading: isLoadingTaxCodes, taxCodes } = useTaxCodes();
  const { isLoading: isLoadingPaymentTerms, paymentTerms } = usePaymentTerms();
  const { isLoading: isLoadingCC, costCenters } = useCC("Profit");

  const [tcode, setTcode] = useState(
    splitPayment
      ? {
          code: "SPLIT",
          id: 5,
          type: "percentage",
          value: 0,
        }
      : {
          code: "IVA-22",
          id: 1,
          type: "percentage",
          value: 22,
        }
  );

  const [amount, setAmount] = useState(
    isEditSession ? invoice?.amount : invoiceCustomer?.toBeBilled
  );
  const totalAmount = tcode
    ? tcode.type === "percentage"
      ? amount + (amount * Number(tcode.value)) / 100
      : amount + Number(tcode.value)
    : amount;

  const { isCreating, createInvoice } = useCreateInvoice();
  const { isUpdating, updateInvoice } = useUpdateInvoice();

  function onSubmit(data) {
    const values = { ...data };

    if (isEditSession) {
      // UPDATE
      delete values["currencies"];
      delete values["customers"];
      delete values["invoiceStatus"];
      delete values["paymentTerms"];
      delete values["taxCodes"];
      delete values["id"];
      delete values["paymentDate"];

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
      let insValues = {
        statusId: CREATED_STATUS_ID,
        customerId,
        currencyId,
        PIVA,
        SDIcode,
        totalAmount,
        costCenterId: values.costCenterId,
        paymentTermsId: values.paymentTermsId,
        amount: values.amount,
        invoiceDate: values.invoiceDate,
        note: values.note,
        opportunity: values.opportunity,
        orderNumber: values.orderNumber,
        poNumber: values.poNumber,
        taxCodeId: values.taxCodeId,
      };
      if (values.duePaymentDate)
        insValues = { ...insValues, duePaymentDate: values.duePaymentDate };
      if (!values.taxCodeId)
        insValues = { ...insValues, taxCodeId: SPLIT_PAYMENT_ID };

      createInvoice(insValues, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  function handleReset() {
    setAmount(0);
    reset();
  }

  function handleTaxSelect(e) {
    setTcode(taxCodes.filter((t) => t.id === Number(e.target.value))[0]);
  }
  function changeAmount(e) {
    setAmount(Number(e.target.value));
  }

  const isBusy = isLoadingTaxCodes || isLoadingPaymentTerms || isLoadingCC;
  const isDisabled = isDisplay || isCreating || isUpdating;

  if (isBusy) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Customer">
        <Item>{customer}</Item>
      </FormRow>
      <FormRow label="Order Number">
        <Item>{orderNumber}</Item>
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
      <FormRow label="Tax Code" error={errors?.taxCode?.message}>
        {splitPayment ? (
          <Tag type="indigo">SPLIT</Tag>
        ) : (
          <Select
            name="taxCodeId"
            id="taxCodeId"
            valueName="id"
            labelName="code"
            //           defaultValue={invoiceDefaultValues.taxCode}
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
          register={register}
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

      <FormRow label="Due Payment Date" error={errors?.duePaymentDate?.message}>
        <Input
          type="date"
          id="duePaymentDate"
          defaultValue={addDays(new Date(), { days: 60 })}
          {...register("duePaymentDate")}
          disabled={isDisabled}
        ></Input>
      </FormRow>

      <FormRow label="Customer PO number" error={errors?.poNumber?.message}>
        <Input
          type="string"
          id="poNumber"
          defaultValue={invoiceDefaultValues.poNumber}
          {...register("poNumber")}
          disabled={isDisabled}
        />
      </FormRow>

      {isDisplay && invoice?.paymentDate && (
        <FormRow label="Payment Date">
          <Stacked id="Due Payment Date">{invoice?.paymentDate}</Stacked>
        </FormRow>
      )}

      <FormRow label="Profit Center" error={errors?.costCenterId?.message}>
        <Select
          name="costCenterId"
          id="costCenterId"
          valueName="id"
          labelName="description"
          options={costCenters}
          register={register}
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
CreateUpdateInvoice.propTypes = {
  invoiceCustomer: PropTypes.object,
  invoice: PropTypes.object,
  isDisplay: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

export default CreateUpdateInvoice;
