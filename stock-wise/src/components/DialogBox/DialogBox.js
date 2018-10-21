import React, { Component } from 'react';
import './DialogBox.css';

export class DialogBox extends Component{

    constructor(props) {
        super(props);
        console.log("Test");
        this.state = {
            news: this.props.data.news,
        }
    }

    createTable(){
        let table = []
        for (let i = 0; i < this.props.data.news.length - 3; i += 2){
            let children = []
            children.push(<a href={`Object.keys(this.props.data.news)[i+1]`}><td>{`Object.keys(this.props.data.news)[i]`}</td></a>)
            table.push(<tr>{children}</tr>)
            console.log('test');
        }
        return table
    }


    render() {
        return (
            <div>
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

export default DialogBox;