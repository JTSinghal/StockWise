import React, { Component } from 'react';
import './SearchBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { apiPost } from '../../api';
import Chart from '../Chart/Chart.js';

class SearchBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            stockPrices: [],
            showComponent: false,
        }
    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value,
        });
    }

    handleSubmit = (event) => {
        if (this.state.showComponent){
            this.setState({showComponent: false});
        }

        apiPost('api/symbol', { company: this.state.text })
            .then(json => {
                /*Here is all the financial data*/
                this.setState({stockPrices: json['Time Series (Daily)']});
            })
            .then(price => {
                this.setState({showComponent: true});
            }
            )
        this.forceUpdate();
        
    }

    render() {
        return (
            <div>
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
                {this.state.showComponent ?
                <Chart data={this.state} /> :
                null
                }
                
            </div>
        )

    }
}

export default SearchBox;