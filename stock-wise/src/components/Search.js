import React, { Component } from 'react';
import './Search.css';

class Table extends Component {
    render() {
        return (
                    <input
                        placeholder="Search for..."
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                        type='search'
                    />
        )
    }
}

export default Table;