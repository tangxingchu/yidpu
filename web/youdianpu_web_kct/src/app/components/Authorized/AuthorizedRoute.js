import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorized from './Authorized';
/**
 * 给界面渲染使用组件
 */
class AuthorizedRoute extends React.Component {
    render() {
        const { component: Component, render, authority, redirectPath, page403: Page403, ...rest } = this.props;
        return (
            <Authorized
                authority={authority}
                noMatch={<Route {...rest} render={() => <Page403 to={{ pathname: redirectPath }} />} />}
            >
                <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />
            </Authorized>
        );
    }
}

export default AuthorizedRoute;
