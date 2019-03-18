import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GiphyScroller from './GiphyScroller.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <GiphyScroller />
        </header>
      </div>
    );
  }
}

export default App;
