import Button from "../Button";

import "./ConfirmModal.scss";

interface IConfirmModal {
  confirmCallback(): void;
  closeCallback(): void;
  confirmTxt?: string;
  rejectTxt?: string;
  text?: string;
  children?: React.ReactNode;
}

const ConfirmModal = ({
  text,
  confirmCallback,
  closeCallback,
  children,
  confirmTxt,
  rejectTxt,
}: IConfirmModal) => {
  return (
    <div className="confirm-modal-wrapper">
      <div className="confirm-content-wrapper">
        {children ? children : <p className="confirm-modal-header">{text}</p>}
        <Button callback={confirmCallback}>
          {confirmTxt ? confirmTxt : "yes"}
        </Button>
        <Button callback={closeCallback} styles="reject-button">
          {rejectTxt ? rejectTxt : "no"}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmModal;
