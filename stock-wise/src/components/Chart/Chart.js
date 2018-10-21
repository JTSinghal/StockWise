import React, { Component } from 'react';
import './Chart.css';
import { apiPost } from '../../api';

function formatDate(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return year + "-" + monthIndex + "-" + day;
  }

class Chart extends Component {

    constructor(props) {
        super(props);
        const date = new Date();
        const currentDate = formatDate(date);

        this.state = {
            date: currentDate,
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

    render (){
        return(
            <div>

            </div>
        )
    }
}

export default Chart;