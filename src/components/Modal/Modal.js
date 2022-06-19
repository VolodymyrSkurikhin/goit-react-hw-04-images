import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ handleModal, children }) {
  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      handleModal();
    }
  };
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
