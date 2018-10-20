import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
    }

    handleChange = (event) => {
        console.log('change detected');
        this.setState({
            text: event.target.value
        });
    }

    render() {
        return (
            <input 
                className="form-control form-control-lg searchbox" 
                type="text" 
                value={this.state.text}
                onChange={this.handleChange}
                placeholder="Search..." 
            />
        )
    }
}

export default SearchBox;