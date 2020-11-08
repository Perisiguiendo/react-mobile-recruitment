import React, { Component } from 'react';
import './index.css';
import ImgSrc from './Logo.png'

export default class Logo extends Component {
  render() {
    return (
      <div className="logo__container">
        <img src={ImgSrc} alt="logo"/>
      </div>
    )
  }
}
