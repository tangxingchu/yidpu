import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Alert,
} from 'react-native';
import {
    WingBlank,
    List,
    Icon,
    Toast,
} from 'antd-mobile-rn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from 'react-native-button';
import Storage from '../utils/storage';
import YdpModule from '../modules/YdpModule';
import profileActions from '../actions/profile';
import requestPermissionsAsync from '../utils/requestPermissionsAsync';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class ProfileScreen extends Component {

    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../assets/images/profile_focused.png')}/>
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../assets/images/profile.png')}/>
            );
        },
    };

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.profileActions.selectLastVersion().catch(e => {
            Toast.fail(e.message, 2);
        });
        YdpModule.getVersionInfo().then(data => {
            this.props.profileActions.dispatch_appVersion(data.versionName);
        });
    }

    logout = () => {
        Storage.remove({key: "usernamePassword"}).then(() => {
            Storage.remove({key: 'Authorization'}).then(() => {
                this.props.navigation.navigate('Auth');
            });
        })
    }

    _onPress = () => {
        Alert.alert("退出登录", "确定退出登录吗?", [
            {text: '取消', onPress: () => {}, style: 'cancel'},
            {text: '确定', onPress: () => this.logout()},
        ], { cancelable: false })
    }

    validVersion = () => {
        const { versionName, lastVersionName } = this.props.profile;
        const versionNames = versionName.split("\.");
        const lastVersionNames = lastVersionName.split("\.");
        if(parseInt(lastVersionNames[0]) > parseInt(versionNames[0]) 
            || parseInt(lastVersionNames[1]) > parseInt(versionNames[1])
            || parseInt(lastVersionNames[2]) > parseInt(versionNames[2])) {
            return true;
        } else {
            return false;
        }
    }

    renderNew = () => {
        if(this.validVersion()) {
            return <View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: "#ff4242", marginHorizontal: 4}}></View>;
        } else {
            return null;
        }
    }

    downloadAPK = async () => {
        const allow = await requestPermissionsAsync('storage');
        if (allow) {
            YdpModule.downLoadAPK(`http://download.yidpu.com/yidpu_waiter.apk?attname=`);
        } else {
            Toast.info("您禁止了读写存储权限");
        }
    }

    handleVersionClick = () => {
        if(this.validVersion()) {
            Alert.alert("提示", "是否现在下载更新?", [
                {text: '否', onPress: () => {}, style: 'cancel'},
                {text: '是', onPress: () => this.downloadAPK()},
            ]);
        } else {
            Alert.alert("提示", "当前已是最新版本.", [
                {text: '确定'}
            ]);
        }
    }

    render() {
        const { versionName, lastVersionName } = this.props.profile;
        return (
            <View style={styles.container}>
                <WingBlank size="md" style={{ marginTop: 8 }}>
                    <List>
                        <List.Item>
                            <View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ModifyPasswordScreen')}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
                                        <Text>修改密码</Text>
                                        <Icon type="right" size={18} color={'rgba(0, 0, 0, 0.45)'}></Icon>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </List.Item>
                        <List.Item>
                            <View>
                                <TouchableOpacity onPress={() => this.handleVersionClick()}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
                                        <Text>当前版本</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                            <Text>{versionName}</Text>{this.renderNew()}<Icon type="right" size={18} color={'rgba(0, 0, 0, 0.45)'}></Icon>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </List.Item>
                    </List>
                </WingBlank>
                <View style={{width: width, height: 48, paddingHorizontal: 8, marginVertical: 8, position: 'absolute', left: 0, bottom: 0}}>
                    <Button
                        onPress={() => { this._onPress() }}
                        containerStyle={{ padding: 10, height: 40, overflow: 'hidden', borderRadius: 4, backgroundColor: '#ff4242' }}
                        disabledContainerStyle={{ backgroundColor: 'grey' }}
                        style={{ fontSize: 16, color: '#fff', marginLeft: 16, marginRight: 16 }}>
                        退出登录
                    </Button>
                </View>
            </View>
        )
    }

}

export default connect((state) => {
    return {
        profile: state.profile,
    }
}, (dispatch) => {
    return { profileActions: bindActionCreators(profileActions, dispatch) }
})(ProfileScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1296db',
        height: 40,
        borderRadius: 20,
        zIndex: 100,
    },
    tabBarIcon: {
        width: 21,
        height: 21,
    }
});