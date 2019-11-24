import React from 'react';
import * as ReactModal from 'react-modal';
import './Modal.css';

export interface ModalProps {
  showModal: boolean;
  closeModal: Function;
  children: React.ReactNode;
  title: string;
}

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    color: 'lightsteelblue'
  }
}

ReactModal.default.setAppElement('#root');

const Modal = (props: ModalProps) => {
  const modalProps:ReactModal.Props = {
    isOpen: props.showModal,
    onRequestClose: (e: React.MouseEvent) => props.closeModal(),
    shouldCloseOnOverlayClick: true,
    closeTimeoutMS: 250,
    className: "Modal",
    style: modalStyles
  };

  return (
      <ReactModal.default {...modalProps}>
        <h3 className="modal-title">{props.title}</h3>
        {props.children}
      </ReactModal.default>
  );
}

export default Modal;