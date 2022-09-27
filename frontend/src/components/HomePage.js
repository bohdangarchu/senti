import React, { Component } from 'react';
import { render } from "react-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>This is the homepage</h1>
                <form action="api">
                    <label htmlFor="keyword">Enter keyword:</label>
                    <input type="text" id="keyword" name="keyword" />
                    <br /><br />
                    <label htmlFor="start_date">Start date:</label>
                    <input type="date" id="start_date" name="start_date" />
                    <br /><br />
                    <label htmlFor="end_date">End date:</label>
                    <input type="date" id="end_date" name="end_date" />
                    <br /><br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}