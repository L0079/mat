import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { BiChevronLeftCircle } from "react-icons/bi";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import { usePaymentTerms } from "../paymentTerms/usePaymentTerms";
import { useCreateSupplier } from "./useCreateSupplier";
import { useUpdateSupplier } from "./useUpdateSupplier";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "../../ui/ButtonIcon";
import { useSuppliers } from "./useSuppliers";

const StyledDiv = styled.div`
  //font-family: "Sono";
  margin-right: 5%;
  display: flex;
  flex-direction: row;
  float: right;
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

const InputZIP = styled.input`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  max-width: 8rem;
`;

const ButtonsDiv = styled.div`
  //font-family: "Sono";
  margin-top: 30px;
  margin-left: 8%;
  margin-right: 8%;
  display: flex;
  justify-content: space-between;
`;

export default function CreateUpdateSupplier({ supplier = {}, isDisplay = false, onCloseModal }) {
  const isModal = onCloseModal ? true : false;
  const { id: editId, ...editValues } = supplier;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreatingSupplier, createSupplier } = useCreateSupplier();
  const { isUpdatingSupplier, updateSupplier } = useUpdateSupplier();
  const navigate = useNavigate();

  const [isGroup, setIsGroup] = useState(isEditSession ? editValues.group : false);
  const [isParentCompany, setIsParentCompany] = useState(isEditSession ? editValues.parentCompany : false);

  function onSubmit(data) {
    let values = { ...data, group: isGroup };

    if (isGroup) {
      values = { ...values, parentCompany: isParentCompany };
      if (isParentCompany) values = { ...values, parentCompanyId: null };
    } else values = { ...values, parentCompany: false, parentCompanyId: null };

    if (!values.zip) delete values["zip"];
    else values = { ...values, zip: Number(values.zip) };

    if (isEditSession) {
      delete values["paymentTerms"];
      delete values["created_at"];
      updateSupplier(
        { supplier: values, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createSupplier(
        { ...values },
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
    if (isEditSession) onCloseModal ? onCloseModal() : navigate(-1);
    else reset();
  }

  const { isLoading: isLoadingPaymentTerms, paymentTerms } = usePaymentTerms();
  const { isLoading: isLoadingSuppliers, suppliers } = useSuppliers();
  const isDisabled = isDisplay || isCreatingSupplier || isUpdatingSupplier;

  if (isLoadingPaymentTerms || isLoadingSuppliers) return <Spinner />;

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
      <FormRow label="Supplier Name" error={errors?.supplier?.message}>
        <Input
          id="supplier"
          {...register("supplier", {
            required: "this field is required",
          })}
          disabled={isDisabled}
        />
      </FormRow>
      <FormRow label="P.IVA" error={errors?.PIVA?.message}>
        <Input type="text" id="PIVA" {...register("PIVA")} disabled={isDisabled} />
      </FormRow>

      <FormRow label="SDI code" error={errors?.SDIcode?.message}>
        <Input type="text" id="SDIcode" {...register("SDIcode")} disabled={isDisabled} />
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

      <FormRow label="Address" error={errors?.address?.message}>
        <Input type="text" label="Address" id="address" {...register("address")} disabled={isDisabled} />
      </FormRow>
      <FormRow label="City" error={errors?.address?.message}>
        <Input type="text" id="city" {...register("city")} disabled={isDisabled} />
        <InputZIP placeholder="ZIP" type="number" label="ZIP" id="zip" {...register("zip")} disabled={isDisabled} />
      </FormRow>
      <FormRow label="State" error={errors?.state?.message}>
        <Input type="text" id="state" {...register("state")} disabled={isDisabled} />
      </FormRow>
      <FormRow label="Bank details" error={errors?.emailAddress?.message}>
        <Input type="bankDetails" id="bankDetails" {...register("bankDetails")} disabled={isDisabled} />
      </FormRow>
      <FormRow label="Email address" error={errors?.emailAddress?.message}>
        <Input
          type="email"
          id="emailAddress"
          {...register("emailAddress", {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
          disabled={isDisabled}
        />
      </FormRow>
      <FormRow label="Phone number" error={errors?.phoneNumber?.message}>
        <Input
          type="tel"
          id="phoneNumber"
          {...register(
            "phoneNumber"
            // ,{
            //   pattern: {
            //     value:
            //       /\+?1?\s*\(?-*\.*(\d{3})\)?\.*-*\s*(\d{3})\.*-*\s*(\d{4})$/,
            //     message: "Please provide a valid phone number",
            //   },
            // }
          )}
          disabled={isDisabled}
        />
      </FormRow>
      <FormRow label="Web Site" error={errors?.webSite?.message}>
        <Input type="text" id="webSite" {...register("webSite")} disabled={isDisabled} />
      </FormRow>

      <FormRow label="Group">
        <div>
          <InputCheck
            type="checkbox"
            defaultChecked={isGroup}
            onClick={() => setIsGroup((isGroup) => !isGroup)}
            disabled={isDisabled}
          />
          <StyledSpanCheck>is part of a Group</StyledSpanCheck>
        </div>
      </FormRow>
      {isGroup ? (
        <FormRow label="Parent Company" error={errors?.state?.message}>
          {isParentCompany ? null : (
            <Select
              name="parentCompanyId"
              id="parentCompanyId"
              valueName="id"
              labelName="supplier"
              options={suppliers}
              register={register}
              disabled={isDisabled}
            />
          )}
          <div>
            <InputCheck
              type="checkbox"
              defaultChecked={isParentCompany}
              onClick={() => setIsParentCompany((isParentCompany) => !isParentCompany)}
              disabled={isDisabled}
            />
            <StyledSpanCheck> is the parent company</StyledSpanCheck>
          </div>
        </FormRow>
      ) : (
        <div></div>
      )}
      {!isDisplay && (
        <ButtonsDiv>
          <Button onClick={handleReset}>{isEditSession ? "Cancel" : "Reset"}</Button>
          <Button disabled={isDisabled}>{isDisabled ? <SpinnerMini /> : isEditSession ? "Update" : "Create"}</Button>
        </ButtonsDiv>
      )}
    </Form>
  );
}
CreateUpdateSupplier.propTypes = {
  supplier: PropTypes.object,
  isDisplay: PropTypes.bool,
  onCloseModal: PropTypes.func,
};
