import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "thin" &&
    css`
      padding: 0.5rem 1rem 0.5rem 0;
    `}

    ${(props) =>
    props.type === "medium" &&
    css`
      padding: 2rem;
      margin-right: 5rem;
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = { type: "regular" };

export default Form;
