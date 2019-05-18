import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button, Icon, message, Tooltip, Modal, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { shell, ipcRenderer } from 'electron';

import styles from './index.less';
import GlobalFooter from '../../components/GlobalFooter';
import LoginForm from '../../components/LoginForm';
import loginActions from '../../actions/login';
import ResetPasswordModal from './resetPasswordModal';

import Config from '../../common/config';
import { rootRouter } from '../../common/config';
import { reloadAuthorized } from '../../utils/Authorized';

import logoHolder from '../../common/logo_holder.png';
import OnlineService from '../HomePage/onlineService';
import { randomNum } from '../../utils/utils';

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
        Copyright <Icon type="copyright" /> 湖南一点谱科技有限公司
    </Fragment>
);

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validateCodeURL: `${Config.apiHost}/api/validateCode`,
            time: `${new Date().getTime()}${randomNum(0, 100)}`,            
			local_logoBase64: null,
            local_merchantName: null,
            visible: false,
            resetPWDModalVisible: false,
            resetPWDValidateCodeURL: ``,
            resetTime: null,
            num60: null,//60秒倒计时
            versionModalVisible: false,
            clientVersion: null,
        }
    }

    componentDidMount() {
        ipcRenderer.on("loadLogo-reply", (event, arg) => {
            this.setState({local_logoBase64: arg});
        });
        ipcRenderer.on("loadMerchantName-reply", (event, arg) => {
            this.setState({local_merchantName: arg});
        });
        ipcRenderer.send("loadLogo");
        ipcRenderer.send("loadMerchantName");
        //在线客服
		ipcRenderer.on("online-service", (event, arg) => {
			this.setState({visible: true});
        });
        //版本检查
        ipcRenderer.on("check-version", (event, arg) => {
            this.setState({versionModalVisible: true, clientVersion: arg});
        });
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners("loadLogo-reply");
        ipcRenderer.removeAllListeners("loadMerchantName-reply");
        ipcRenderer.removeAllListeners("online-service");
        ipcRenderer.removeAllListeners("check-version");
    }

    refreshValidateCode = () => {
        const time = `${new Date().getTime()}${randomNum(0, 100)}`;
        this.setState({validateCodeURL: `${Config.apiHost}/api/validateCode`, time})
    }

    onSubmit = (values) => {
        values.time = this.state.time;
        this.props.loginActions.login(values).then((data)=>{
            if(data && data.token) {
                reloadAuthorized();//账号切换登录的时候 需要刷新一下权限
                //缓存token
                ipcRenderer.send("setCacheData", {name: "token", value: data.token});
                this.props.history.replace(`${rootRouter}/`);
            }
        }).catch(e => {
            this.refreshValidateCode();
        });
    }

    register = () => {
        shell.openExternal("https://www.yidpu.com/signup.html");
    }

    goHome = () => {
        shell.openExternal("https://www.yidpu.com");
    }

    hideModal = () => {
		this.setState({visible: false});
	}

    openQQ = (q) => {
		ipcRenderer.send("openQQ", {qq: q});
    }
    
    resetPWD = () => {
        const resetTime = `${new Date().getTime()}${randomNum(0, 100)}`;
        this.setState({resetPWDModalVisible: true, resetPWDValidateCodeURL: 
            `${Config.apiHost}/api/resetPasswordValidateCode?time=${resetTime}`, resetTime});
    }

    getPhoneCode = (values) => {
        this.props.loginActions.resetPasswordPhoneCode(values.phone, this.state.resetTime, values.code).then(() => {
            message.success("短信验证码已发送至您手机");
            let num60 = 60;
            this.setState({num60});
            let inter = window.setInterval(() => {
                this.setState({num60: --num60});
                if(num60 == 0) {
                    window.clearInterval(inter);
                }
            }, 1000);
        }).catch(() => {
            this.resetPWD();
        });
    }

    resetPassword = (values) => {
        return this.props.loginActions.resetPassword(values.phone, values.smsCode).then(() => {
            message.success("密码重置成功，新密码已发送至您手机");
            this.setState({resetPWDModalVisible: false});
        })
    }

    render() {
        const { versionModalVisible, clientVersion } = this.state;
        const { local_logoBase64, local_merchantName, visible, resetPWDModalVisible, resetPWDValidateCodeURL } = this.state;
        const { getPhoneCodeLoading, resetPWDLoading } = this.props.login;
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <a href="javascript:void(0)" onClick={() => {this.goHome()}}>
                                {
                                    local_logoBase64 ?
                                    <img alt="logo" className={styles.logo} src={local_logoBase64}/>
                                    :
                                    <Tooltip title="您设置完logo与店铺名称之后,下次登录将显示您店铺logo与店铺名称">
                                        <img alt="logo" className={styles.logo} src={logoHolder}/>
                                    </Tooltip>
                                }
                                <span className={styles.title}>{local_merchantName ? local_merchantName : 
                                    <Tooltip title="您设置完logo与店铺名称之后,下次登录将显示您店铺logo与店铺名称">您店铺名称占位符</Tooltip>
                                }</span>
                            </a>
                        </div>

                        <div className={styles.desc}>{/* [一点谱是国内有影响力的智能餐饮、手艺分享、便民服务平台] */}</div>
                    </div>
                    <div className={styles.main}>
                        <LoginForm validateCodeURL={this.state.validateCodeURL}
                            refreshValidateCode={this.refreshValidateCode}
                            register={this.register}
                            resetPWD={this.resetPWD}
                            time={this.state.time}
                            {...this.props.login}
                            onSubmit={this.onSubmit}
                        />
                    </div>
                </div>
                <GlobalFooter links={links} copyright={copyright} goHome={this.goHome}/>
                <OnlineService visible={visible} openQQ={this.openQQ} hide={this.hideModal}/>
                <ResetPasswordModal visible={resetPWDModalVisible}
                    onClose={() => this.setState({resetPWDModalVisible: false})}
                    resetPWDValidateCodeURL={resetPWDValidateCodeURL}
                    handleSubmit={this.resetPassword}
                    refreshValidateCode={this.resetPWD}
                    getPhoneCodeLoading={getPhoneCodeLoading}
                    getPhoneCode={this.getPhoneCode}
                    num60={this.state.num60}
                    loading={resetPWDLoading}
                />
                <Modal title={"版本信息"}
                    visible={versionModalVisible}
                    onCancel={() => this.setState({versionModalVisible: false})}
                    centered={true}
                    footer={[<Button key={"close"} onClick={() => this.setState({versionModalVisible: false})}>关闭</Button>]}
                >
                    <Row>
                        <Col span={24} style={{textAlign: 'center'}}>
                            <p>当前版本：{clientVersion}</p>
                        </Col>
                    </Row>
                </Modal>
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