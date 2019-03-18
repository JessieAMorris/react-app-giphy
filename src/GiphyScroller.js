import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import GiphyGif from './GiphyGif.js';
import axios from 'axios';
import _ from 'lodash';
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
      page: 0,
    };
  }

  async fetchGifs() {
    // Time limitations (i.e. broken things):
    // - Previous searches aren't cancelled
    // - Searches cause future request paging to go a bit crazy
    // - Search function isn't debounced at all
    let gifs;
    if(this.state.searchTerm === "") {
      gifs = await this.fetchTrending();
    } else {
      gifs = await this.fetchSearch();
    }

    let hasMoreItems = false;
    if(gifs.pagination.count) {
      hasMoreItems = true;
    }

    this.setState({
      searchTerm: this.state.searchTerm,
      gifs: this.state.gifs.concat(gifs.data),
      hasMoreItems: hasMoreItems,
      page: this.state.page + 1,
    });
  }

  async fetchTrending() {
    var url = api.baseUrl + '/v1/gifs/trending';

    const response = await axios.get(url, {
      params: {
        api_key: api.apiKey,
        limit: api.limit,
        offset: this.state.page * api.limit,
      }
    });

    return response.data;
  }

  async fetchSearch() {
    var url = api.baseUrl + '/v1/gifs/search';

    const response = await axios.get(url, {
      params: {
        api_key: api.apiKey,
        limit: api.limit,
        offset: this.state.page * api.limit,
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
      page: 0,
    });

    this.fetchGifs();
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
