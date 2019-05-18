import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


export default class Defaultpage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Redirect to="/youdianpu"/>
        );
    }

}