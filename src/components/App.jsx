import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default function App() {
  // state = {
  //   search: '',
  // };
  const [search, setSearch] = useState('');

  const handlSearch = search => setSearch(search);

  return (
    <div
      style={{
        height: '100vh',
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Searchbar onSubmit={handlSearch} />
      <ImageGallery search={search} />
      <ToastContainer autoClose={3000} />
    </div>
  );
}
