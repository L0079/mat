import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCreateCC } from "./useCreateCC";
import { useUpdateCC } from "./useUpdateCC";
import { useNavigate } from "react-router-dom";
import { COSTCENTER_TYPES } from "../../utils/constants";

const ButtonsDiv = styled.div`
  //font-family: "Sono";
  margin-top: 30px;
  margin-left: 8%;
  margin-right: 8%;
  display: flex;
  justify-content: space-between;
`;

export default function CreateUpdateCC({ costCenter = {}, onCloseModal }) {
  const { id: editId, ...editValues } = costCenter;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCC } = useCreateCC();
  const { isUpdating, updateCC } = useUpdateCC();
  const navigate = useNavigate();

  function onSubmit(data) {
    const values = { ...data };

    if (isEditSession) {
      updateCC(
        { costCenter: values, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCC(values, {
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
      <FormRow label="Cost Center" error={errors?.costCenter?.message}>
        <Input
          id="costCenter"
          {...register("costCenter", {
            required: "this field is required",
          })}
          disabled={isDisabled}
        />
      </FormRow>

      <FormRow label="Type" error={errors?.description?.message}>
        <Select
          name="type"
          id="type"
          valueName="type"
          labelName="type"
          options={COSTCENTER_TYPES}
          register={register}
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
CreateUpdateCC.propTypes = {
  costCenter: PropTypes.object,
  onCloseModal: PropTypes.func,
};
