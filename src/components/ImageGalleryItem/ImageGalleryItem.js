import React, { Component } from 'react';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  handleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };
  render() {
    const item = this.props.image;
    return (
      <li className={s.imageGalleryItem}>
        <img
          className={s.imageGalleryItemImage}
          src={item.webformatURL}
          alt={item.tags}
          onClick={this.handleModal}
        />
        {this.state.showModal && (
          <Modal handleModal={this.handleModal}>
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
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
