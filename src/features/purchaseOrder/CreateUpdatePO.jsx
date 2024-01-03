import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { BiChevronLeftCircle } from "react-icons/bi";
import { format } from "date-fns";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import { useTaxCodes } from "../taxCodes/useTaxCodes";
import { usePaymentTerms } from "../paymentTerms/usePaymentTerms";
import { useCC } from "../costProfitCenters/useCC";
import { useCurrencies } from "../currencies/useCurrencies";
import { useFiscalYear } from "../settings/useFiscalYear";
import { useSuppliers } from "../suppliers/useSuppliers";
import { poDefaultValues } from "../../utils/constants";
import { useState } from "react";
import { useInsertPurchaseOrder } from "./useInsertPurchaseOrder";
import { useUpdatePurchaseOrder } from "./useUpdatePurchaseOrder";
import ButtonIcon from "../../ui/ButtonIcon";

const Item = styled.div`
  //font-family: "Sono";
  text-align: center;
  font-weight: 500;
`;

const ItemIU = styled.div`
  //font-family: "Sono";
  text-align: center;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--color-brand-600);
`;

const StyledDiv = styled.div`
  //font-family: "Sono";
  margin-right: 5%;
  display: flex;
  flex-direction: row;
  float: right;
`;

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
  display: flex;
  flex-direction: row;
`;

const StyledSpan = styled.span`
  padding: 0.8rem 1.2rem;
  max-width: 11rem;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  float: left;
`;

const InputCheck = styled.input`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-indigo-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  accent-color: var(--color-indigo-100);
  margin-left: 10px;
  transform: scale(1.2);
