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
      searchTerm: "",
      gifs: [],
      hasMoreItems: true,
    };
  }

  async fetchGifs(page) {
    let gifs;
    if(this.state.searchTerm === "") {
      gifs = await this.fetchTrending(page);
    } else {
      gifs = await this.fetchSearch(page);
    }

    let hasMoreItems = false;
    if(gifs.pagination.count) {
      hasMoreItems = true;
    }

    this.setState({
      searchTerm: this.state.searchTerm,
      gifs: this.state.gifs.concat(gifs.data),
      hasMoreItems: hasMoreItems,
    });
  }

  async fetchTrending(page) {
    var url = api.baseUrl + '/v1/gifs/trending';

    const response = await axios.get(url, {
      params: {
        api_key: api.apiKey,
        limit: api.limit,
        offset: page * api.limit,
      }
    });

    return response.data;
  }

  async fetchSearch(page) {
    var url = api.baseUrl + '/v1/gifs/search';

    const response = await axios.get(url, {
      params: {
        api_key: api.apiKey,
        limit: api.limit,
        offset: page * api.limit,
        q: this.state.searchTerm,
      }
    });

    return response.data;
  }

  searchChange(e) {
    const ele = e.currentTarget;
    const searchTerm = ele.value;

    this.setState({
      searchTerm: searchTerm,
      gifs: [],
      hasMoreItems: true,
    });

    this.fetchGifs(0);
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
        <input type="search" onChange={this.searchChange.bind(this)} placeholder="Search for a Giph" />
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
