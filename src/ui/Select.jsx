import PropTypes from "prop-types";
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({
  name,
  options = {},
  labelName = "label",
  valueName = "value",
  required = false,
  handleChange,
  register,
  disabled,
}) {
  return (
    <StyledSelect
      name={name}
      id={name}
      // onChange={(e) => handleChange(e)}
      {...register(name, {
        required: required,
        onChange: (e) => handleChange(e),
      })}
      disabled={disabled}
    >
      {options.map((opt) => (
        <option value={opt[valueName]} key={opt[valueName]}>
          {opt[labelName]}
        </option>
      ))}
    </StyledSelect>
  );
}

// {errors.exampleRequired && <span className="formError errorMssg">This field is required</span>}
// value: PropTypes.string,

Select.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  labelName: PropTypes.string,
  valueName: PropTypes.string,
  required: PropTypes.bool,
  handleChange: PropTypes.func,
  register: PropTypes.func,
  disabled: PropTypes.bool,
};
export default Select;
