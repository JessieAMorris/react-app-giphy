import React, { Component } from 'react';
import Fullscreen from "react-full-screen";
import './GiphyGif.css';

class GiphyGif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullscreenEnabled: false,
    };
  }

  render() {
    return (
      <div class="GiphyGif-wrapper">
        <img alt={this.props.gif.title} src={this.props.gif.images.fixed_width.url} onClick={() => this.setState({isFullscreenEnabled: true})} />

        <Fullscreen
          enabled={this.state.isFullscreenEnabled}
          onChange={isFullscreenEnabled => this.setState({isFullscreenEnabled})}
        >
          <img alt={this.props.gif.title} src={this.props.gif.images.original.url} />
        </Fullscreen>
      </div>
    );
  }
}

export default GiphyGif;
