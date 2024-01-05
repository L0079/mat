import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { format, add as addDays } from "date-fns";
import { BiChevronLeftCircle } from "react-icons/bi";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import ButtonIcon from "../../ui/ButtonIcon";
import { useCreateOtherCost } from "./useCreateOtherCost";
import { useUpdateOtherCost } from "./useUpdateOtherCost";
import { useSuppliersNoPage } from "../suppliers/useSuppliersNoPage";
import { useCC } from "../costProfitCenters/useCC";
import { useCurrencies } from "../currencies/useCurrencies";
import { useDocumentTypes } from "./useDocumentTypes";
import {
  OTHER_COSTS_CREATED_STATUS_ID,
  OTHER_COSTS_DEFAULT_DOC,
} from "../../utils/constants";

const StyledDiv = styled.div`
  //font-family: "Sono";
  margin-right: 5%;
  display: flex;
  flex-direction: row;
  float: right;
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

function CreateUpdateOtherCosts({
  otherCost = {},
  isDisplay = false,
  onCloseModal,
}) {
  const isModal = onCloseModal ? true : false;
  const navigate = useNavigate();
  // if purchaseOrder exist, it is a new payable invoice that has to be created

  const { documentTypeId, costCenterId, supplierId, currencyId } = otherCost;

  const isEditSession = Object.keys(otherCost).length > 0;
  const editId = isEditSession ? otherCost?.id : null;
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? otherCost : {},
  });
  const { errors } = formState;

  const { isLoading: isLoadingDocTypes, documentTypes } = useDocumentTypes();
  const { isLoading: isLoadingCC, costCenters } = useCC("Cost");
  const { isLoading: isLoadingSuppliers, suppliers } = useSuppliersNoPage();
  const { isLoading: isLoadingCurrencies, currencies } = useCurrencies();

  const [amount, setAmount] = useState(isEditSession ? otherCost?.amount : 0);
  const [taxes, setTaxes] = useState(
    otherCost?.taxes
      ? otherCost.taxes
      : isEditSession
      ? otherCost?.totalAmount - otherCost?.amount
      : 0
  );
  const totalAmount = amount + taxes;

  const { isCreating, createOtherCost } = useCreateOtherCost();
  const { isUpdating, updateOtherCost } = useUpdateOtherCost();

  function onSubmit(data) {
    const values = { ...data };
    if (isEditSession) {
      //  UPDATE
      delete values["currencies"];
      delete values["otherCostsDocTypes"];
      delete values["otherCostsStatus"];
      delete values["suppliers"];
      updateOtherCost(
        { otherCost: { ...values, totalAmount: totalAmount }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createOtherCost(
        {
          ...values,
          statusId: OTHER_COSTS_CREATED_STATUS_ID,
          totalAmount: totalAmount,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
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

  const isBusy =
    isLoadingDocTypes ||
    isLoadingCC ||
    isLoadingSuppliers ||
    isLoadingCurrencies;
  const isDisabled = isDisplay || isCreating || isUpdating;

  if (isBusy) return <Spinner />;

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
      <FormRow label="Supplier">
        <Select
          name="supplierId"
          id="supplierId"
          defaultValue={supplierId}
          valueName="id"
          labelName="supplier"
          options={suppliers}
          register={register}
          disabled={isDisabled}
        />
      </FormRow>
      <FormRow label="Note" error={errors?.note?.message}>
        <Textarea id="note" {...register("note")} disabled={isDisabled} />
      </FormRow>

      <FormRow label="Document Number" error={errors?.documentNumber?.message}>
        <Input
          type="text"
          id="documentNumber"
          {...register("documentNumber")}
          disabled={isDisabled}
        />
        <ShortDiv>
          <Select
            name="documentTypeId"
            id="documentTypeId"
            defaultValue={
              documentTypeId ? documentTypeId : OTHER_COSTS_DEFAULT_DOC
            }
            valueName="id"
            labelName="description"
            options={documentTypes}
            register={register}
            disabled={isDisabled}
          />
        </ShortDiv>
      </FormRow>

      <FormRow label="Document Date" error={errors?.documentDate?.message}>
        <Input
          type="date"
          id="documentDate"
          defaultValue={format(new Date(), "yyyy-MM-dd")}
          {...register("documentDate", { required: "this field is required" })}
          disabled={isDisabled}
        ></Input>
      </FormRow>

      <FormRow label="Amount" error={errors?.amount?.message}>
        <Input
          type="number"
          id="amount"
          step="0.01"
          {...register("amount", {
            required: "this field is required",
            onChange: (e) => {
              changeAmount(e);
            },
          })}
          disabled={isDisabled}
        />
        <ShortDiv>
          <Select
            name="currencyId"
            id="currencyId"
            defaultValue={currencyId}
            valueName="id"
            labelName="currency"
            options={currencies}
            register={register}
            disabled={isDisabled}
          />
        </ShortDiv>
      </FormRow>

      <FormRow label="Taxes">
        <Input
          type="number"
          step="0.01"
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
          step="0.01"
          id="totalAmount"
          value={totalAmount}
          disabled={true}
        />
      </FormRow>

      <FormRow label="Due Payment Date" error={errors?.duePaymentDate?.message}>
        <Input
          type="date"
          id="duePaymentDate"
          defaultValue={format(addDays(new Date(), { days: 60 }), "yyyy-MM-dd")}
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

      {!isDisplay && (
        <ButtonsDiv>
          <Button onClick={handleReset}>
            {isEditSession ? "Cancel" : "Reset"}
          </Button>
          <Button disabled={isDisabled}>
            {isEditSession ? "Update" : "Create"}
          </Button>
        </ButtonsDiv>
      )}
    </Form>
  );
}
CreateUpdateOtherCosts.propTypes = {
  otherCost: PropTypes.object,
  isDisplay: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

export default CreateUpdateOtherCosts;
