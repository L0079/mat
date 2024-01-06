import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import ButtonIcon from "./ButtonIcon";
import styled, { css } from "styled-components";

import Form from "./Form";
import Input from "./Input";
import FormRow from "./FormRow";
import { useFiscalYear } from "../features/settings/useFiscalYear";
import SpinnerMini from "./SpinnerMini";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

function SearchFilter({ filterField, label }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit, reset, formState } = useForm({});
  const { isLoading, fiscalYear: fyObj } = useFiscalYear();

  if (isLoading) return <SpinnerMini />;
  const fiscalYear = fyObj.fiscalYear;

  function onSubmit(val) {
    let value = val.value;
    if (value) {
      if ((filterField === "poNumber" || "orderNumber" || "invoiceNumber") && !value.includes("/"))
        value = value + "/" + fiscalYear;
      searchParams.set(filterField, value);
      if (searchParams.get("page")) searchParams.set("page", 1);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(filterField);
      setSearchParams(searchParams);
    }
  }

  return (
    <StyledFilter>
      <Form type="thin" onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <Input type="text" id="value" placeholder={label} {...register("value")} />
          <ButtonIcon>
            <FaSearch />
          </ButtonIcon>
        </FormRow>
      </Form>
    </StyledFilter>
  );
}

SearchFilter.propTypes = {
  filterField: PropTypes.string,
  mod: PropTypes.string,
  label: PropTypes.string,
};
export default SearchFilter;
