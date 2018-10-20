import React, { Component } from 'react';
import './Chart.css';
import { apiPost } from '../../api';
import Moment from 'react-moment';

class Chart extends Component {

    constructor(props) {
        const currentDate = Moment (new Date ()).format("MM/DD/YYYY");
        super(props);
        this.state = {
            date: new Date,
            company: this.props.data.company,
        }
    }

    handleChange = (event) => {
        this.setState({
            /*
            When the user changes the date on the graph, change the date state
            date: 
            */
        });
    }

    handleSubmit = (event) => {
        apiPost('api/pastNews', {company:this.state.company, date: this.state.date})
        .then(json => {
            /*Here is all the financial data*/
            console.log(json);
        })
    }
}

export default Chart;