import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem.js';
import Button from '../Button/Button.js';
import { Puff } from 'react-loader-spinner';
import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: '',
    hits: 0,
    status: 'idle',
  };
  componentDidUpdate(prevProps, prevState) {
    let page = this.state.page;
    if (prevProps.search !== this.props.search) {
      this.setState({ page: 1, images: [] });
      page = 1;
    }
    if (
      prevProps.search !== this.props.search ||
      prevState.page < this.state.page
    ) {
      this.setState({ status: 'pending' });
      this.loadImages(this.props.search, page)
        .then(response => {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.hits],
            status: 'resolved',
            hits: response.hits.length,
          }));
          console.dir(response.hits);
        })
        .catch(error => this.setState({ error, status: 'error' }));
    }
  }
  loadImages(entry, page) {
    const URL = `https://pixabay.com/api/?key=26793490-dae10d4013ec617276bbdd3a4&image_type=photo&orientation=horizontal&per_page=12`;
    return fetch(`${URL}&q=${entry}&page=${page}`).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`No images of ${entry},sorry`));
    });
  }
  onClickButton = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    if (this.state.status === 'idle') {
      return <p>waiting for search...</p>;
    }
    if (this.state.status === 'pending') {
      return (
        <div className={s.loader}>
          <Puff color="#00BFFF" height={80} width={80} />
        </div>
      );
    }
    if (this.state.status === 'resolved') {
      console.log(this.state.images);
      return (
        <div className={s.container}>
          <ul className={s.imageGallery}>
            {this.state.images.map(image => (
              <ImageGalleryItem image={image} key={image.id} />
            ))}
          </ul>

          {this.state.hits >= 12 && <Button onClick={this.onClickButton} />}
        </div>
      );
    }
    if (this.state.status === 'error') {
      return <h1>{this.state.error.message}</h1>;
    }
  }
}
