import React from 'react';
import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images }) => {
  console.log('images', images);
  return images.map(item => (
    <li key={item.id} className={s.imageGalleryItem}>
      <img
        className={s.imageGalleryItemImage}
        src={item.webformatURL}
        alt={item.tags}
      />
    </li>
  ));
};
