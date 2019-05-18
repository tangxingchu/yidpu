import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style';
import { bindActionCreators } from 'redux';

import styles from './index.less';
import GlobalFooter from '../../components/GlobalFooter';
import LoginForm from '../../components/LoginForm';
import loginActions from '../../actions/login';

import Config from '../../common/config';
import { rootRouter } from '../../common/config';
import { reloadAuthorized } from '../../utils/Authorized';


const copyright = (
    <Fragment>
        Copyright <Icon type="copyright" /> 湖南一点谱科技有限公司
    </Fragment>
);

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validateCodeURL: `${Config.apiHost}/api/validateCode`,
            time: new Date().getTime(),            
			local_logoBase64: null,
            local_merchantName: null,
            visible: false,
        }
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
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
                this.props.history.replace(`${rootRouter}/`);
            }
        }).catch(e => {
            this.refreshValidateCode();
        });
    }

    hideModal = () => {
		this.setState({visible: false});
	}

    render() {
        const { local_logoBase64, local_merchantName, visible } = this.state;
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <img alt="logo" className={styles.logo} src={require('../../common/logo.png')} />
                            <span className={styles.title}>运营分析与报表</span>
                        </div>

                        <div className={styles.desc}>{/* [一点谱是国内有影响力的智能餐饮、手艺分享、便民服务平台] */}</div>
                    </div>
                    <div className={styles.main}>
                        <LoginForm validateCodeURL={this.state.validateCodeURL}
                            refreshValidateCode={this.refreshValidateCode}
                            register={this.register}
                            time={this.state.time}
                            {...this.props.login}
                            onSubmit={this.onSubmit}
                        />
                    </div>
                </div>
                <GlobalFooter copyright={copyright} goHome={this.goHome}/>
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