import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCreateCurrency } from "./useCreateCurrency";
import { useUpdateCurrency } from "./useUpdateCurrency";
import { useNavigate } from "react-router-dom";

const ButtonsDiv = styled.div`
  //font-family: "Sono";
  margin-top: 30px;
  margin-left: 8%;
  margin-right: 8%;
  display: flex;
  justify-content: space-between;
`;

export default function CreateUpdateCurrency({ currency = {}, onCloseModal }) {
  const { id: editId, ...editValues } = currency;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCurrency } = useCreateCurrency();
  const { isUpdating, updateCurrency } = useUpdateCurrency();
  const navigate = useNavigate();

  function onSubmit(data) {
    const values = { ...data };

    if (isEditSession) {
      updateCurrency(
        { currency: values, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCurrency(values, {
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
      <FormRow label="Currency" error={errors?.currency?.message}>
        <Input
          id="currency"
          {...register("currency", {
            required: "this field is required",
          })}
          disabled={isDisabled}
        />
      </FormRow>
      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          {...register("description")}
          disabled={isDisabled}
        />
      </FormRow>
      <FormRow label="Conversion Rate" error={errors?.conversionRate?.message}>
        <Input
          id="conversionRate"
          type="number"
          step="0.01"
          {...register("conversionRate")}
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
CreateUpdateCurrency.propTypes = {
  currency: PropTypes.object,
  onCloseModal: PropTypes.func,
};
