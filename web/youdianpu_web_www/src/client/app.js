import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../app/reducers';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import {LocaleProvider} from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import './app.less';

const env = process.env.NODE_ENV;

let store = null;
if(env === "development") {
    const logger = createLogger();
    store = createStore(reducers, applyMiddleware(thunk, logger));
} else {
    store = createStore(reducers, applyMiddleware(thunk));
}
//const store = createStore(reducers, applyMiddleware(thunk, logger));

import routes, { matchRouteByPath } from '../app/routes';
import { joinRouteTitles } from '../app/utils/helper';

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { preloadState, onStoreCreated=()=>{} } = this.props;

        // callback
        onStoreCreated(store);

        return (
            <Provider store={store}>
                <LocaleProvider locale={zhCN}>
                <Router basename='/report'>
                    <Switch>
                        {routes.map((route, idx) => (
                            <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact === undefined ? true : route.exact}
                                strict={route.strict === undefined ? false : route.strict}
                                render={(props) => {
                                    /* 任意一个路由（包括子路由）的变化都会触发这个render函数的执行 */
                                    const requestPath = props.location.pathname;
									/* const redirect = {};
									const replace = (url) => { redirect.url = url; };
									const requestPath = props.location.pathname;
									// 页面跳转
									if (redirect.url) {
										return (
											<Redirect
												to={{
													pathname: redirect.url,
													state: { from: props.location }
												}}
											/>
										);
									} */

                                    const { component: Component, title: routeTitle } = route;
                                    const { getPageTitle = () => { } } = Component;
                                    const assignProps = Object.assign({}, props);

                                    // Match Route Configs
                                    const matchResults = matchRouteByPath(requestPath);
                                    // Join all Routes's Titles from Match Results
                                    const documentTitle = joinRouteTitles(matchResults) || routeTitle;
                                    // Change Document Title
                                    document.title = documentTitle;
                                    return (
                                        <Component {...props} />
                                    );
                                }}
                            />
                        ))
                        }
                    </Switch>
                </Router>
                </LocaleProvider>
            </Provider>
        )
    }

}