import Button from "../Button";

import "./ConfirmModal.scss";

interface IConfirmModal {
  text: string;
  confirmCallback(): void;
  closeCallback(): void;
}

const ConfirmModal = ({
  text,
  confirmCallback,
  closeCallback,
}: IConfirmModal) => {
  return (
    <div className="confirm-modal-wrapper">
      <div className="confirm-content-wrapper">
        <p className="confirm-modal-header">{text}</p>
        <Button callback={closeCallback}>no</Button>
        <Button callback={confirmCallback} styles="confirm-button">
          yes
        </Button>
      </div>
    </div>
  );
};

export default ConfirmModal;
