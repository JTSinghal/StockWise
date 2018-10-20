import React, { Component } from 'react';
import './App.css';
import SearchBox from './components/SearchBox/SearchBox.js';

class App extends Component {
  render() {
    return (
      <div className="app">
        {/* <header className="App-header">
          <p>
            StockWise
          </p>
        </header> */}
        <h1 className="app-header">StockWise</h1>
        <SearchBox />
      </div>
    );
  }
}

export default App;
