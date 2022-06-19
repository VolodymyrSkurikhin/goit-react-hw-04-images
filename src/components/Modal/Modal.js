import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ handleModal, children }) {
  const handleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        handleModal();
      }
    },
    [handleModal]
  );
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      handleModal();
    }
  };
  return createPortal(
    <div className={s.overlay} onClick={handleBackDropClick}>
      <div className={s.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  handleModal: PropTypes.func,
};
