import React, { useState, useEffect } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem.js';
import Button from '../Button/Button.js';
import { Puff } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

export default function ImageGallery({ search }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [hits, setHits] = useState(0);
  const [status, setStatus] = useState('idle');
  const [loadedSearch, setLoadedSearch] = useState('');
  const [loadedPage, setLoadedPage] = useState();

  useEffect(() => {
    setPage(1);
    setImages([]);
  }, [search]);
  useEffect(() => {
    if (search === '') {
      setPage(1);
      setImages([]);
      setStatus('idle');
      return;
    }
    if (loadedSearch !== search && page !== 1) {
      return;
    }
    if (loadedSearch === search && loadedPage === page) {
      return;
    }
    setStatus('pending');
    loadImages(search, page)
      .then(response => {
        if (response.hits.length === 0) {
          return Promise.reject(new Error(`No images of ${search}, sorry`));
        }
        setLoadedSearch(search);
        setLoadedPage(page);
        setImages(prevState => [...prevState, ...response.hits]);
        setStatus('resolved');
        setHits(response.hits.length);
        // showLoader: !prevState.showLoader,
        console.log(response.hits.length);
      })
      .catch(error => {
        setError('error');
        setStatus('status');
      });
  }, [page, search, loadedSearch, loadedPage]);

  function loadImages(entry, pageP) {
    const URL = `https://pixabay.com/api/?key=26793490-dae10d4013ec617276bbdd3a4&image_type=photo&orientation=horizontal&per_page=12`;
    return fetch(`${URL}&q=${entry}&page=${pageP}`).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`No images of ${entry}, sorry`));
    });
  }
  const onClickButton = () => setPage(prevState => prevState + 1);

  if (status === 'idle') {
    return <p>waiting for search...</p>;
  }
  if (status === 'error') {
    return <h1 className={s.errorMessage}>{error.message}</h1>;
  }
  return (
    <>
      {status === 'pending' && (
        <div className={s.loader}>
          <Puff color="#00BFFF" height={80} width={80} />
        </div>
      )}
      <div className={s.container}>
        <ul className={s.imageGallery}>
          {images.map(image => (
            <ImageGalleryItem image={image} key={image.id} />
          ))}
        </ul>
        {hits >= 12 && status === 'resolved' && (
          <Button onClick={onClickButton} />
        )}
      </div>
    </>
  );
}

ImageGallery.propTypes = {
  search: PropTypes.string,
};
