import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import "./ModalComponent.scss";

type PropsType = {
  isOpen: boolean;
  onClose(): void;
  children: React.ReactNode;
};

const ModalComponent: React.FC<PropsType> = observer((props) => {
  const { isOpen, onClose, children } = props;
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
});

export default ModalComponent;
