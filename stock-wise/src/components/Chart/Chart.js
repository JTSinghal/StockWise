import React, { Component } from 'react';
import './Chart.css';
import { apiPost } from '../../api';
import { Line } from 'react-chartjs-2';

var chartOptions = {
    bezierCurve: false,
    datasetFill: false,
    pointDotStrokeWidth: 4,
    scaleShowVerticalLines: false,
    responsive: true
};

var styles = {
    "graphContainer": {
        "backgroundColor": "#fff",
        "height": "235px",
        "width": "1150px",
        "marginTop": "15px",
        "padding": "20px"
    }
};


function formatDate(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return year + "-" + monthIndex + "-" + day;
}

export default class Chart extends React.Component {

    constructor(props) {
        super(props);
        const date = new Date();
        const currentDate = formatDate(date);
        console.log(this.props.data.stockPrices);
        let stockJSON = this.props.data.stockPrices;
        const length = stockJSON.length;
        const thirtyDays = [];
        for (let i = 0; i < 22; i++) {
            thirtyDays[i] = Object.keys(stockJSON)[i];
        }
        for (let i = 0; i < 11; i++) {
            let temp = thirtyDays[i];
            thirtyDays[i] = thirtyDays[21 - i]
            thirtyDays[21 - i] = temp;
        }

        let stockMonth = [];
        for (let i = 71; i < 101; i++) {
            stockMonth.push(parseFloat(stockJSON[Object.keys(stockJSON)[Object.keys(stockJSON).length - i]]['5. adjusted close']));
        }
        console.log(stockMonth);
        const prices = [];
        for (var key in stockJSON) {
            prices.push(key['5. adjusted close'])
        }
        this.state = {
            date: currentDate,
            company: this.props.data.company,
            stockPrice: stockJSON,
            chartData: {
                labels: thirtyDays,
                datasets: [
                    {
                        backgroundColor: 'rgba(255, 128, 128, 0.5)',
                        data: stockMonth,
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                 },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontSize: 12,
                                fontColor: 'white',
                            },
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontSize: 12,
                                fontColor: 'white',
                            },
                        }
                    ]
                }
            }

        }

    }

    handleClick = (event) => {
        this.setState({
            /*
            When the user changes the date on the graph, change the date state
            date: 
            */
        });
    }

    handleSubmit = (event) => {
        apiPost('api/pastNews', { company: this.state.company, date: this.state.date })
            .then(json => {
                /*Here is all the financial data*/
                console.log(json);
            })
    }



    render() {
        return <Line data={this.state.chartData} options={this.state.options} height={500} width={700}></Line>
    }
}

