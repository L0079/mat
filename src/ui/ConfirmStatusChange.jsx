import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmChange = styled.div`
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

function ConfirmStatusChange({
  resourceName,
  newStatus,
  onConfirm,
  disabled,
  onCloseModal,
}) {
  function handleConfirm() {
    onConfirm();
    onCloseModal();
  }

  return (
    <StyledConfirmChange>
      <Heading as="h3">Updating {resourceName}</Heading>
      <p>
        Are you sure you want to set the status of {resourceName} to {newStatus}
        ? This action cannot be undone.
      </p>

      <div>
        <Button
          onClick={onCloseModal}
          variation="secondary"
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button onClick={handleConfirm} variation="danger" disabled={disabled}>
          {newStatus}
        </Button>
      </div>
    </StyledConfirmChange>
  );
}

ConfirmStatusChange.propTypes = {
  resourceName: PropTypes.string,
  newStatus: PropTypes.string,
  onConfirm: PropTypes.func,
  disabled: PropTypes.bool,
  onCloseModal: PropTypes.func,
};
export default ConfirmStatusChange;
