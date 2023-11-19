import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCreatePaymentTerm } from "./useCreatePaymentTerm";
import { useUpdatePaymentTerm } from "./useUpdatePaymentTerm";

const ButtonsDiv = styled.div`
  //font-family: "Sono";
  margin-top: 30px;
  margin-left: 8%;
  margin-right: 8%;
  display: flex;
  justify-content: space-between;
`;

export default function CreateUpdatePaymentTerm({
  paymentTerm = {},
  onCloseModal,
}) {
  const { id: editId, ...editValues } = paymentTerm;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createPaymentTerm } = useCreatePaymentTerm();
  const { isUpdating, updatePaymentTerm } = useUpdatePaymentTerm();
  const navigate = useNavigate();

  function onSubmit(data) {
    const values = { ...data };

    if (isEditSession) {
      updatePaymentTerm(
        { paymentTerm: values, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createPaymentTerm(values, {
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

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          {...register("description")}
          disabled={isDisabled}
        />
      </FormRow>

      <FormRow label="Delay" error={errors?.delay?.message}>
        <Input
          id="delay"
          type="number"
          {...register("delay")}
          disabled={isDisabled}
        />
      </FormRow>

      <FormRow label="Starting" error={errors?.starting?.message}>
        <Input
          id="starting"
          type="text"
          {...register("starting")}
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
CreateUpdatePaymentTerm.propTypes = {
  paymentTerm: PropTypes.object,
  onCloseModal: PropTypes.func,
};