`;

const StyledSpanCheck = styled.span`
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  margin-left: 10px;
`;

function CreateUpdatePO({
  po = {},
  order = {},
  orderNumber = null,
  onCloseModal,
  isDisplay = false,
}) {
  const isModal = onCloseModal ? true : false;
  const { poNumber: editON, ...editValues } = po;
  const isEditSession = Boolean(editON);
  const isOrderNumber = orderNumber !== null;
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: orderNumber
      ? { orderNumber: orderNumber }
      : isEditSession
      ? editValues
      : Object.keys(order).length > 0
      ? order
      : {},
  });
  const { errors } = formState;

  const { isLoading: isLoadingCC, costCenters } = useCC("Cost");
  const { isLoading: isLoadingTaxCodes, taxCodes } = useTaxCodes();
  const { isLoading: isLoadingSuppliers, suppliers } = useSuppliers();
  const { isLoading: isLoadingCurrencies, currencies } = useCurrencies();
  const { isLoading: isLoadingPaymentTerms, paymentTerms } = usePaymentTerms();
  const { isLoading: isLoadingFY, fiscalYear: fyObj } = useFiscalYear();

  const [isInternalPO, setIsInternalPO] = useState(
    isEditSession ? editValues.internalPO : false
  );
  const [amount, setAmount] = useState(isEditSession ? po?.amount : 0);
  const [tcode, setTcode] = useState({
    code: "IVA-22",
    id: 1,
    type: "percentage",
    value: 22,
  });
  const totalAmount = tcode
    ? tcode.type === "percentage"
      ? (amount + (amount * Number(tcode.value)) / 100).toFixed(2)
      : amount + Number(tcode.value)
    : amount;

  const { isInsertingPO, insertPurchaseOrder } = useInsertPurchaseOrder();
  const { isUpdatingPO, updatePurchaseOrder } = useUpdatePurchaseOrder();
  const navigate = useNavigate();

  function onSubmit(data) {
    const values = { ...data };

    let poNum = isEditSession ? editON : values.poNumber;
    if (!poNum.includes("/")) poNum = poNum + "/" + fiscalYear;

    if (isEditSession) {
      delete values["currencies"];
      delete values["paymentTerms"];
      delete values["suppliers"];
      delete values["orders"];
      updatePurchaseOrder(
        {
          purchaseOrder: { ...values },
          poNumber: poNum,
          totalAmount: totalAmount,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal ? onCloseModal() : navigate(-1);
          },
        }
      );
    } else {
      let poData = {
        ...values,
        poNumber: poNum,
        toBePaid: values.amount,
        totalAmount: totalAmount,
      };
      if (isInternalPO) {
        delete poData["orderNumber"];
        poData = { ...poData, internalPO: true };
      } else poData = { ...poData, orderNumber: values.orderNumber };

      insertPurchaseOrder(poData, {
        onSuccess: () => {
          reset();
          onCloseModal ? onCloseModal() : navigate(-1);
        },
      });
    }
  }

  function handleReset() {
    if (isEditSession) onCloseModal ? onCloseModal() : navigate(-1);
    else {
      setAmount(0);
      reset();
    }
  }

  function changeAmount(e) {
    setAmount(Number(e.target.value));
  }

  function handleTaxSelect(e) {
    setTcode(taxCodes.filter((t) => t.id === Number(e.target.value))[0]);
  }

  const isBusy =
    isLoadingFY ||
    isLoadingSuppliers ||
    isLoadingCurrencies ||
    isLoadingTaxCodes ||
    isLoadingCC ||
    isLoadingPaymentTerms;

  //   const isDisabled = isDisplay || isCreating || isUpdating;
  const isDisabled = isDisplay || isInsertingPO || isUpdatingPO;

  if (isBusy) return <Spinner />;
  const fiscalYear = fyObj.fiscalYear;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {!isModal && (
        <FormRow>
          <StyledDiv>
            <ButtonIcon onClick={() => navigate(-1)}>
              <BiChevronLeftCircle style={{ height: "30px", width: "30px" }} />
            </ButtonIcon>
          </StyledDiv>
        </FormRow>
      )}
      <FormRow label="Purchase Order Number">
        {isEditSession ? (
          <InputON
            id="poNumber"
            defaultValue={po?.poNumber.split("/")[0]}
            disabled={true}
          />
        ) : (
          <InputON
            id="poNumber"
            {...register("poNumber", {
              required: "this field is required",
            })}
            disabled={isDisabled}
          />
        )}
        <StyledSpan>/ {fiscalYear}</StyledSpan>
      </FormRow>

      <FormRow label="Supplier" error={errors?.supplierId?.message}>
        <Select
          id="supplierId"
          name="supplierId"
          valueName="id"
          labelName="supplier"
          options={suppliers}
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
          defaultValue={poDefaultValues.currencyId}
          register={register}
          disabled={isDisabled}
        />
      </FormRow>

      <FormRow label="Tax Code" error={errors?.taxCode?.message}>
        <Select
          name="taxCodeId"
          id="taxCodeId"
          valueName="id"
          labelName="code"
          options={taxCodes}
          register={register}
          handleChange={handleTaxSelect}
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

      <FormRow label="Purchase Order Date" error={errors?.poDate?.message}>
        <Input
          type="date"
          id="poDate"
          defaultValue={format(new Date(), "yyyy-MM-dd")}
          {...register("poDate", { required: "this field is required" })}
          disabled={isDisabled}
        ></Input>
      </FormRow>

      <FormRow label="Order Number" error={errors?.orderNumber?.message}>
        {!isDisplay ? (
          <>
            <Input
              type="string"
              id="orderNumber"
              {...register("orderNumber")}
              disabled={isDisabled || isInternalPO || isOrderNumber}
            />
            {isOrderNumber ? (
              <div></div>
            ) : (
              <div>
                <InputCheck
                  type="checkbox"
                  defaultChecked={isInternalPO}
                  onClick={() =>
                    setIsInternalPO((isInternalPO) => !isInternalPO)
                  }
                />
                <StyledSpanCheck>Internal</StyledSpanCheck>
              </div>
            )}
          </>
        ) : isInternalPO ? (
          <ItemIU>Internal Use</ItemIU>
        ) : (
          <Item>{editValues.orderNumber}</Item>
        )}
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

      <FormRow label="Cost Center" error={errors?.costCenterId?.message}>
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
CreateUpdatePO.propTypes = {
  po: PropTypes.object,
  orderNumber: PropTypes.string,
  order: PropTypes.object,
  onCloseModal: PropTypes.func,
  isDisplay: PropTypes.bool,
};
export default CreateUpdatePO;
