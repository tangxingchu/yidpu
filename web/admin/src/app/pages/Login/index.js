import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon, message} from 'antd';
import { bindActionCreators } from 'redux';

import styles from './index.less';
import GlobalFooter from '../../components/GlobalFooter';
import LoginForm from '../../components/LoginForm';
import loginActions from '../../actions/login';

import Config from '../../common/config';

const links = [
    {
        key: 'help',
        title: '帮助',
        href: '',
    },
    {
        key: 'privacy',
        title: '隐私',
        href: '',
    },
    {
        key: 'terms',
        title: '条款',
        href: '',
    },
];

const copyright = (
    <Fragment>
        Copyright <Icon type="copyright" /> 2018 湖南有点科技股份有限公司
    </Fragment>
);

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validateCodeURL: `${Config.apiHost}/api/validateCode`,
            time: new Date().getTime(),
        }
    }

    refreshValidateCode = () => {
        const time = new Date().getTime();
        this.setState({validateCodeURL: `${Config.apiHost}/api/validateCode`, time})
    }

    onSubmit = (values) => {
        values.time = this.state.time;
        this.props.loginActions.login(values).then((data)=>{
            this.props.history.replace("/");
        });
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <Link to="/">
                                <img alt="logo" className={styles.logo} src={require('../../common/logo.png')} />
                                <span className={styles.title}>E点谱-后台管理系统</span>
                            </Link>
                        </div>

                        <div className={styles.desc}>E点谱是国内有影响力的智能餐饮、手艺分享、便民服务平台</div>
                    </div>
                    <div className={styles.main}>
                        <LoginForm validateCodeURL={this.state.validateCodeURL}
                            refreshValidateCode={this.refreshValidateCode}
                            time={this.state.time}
                            {...this.props.login}
                            onSubmit={this.onSubmit}
                        />
                    </div>
                </div>
                <GlobalFooter links={links} copyright={copyright} />
            </div>
        );
    }

}


export default withRouter(connect((state) => {
    return {
        login: state.login,
    }
}, (dispatch) => {
    return { loginActions: bindActionCreators(loginActions, dispatch) }
})(Login));