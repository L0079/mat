import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCreateTaxCode } from "./useCreateTaxCode";
import { useUpdateTaxCode } from "./useUpdateTaxCode";
import { TAXCODE_TYPES } from "../../utils/constants";

const ButtonsDiv = styled.div`
  //font-family: "Sono";
  margin-top: 30px;
  margin-left: 8%;
  margin-right: 8%;
  display: flex;
  justify-content: space-between;
`;

export default function CreateUpdateTaxCode({ taxCode = {}, onCloseModal }) {
  const { id: editId, ...editValues } = taxCode;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createTaxCode } = useCreateTaxCode();
  const { isUpdating, updateTaxCode } = useUpdateTaxCode();
  const navigate = useNavigate();

  function onSubmit(data) {
    const values = { ...data };

    if (isEditSession) {
      updateTaxCode(
        { currency: values, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createTaxCode(values, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  function handleReset() {
    if (isEditSession) onCloseModal ? onCloseModal() : navigate(-1);
    else reset();
  }

  const isDisabled = isCreating || isUpdating;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Code" error={errors?.code?.message}>
        <Input
          id="code"
          {...register("code", {
            required: "this field is required",
          })}
          disabled={isDisabled}
        />
      </FormRow>

      <FormRow label="Type" error={errors?.type?.message}>
        <Select
          name="type"
          id="type"
          valueName="type"
          labelName="type"
          options={TAXCODE_TYPES}
          register={register}
          disabled={isDisabled}
        />
      </FormRow>

      <FormRow label="Value" error={errors?.value?.message}>
        <Input
          id="value"
          type="number"
          {...register("value")}
          disabled={isDisabled}
        />
      </FormRow>

      <ButtonsDiv>
        <Button onClick={handleReset}>
          {isEditSession ? "Cancel" : "Reset"}
        </Button>
        <Button disabled={isDisabled}>
          {isDisabled ? <SpinnerMini /> : isEditSession ? "Update" : "Create"}
        </Button>
      </ButtonsDiv>
    </Form>
  );
}
CreateUpdateTaxCode.propTypes = {
  taxCode: PropTypes.object,
  onCloseModal: PropTypes.func,
};
