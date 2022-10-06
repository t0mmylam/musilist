import React from "react";
import ReactDOM from "react-dom";
import { Form } from "../Form/form";
import FocusTrap from "focus-trap-react";
export const Modal = ({
  onClickOutside,
  onKeyDown,
  modalRef,
  buttonRef,
  closeModal,
  onSubmit,
}) => {
  return ReactDOM.createPortal(
    <FocusTrap>
      <aside
        tag="aside"
        role="dialog"
        tabIndex="-1"
        aria-model="true"
        className="modal-cover"
        onClick={onClickOutside}
        onKeyDown={onKeyDown}
      >
        <div className="modal-area" ref={modalRef}>
          <button
            ref={buttonRef}
            aria-label="Close Modal"
            aria-labelledby="close-modal"
            className="_modal-close"
            onClick={closeModal}
          >
            <span id="close-modal" className="_hide-visual">
              Close
            </span>
          </button>
          <div className="modal-body">
            <Form onSubmit={onSubmit} />
          </div>
        </div>
      </aside>
    </FocusTrap>
  );
};

export default Modal;
