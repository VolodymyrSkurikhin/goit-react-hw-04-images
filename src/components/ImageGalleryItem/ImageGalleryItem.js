import React, { useState } from 'react';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ image }) {
  // state = {
  //   showModal: false,
  // };
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => setShowModal(prevState => !prevState);
  const item = image;
  return (
    <li className={s.imageGalleryItem}>
      <img
        className={s.imageGalleryItemImage}
        src={item.webformatURL}
        alt={item.tags}
        onClick={handleModal}
      />
      {showModal && (
        <Modal handleModal={handleModal}>
          <img
            className={s.largeImg}
            src={item.largeImageURL}
            alt={item.tags}
          />
        </Modal>
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
