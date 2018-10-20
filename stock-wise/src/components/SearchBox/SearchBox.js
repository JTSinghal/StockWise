<<<<<<< HEAD
import React, { Component } from 'react';
import './SearchBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { apiPost } from '../../api';


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

    handleSubmit = (event) => {
        const obj = {
            method: 'post',
            body: JSON.stringify({company: this.state.text}),
        }

        apiPost('api/symbol', {company: this.state.text})
        .then(json => {
        })
    }

    render() {
        return (
            <div className="searchBar">
                <form>
                    <input
                        className="form-control form-control-lg searchbox"
                        type="text"
                        name="stock"
                        onChange={this.handleChange}
                        value={this.state.text}
                        placeholder="Search Company..."
                    />
                </form>
                <div className="search-button">
                    <button onClick={this.handleSubmit} type="submit" value="Submit" className="btn btn-dark"><FontAwesomeIcon icon='search' /> Search</button>
                </div>

            </div>
        )

    }
}

=======
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
                placeholder="Search Ticker Symbol" 
            />
        )
    }
}

>>>>>>> fb9ad8a3d648315f297bb6aba77e0acbbd10b41d
export default SearchBox;