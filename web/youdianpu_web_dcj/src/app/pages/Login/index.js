import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Icon , Modal, Button, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { shell, ipcRenderer } from 'electron';

import styles from './index.less';
import GlobalFooter from '../../components/GlobalFooter';
import LoginForm from '../../components/LoginForm';
import loginActions from '../../actions/login';

import Config from '../../common/config';
import { rootRouter } from '../../common/config';
import { reloadAuthorized } from '../../utils/Authorized';
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
            visible: null,
            versionModalVisible: false,
            clientVersion: null,
        }
    }

    componentDidMount() {
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
                this.props.loginActions.resetFields();
                this.props.history.replace(`${rootRouter}/dashboard/queue`);
            }
        }).catch(e => {
            this.refreshValidateCode();
        });;
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

    render() {
        const { visible, versionModalVisible, clientVersion } = this.state;
        const { loginFormData } = this.props.login;
        const { fieldChangeValue } = this.props.loginActions;
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.main}>
                        <LoginForm validateCodeURL={this.state.validateCodeURL}
                            refreshValidateCode={this.refreshValidateCode}
                            time={this.state.time}
                            {...this.props.login}
                            {...loginFormData}
                            fieldChangeValue={fieldChangeValue}
                            onSubmit={this.onSubmit}
                        />
                    </div>
                </div>
                <GlobalFooter links={links} copyright={copyright} />
                <OnlineService visible={visible} openQQ={this.openQQ} hide={this.hideModal}/>
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