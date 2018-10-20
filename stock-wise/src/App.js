import React, { Component } from 'react';
import './App.css';
import SearchBox from './components/SearchBox/SearchBox.js';
import Footer from './components/Footer/Footer.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab)

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1 className="app-header">StockWise</h1>
        <SearchBox />
        <Footer />
      </div>
    );
  }
}

export default App;
