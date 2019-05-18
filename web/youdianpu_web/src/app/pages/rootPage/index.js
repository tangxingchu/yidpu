import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { rootRouter } from '../../common/config';

export default class RootPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Redirect to={`${rootRouter}`}/>
        );
    }

}