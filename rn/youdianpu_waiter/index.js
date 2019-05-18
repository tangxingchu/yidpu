import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './src/reducers';
import App from './App';

const store = createStore(reducers, applyMiddleware(thunk, createLogger()));

class WrapperApp extends Component {
    
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }

}

AppRegistry.registerComponent('youdianpu_waiter', () => WrapperApp);
