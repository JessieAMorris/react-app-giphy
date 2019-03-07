import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import GiphyGif from './GiphyGif.js';
import axios from 'axios';
import './GiphyScroller.css';

const api = {
  baseUrl: 'https://api.giphy.com',
  apiKey: 'TpsrUJ7j34Q6VJlfXsOmTr5i2w0Y6mMW',
  limit: 25,
};

class GiphyScroller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: [],
      hasMoreItems: true,
    };
  }

  async fetchGifs(page) {
    var url = api.baseUrl + '/v1/gifs/trending';

    const response = await axios.get(url, {
      params: {
        api_key: api.apiKey,
        limit: api.limit,
        offset: page * api.limit,
      }
    });

    this.setState({
      gifs: this.state.gifs.concat(response.data.data),
      hasMoreItems: true,
    });
  }

  render() {
    var items = [];
    this.state.gifs.forEach((gif) => {
      items.push(
        <div className="GiphyScroller-item">
          <GiphyGif gif={gif} />
        </div>
      );
    });

    return (
      <div className="GiphyScrollerWrapper">
        <InfiniteScroll
            className="GiphyScroller"
            pageStart={-1}
            loadMore={this.fetchGifs.bind(this)}
            hasMore={this.state.hasMoreItems}
            loader={<div className="loader" key={0}>Loading ...</div>}
        >
            {items}
        </InfiniteScroll>
      </div>
    );
  }
}

export default GiphyScroller;
