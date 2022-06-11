import React, { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem.js';
import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: '',
    status: 'idle',
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.search !== this.props.search ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      this.loadImages(this.props.search, this.state.page)
        .then(response => {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.hits],
            status: 'resolved',
          }));
          console.dir(response.hits);
        })
        .catch(error => this.setState({ error, status: 'error' }));
    }
  }
  loadImages(entry, page) {
    const URL = `https://pixabay.com/api/?key=26793490-dae10d4013ec617276bbdd3a4&image_type=photo&orientation=horizontal&per_page=12`;
    // this.setState(prevState=>({ page: prevState.page + 1 }));
    return fetch(`${URL}&q=${entry}&page=${page}`).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`No images of ${entry},sorry`));
    });
  }
  render() {
    if (this.state.status === 'idle') {
      return <p>waiting for search...</p>;
    }
    if (this.state.status === 'pending') {
      return <div>loader</div>;
    }
    if (this.state.status === 'resolved') {
      console.log(this.state.images);
      return (
        <ul className={s.imageGallery}>
          <ImageGalleryItem images={this.state.images} />
          {/* ImageGalleryItem ({images:this.state.images}) */}
        </ul>
      );
    }
    if (this.state.status === 'error') {
      return <h1>{this.state.error.message}</h1>;
    }
  }
}
