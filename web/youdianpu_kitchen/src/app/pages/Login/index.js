import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon, message } from 'antd';
import { bindActionCreators } from 'redux';

import styles from './index.less';
import GlobalFooter from '../../components/GlobalFooter';
import LoginForm from '../../components/LoginForm';
import loginActions from '../../actions/login';

import Config from '../../common/config';
import { rootRouter } from '../../common/config';
import { reloadAuthorized } from '../../utils/Authorized';

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
        Copyright <Icon type="copyright" /> 2018 湖南一点谱科技有限公司
    </Fragment>
);

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validateCodeURL: `${Config.apiHost}/api/validateCode`,
            time: new Date().getTime(),
            serverIsShow: false,
        }
    }

    refreshValidateCode = () => {
        const time = new Date().getTime();
        this.setState({validateCodeURL: `${Config.apiHost}/api/validateCode`, time})
    }

    onSubmit = (values) => {
        values.time = this.state.time;
        this.props.loginActions.login(values).then((data)=>{
            if(data && data.token) {
                reloadAuthorized();//账号切换登录的时候 需要刷新一下权限
                this.props.loginActions.resetFields();
                this.props.history.replace(`${rootRouter}/dashboard/monitor`);
            }
        });
    }

    onRadioChange = (event) => {
        const value = event.target.value;
        if(value == "0") {
            this.setState({serverIsShow: true});
        } else {
            this.setState({serverIsShow: false});
        }
    }

    render() {
        const { loginFormData } = this.props.login;
        const { fieldChangeValue } = this.props.loginActions;
        const { serverIsShow } = this.state;
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <Link to="/">
                                <img alt="logo" className={styles.logo} src={require('../../common/logo.png')} />
                                <span className={styles.title}>E点谱-后厨子系统</span>
                            </Link>
                        </div>

                        <div className={styles.desc}>E点谱是国内有影响力的智能餐饮、手艺分享、便民服务平台</div>
                    </div>
                    <div className={styles.main}>
                        <LoginForm validateCodeURL={this.state.validateCodeURL}
                            refreshValidateCode={this.refreshValidateCode}
                            time={this.state.time}
                            {...this.props.login}
                            {...loginFormData}
                            fieldChangeValue={fieldChangeValue}
                            onSubmit={this.onSubmit}
                            serverIsShow={serverIsShow}
                            onRadioChange={this.onRadioChange}

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