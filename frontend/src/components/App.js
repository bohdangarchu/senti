import React, { Component } from 'react';
import { render } from "react-dom";
import HomePage from './HomePage'

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>App name: {this.props.name}</p>
                <HomePage />
            </div>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App name="appname"/>, appDiv)