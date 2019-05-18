import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';

import usernameImg from '../../../assets/images/username.png';
import passwordImg from '../../../assets/images/password.png';
export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPass: true,
            press: false,
            eyeName: "md-eye-off"
        };
        this.showPass = this.showPass.bind(this);
    }

    showPass() {
        this.state.press === false
            ? this.setState({ showPass: false, press: true, eyeName: "md-eye" })
            : this.setState({ showPass: true, press: false, eyeName: 'md-eye-off' });
    }

    render() {
        return (
            <View behavior="padding" style={styles.container}>
                <UserInput
                    source={usernameImg}
                    placeholder="请输入登录账号"
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    onChangeText={this.props.onUserNameChange}
                    value={this.props.username}
                />
                <UserInput
                    source={passwordImg}
                    secureTextEntry={this.state.showPass}
                    placeholder="请输入登录密码"
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    onChangeText={this.props.onPasswordChange}
                    value={this.props.password}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btnEye}
                    onPress={this.showPass}>
                    <Ionicons name={this.state.eyeName} size={24} ></Ionicons>
                </TouchableOpacity>
            </View>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        height: 100,
        alignItems: 'center',
    },
    btnEye: {
        position: 'absolute',
        top: 56,
        right: 28,
    },
    iconEye: {
        width: 28,
        height: 28,
        tintColor: 'rgba(0,0,0,0.45)',
    },
});