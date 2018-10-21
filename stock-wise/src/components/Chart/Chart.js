import React, { Component } from 'react';
import './Chart.css';
import { apiPost } from '../../api';
import { Line } from 'react-chartjs-2';
import { DialogBox } from '../DialogBox/DialogBox.js';

/* eslint no-undef: 0 */ // --> OFF

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
        const self = this;
        const date = new Date();
        const currentDate = formatDate(date);
        let stockJSON = this.props.data.stockPrices;
        var companyName = this.props.data.text;
        const length = stockJSON.length;
        const thirtyDays = [];
        let headlines = 1;

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
        const prices = [];
        for (var key in stockJSON) {
            prices.push(key['5. adjusted close'])
        }
        this.state = {
            news: [],
            showComponent: false,
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
                onClick: function (evt) {
                    var element = this.getElementAtEvent(evt);
                    if (element.length == 1) {
                        const day = thirtyDays[element['0']['_index']];
                        apiPost('api/pastNews', { company: companyName, day: day })
                            .then(json => {
                                /*Here is all the financial data*/
                                /*
                                console.log(json);
                                console.log("This time shows a " + json[Object.keys(json)[Object.keys(json).length - 2]] + " sentiment for the stock, with a " + json[Object.keys(json)[Object.keys(json).length - 1]] + " confidence level.");
                                */
                                console.log("\nSome notable headlines from ths time include:\n");
                                //let headlinesLog = []
                                //self.headlines = this.json;
                                //console.log(headlines);
                                //self.getHeadlines(headlines);
                                for (let i = 0; i < Object.keys(json).length - 3; i += 2) { 
                                    //children.push(<a href={`Object.keys(this.news)[i+1]`}><td>{`Object.keys(this.news)[i]`}</td></a>)
                                    console.log(json[Object.keys(json)[i]]);

                                }
                            })
                        /*
                        Chart.setState({news: this.json});
                        */
                    }
                },

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
            },
        }

    }
    
    createTable() {
        /*
        let table = []
        for (let i = 0; i < this.headlines.length - 3; i += 2) {
            let children = []
            children.push(<a href={Object.keys(headlines)[i+1]}><td>{Object.keys(headlines)[i]}</td></a>)
            table.push(<tr>{children}</tr>)
            console.log('test');
        }
        return table
        */
    }
    

    handleSubmit = (event) => {
        if (this.state.showComponent) {
            this.setState({ showComponent: false });
        }
        else {
            this.setState({ showComponent: true });
        }

        this.forceUpdate();

        console.log(this.state.news);
    }
    /*
    getHeadlines(headlines) {
        console.log('trying to get headlines');
        if (headlines != null) {
            console.log('headlines: ' + headlines);
        }
    }
    */


    render() {
        return (
            <div>
                <Line id="lineChart" data={this.state.chartData} options={this.state.options} height={500} width={700}></Line>
                <div className="search-button">
                    <button onClick={this.handleSubmit} type="submit" value="Submit" className="btn btn-dark">Show News</button>
                </div>
                <div id="DialogBox">
                    <h1 id="sentiment"></h1>
                    <table>
                        {this.createTable()}
                    </table>
                </div>
            </div>
        )
    }

}