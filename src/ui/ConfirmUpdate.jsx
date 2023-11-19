import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmUpdate({ resourceName, onConfirm, disabled, onCloseModal }) {
  function handleConfirm() {
    onConfirm();
    onCloseModal();
  }

  return (
    <StyledConfirmDelete>
      <Heading as="h3">Update {resourceName}</Heading>
      <p>Are you sure you want to update {resourceName}?</p>

      <div>
        <Button
          onClick={onCloseModal}
          variation="secondary"
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button onClick={handleConfirm} variation="danger" disabled={disabled}>
          Update
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

ConfirmUpdate.propTypes = {
  resourceName: PropTypes.string,
  onConfirm: PropTypes.func,
  disabled: PropTypes.bool,
  onCloseModal: PropTypes.func,
};
export default ConfirmUpdate;
