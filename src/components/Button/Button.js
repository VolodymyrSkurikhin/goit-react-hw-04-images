import React, { Component } from 'react';
import s from './Button.module.css';

export default class Button extends Component {
  handlBtn = () => {
    this.props.onClick();
  };
  render() {
    return (
      <button type="button" className={s.button} onClick={this.handlBtn}>
        Load more
      </button>
    );
  }
}
