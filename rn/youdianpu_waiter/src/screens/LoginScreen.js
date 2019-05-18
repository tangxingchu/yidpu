import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Alert,
} from 'react-native';
import { Toast } from 'antd-mobile-rn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Logo from '../components/login/Logo';
import Form from '../components/login/Form';
import SignupSection from '../components/login/SignupSection';
import ButtonSubmit from '../components/login/ButtonSubmit';
import loginActions from '../actions/login';
import Storage from '../utils/storage';
import Config from '../common/config';
const CryptoJS = require('crypto-js');

class LoginScreen extends Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            username: "",//登录用户名
            password: "",//登录密码
        }
    }

    onUserNameChange = (text) => {
        this.setState({ username: text });
    }

    onPasswordChange = (text) => {
        this.setState({ password: text });
    }

    login = (pending, success, failure) => {
        const { username, password } = this.state;
        if (username && password) {
            pending();
            this.props.loginActions.login({ username, password, platform: 3 }).then((data) => {
                // success();
                // Encrypt
                const ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ username, password }), Config.secretkey).toString();
                if(data) {
                    Storage.save({
                        key: 'usernamePassword',
                        data: ciphertext,
                    });
                    Storage.save({
                        key: 'Authorization',
                        data: data.token,
                        expires: 1000 * 3600 * 47,//默认2天(比服务端少一个小时)
                        // expires: 1000 * 3600 * 1 / 60,//默认1分钟
                    });
                    this.props.navigation.navigate('App');
                } else {
                    failure();
                }
            }).catch(e => {
                failure();
                if(e.status) {
                    Alert.alert("提示", e.message, [{text: '确定'},]);
                } else {
                    Toast.fail(e.message, 2);
                }
            });
        }
    }

    forgetPWD = () => {
        Alert.alert("提示", "请找管理员帮您重置密码!");
    }

    render() {
        const { loginLoading } = this.props.loginInfo;
        const { login } = this.props.loginActions;
        const { username, password } = this.state;
        return (
            <View style={styles.wallpaper}>
                <Logo />
                <View style={styles.container}>
                    <Form onUserNameChange={this.onUserNameChange}
                        onPasswordChange={this.onPasswordChange}
                        username={username}
                        password={password}
                    />
                    <ButtonSubmit loginLoading={loginLoading}
                        login={this.login} />
                    <SignupSection forgetPWD={this.forgetPWD}/>
                </View>
            </View>
        )
    }

}

export default connect((state) => {
    return {
        loginInfo: state.login,
    }
}, (dispatch) => {
    return { loginActions: bindActionCreators(loginActions, dispatch) }
})(LoginScreen);

const styles = StyleSheet.create({
    wallpaper: {
        flex: 1,
        width: null,
        height: null,
    },
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
});