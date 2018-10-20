import React, { Component } from 'react';
import './App.css';
import Search from './components/Search.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            StockWise
          </p>
        </header>
        <Search />
      </div>
    );
  }
}

export default App;
