import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//require('antd/dist/antd.min.css');
//require('antd/dist/antd.less');
import 'antd/dist/antd.less';
import App from './app.js';

let store;
const render  = (Component, preloadState = {}) => {
    ReactDOM.render(
        <Component 
            preloadState={preloadState} 
            onStoreCreated={s=> { store = s }}
        />,
        document.getElementById('root')
    );
}

render(App);

if (module.hot) {
    module.hot.accept('./app.js', () => {
        const AppComponent = require('./app.js').default;
        const preloadState = store.getState();
        console.log('preloadState', preloadState);
        render(AppComponent, preloadState);
    });
}