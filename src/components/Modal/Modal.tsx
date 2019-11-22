import React from 'react';
import * as ReactModal from 'react-modal';

export interface ModalProps {
  showModal: boolean;
  closeModal: Function;
  children: React.ReactNode;
}

ReactModal.default.setAppElement('#root');

const Modal = (props: ModalProps) => {
  const modalProps:ReactModal.Props = {
    isOpen: props.showModal,
    onRequestClose: (e: React.MouseEvent) => props.closeModal(),
    shouldCloseOnOverlayClick: true,
  };

  return (
      <ReactModal.default {...modalProps}>
        {props.children}
      </ReactModal.default>
  );
}

export default Modal;