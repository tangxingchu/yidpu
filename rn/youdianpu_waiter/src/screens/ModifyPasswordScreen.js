import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Alert,
    TextInput,
} from 'react-native';
import { Toast } from 'antd-mobile-rn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-native-button';

import Storage from '../utils/storage';
import loginActions from '../actions/login';

const width = Dimensions.get('window').width;

class ModifyPasswordScreen extends Component {

    static navigationOptions = {
        headerTitle: '修改密码',
    };

    constructor(props) {
        super(props)
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    }

    goLogin = () => {
        Storage.remove({key: 'Authorization'}).then(() => {
            this.props.navigation.navigate('Auth');
        });
    }

    modifyPassword = () => {
        const { oldPassword, newPassword, confirmPassword } = this.state;
        if(!oldPassword) {
            Toast.info("原始密码不能为空", 1);
            return;
        }
        if(!newPassword) {
            Toast.info("新密码不能为空", 1);
            return;
        }
        if(confirmPassword != newPassword) {
            Toast.info("新密码与确认新密码输入不一致", 1);
            return;
        }
        Toast.loading("请稍后...", 0)
        this.props.loginActions.modifyPassword(oldPassword, newPassword).then(() => {
            Toast.hide();
            Alert.alert("提示", "密码修改成功,请重新登录", [{text: '确定', onPress: () => this.goLogin()},]);
        }).catch(e => {
            Toast.hide();
            Toast.fail(e.message, 2);
        });
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 8, marginVertical: 8}}>
                    <Text style={{minWidth: 75}}>原始密码:</Text>
                    <TextInput 
                        style={styles.input}
                        secureTextEntry={true} 
                        placeholder="请输入原始密码"
                        placeholderTextColor="#C7C7CD"
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({oldPassword: text})}
                        value={this.state.oldPassword}
                    />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 8, marginVertical: 8}}>
                    <Text style={{minWidth: 75}}>新密码:</Text>
                    <TextInput 
                        style={styles.input}
                        secureTextEntry={true} 
                        placeholder="请输入新密码"
                        placeholderTextColor="#C7C7CD"
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({newPassword: text})}
                        value={this.state.newPassword}
                    />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 8, marginVertical: 8}}>
                    <Text style={{minWidth: 75}}>确认新密码:</Text>
                    <TextInput 
                        style={styles.input}
                        secureTextEntry={true} 
                        placeholder="请输入确认新密码"
                        placeholderTextColor="#C7C7CD"
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({confirmPassword: text})}
                        value={this.state.confirmPassword}
                    />
                </View>
                <View style={{ width, paddingHorizontal: 8, marginVertical: 8, }}>
                    <Button
                        containerStyle={{ padding: 10, height: 40, overflow: 'hidden', borderRadius: 4, backgroundColor: '#1296db' }}
                        disabledContainerStyle={{ backgroundColor: 'grey' }}
                        style={{ fontSize: 16, color: '#fff', marginLeft: 16, marginRight: 16 }}
                        onPress={() => {this.modifyPassword()}}
                    >
                        确定修改
                    </Button>
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
})(ModifyPasswordScreen);

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#ffffff',
        flex: 1,
        height: 40,
        marginLeft: 8,
        paddingLeft: 4,
        borderRadius: 4,
        color: '#000',
    },
});