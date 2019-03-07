import React, { Component } from 'react';
import './GiphyGif.css';

class GiphyGif extends Component {
  render() {
    return (
      <img alt={this.props.gif.title} src={this.props.gif.images.fixed_width.url} />
    );
  }
}

export default GiphyGif;
