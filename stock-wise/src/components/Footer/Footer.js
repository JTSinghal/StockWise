import React, { Component } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Footer extends Component {
    render() {
        return(
            <div className = "footerDiv">
            <p className="footerText">Made by Noah Alderton, Zachory Birenbaum, Vidhur Kumar, and JT Singhal for Boilermake 2018.
                <br></br>
                Powered by <a href="https://newsapi.org/">News API</a>
                <br></br>
                <FontAwesomeIcon icon={['fab', 'github']} /><a href="https://github.com/JTSinghal/StockWise"> Github</a>
            </p>
            </div>
        )
    }
}

export default Footer;