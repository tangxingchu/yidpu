import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import {
    Toast,
} from 'antd-mobile-rn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Storage from '../utils/storage';
import loginActions from '../actions/login';
import requestPermissionsAsync from '../utils/requestPermissionsAsync';
import Config from '../common/config';
const CryptoJS = require('crypto-js');

class AuthLoadingScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // const allow = requestPermissionsAsync('storage')
        // if(allow) {
            this._bootstrapAsync();
        // } else {
        //     Toast.info("您禁止了读写存储权限");
        // }
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = () => {
        Storage.load({key: 'Authorization'}).then((authorization) => {
            this.props.navigation.navigate('App');
            // this.props.navigation.navigate('App', {merchantName: '唐星厨'});
        }).catch(() => {
            // Decrypt
            Storage.load({key: 'usernamePassword'}).then((ciphertext) => {
                var bytes  = CryptoJS.AES.decrypt(ciphertext, Config.secretkey);
                var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                this.props.loginActions.login({ ...decryptedData, platform: 3 }).then((data) => {
                    if(data) {
                        Storage.save({
                            key: 'Authorization',
                            data: data.token,
                            expires: 1000 * 3600 * 47,//默认2天(比服务端少一个小时)
                        });
                        this.props.navigation.navigate('App');
                    } else {
                        this.props.navigation.navigate('Auth');
                    }
                }).catch(e => {
                    Toast.fail(e.message, 2);
                });
            }).catch(() => {
                this.props.navigation.navigate('Auth');
            });
        });
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

export default connect((state) => {
    return {}
}, (dispatch) => {
    return { loginActions: bindActionCreators(loginActions, dispatch) }
})(AuthLoadingScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});