import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-native-button';
import { Toast } from 'antd-mobile-rn';

import tableActions from '../actions/table';

class FunctionChoose extends Component {

    static navigationOptions = {
        headerTitle: '请选择',
    };

    constructor(props) {
        super(props);
        this.state = {
            clearBtnDisabled: true,
        }
    }

    componentDidMount() {
        const { tableCode } = this.props.navigation.state.params;

        if (global.socket) {
            //查询所有桌台以及桌台状态
            global.socket.on('queryAllTableStatusMsg', data => {
                this.props.tableActions.dispatch_tables(data);
                const table = data.find(item => item.table_code == tableCode);
                if (table && table.status != 4) {//表示正处于用餐状态
                    this.setState({ clearBtnDisabled: false });
                }
            });
            global.socket.emit('queryAllTableStatus');
        }
    }

    componentWillUnmount() {
        if (global.socket) {
            global.socket.removeAllListeners("queryAllTableStatusMsg");
        }
    }

    placeOrder = () => {
        const { tableCode } = this.props.navigation.state.params;
        const { replace } = this.props.navigation;
        replace('PlaceOrder', { transition: 'forHorizontal', tableCode });
    }

    clearTable = () => {
        const { tableCode } = this.props.navigation.state.params;
        const title = "提示";
        const message = "确定打扫完毕吗?";
        Alert.alert(
            title,
            message,
            [
                { text: '取消', onPress: () => { console.log('Cancel Pressed') }, style: 'cancel' },
                {
                    text: '确定', onPress: () => {
                        if(global.socket) {
                            global.socket.emit("udpateTableStatus", {tableCode: tableCode, status: 1});
                            global.socket.emit("clearShoppingCart", tableCode);
                            this.props.navigation.pop();
                            Toast.info("打扫完毕,桌台已重置为空闲状态", 2);
                        }
                    }
                },
            ],
        )
    }

    render() {
        const { clearBtnDisabled } = this.state;
        return (
            <View style={styles.container}>
                <View style={{ marginLeft: 16, marginRight: 16 }}>
                    <Button
                        onPress={() => { this.placeOrder() }}
                        containerStyle={{ padding: 10, height: 40, overflow: 'hidden', borderRadius: 4, backgroundColor: '#1296db' }}
                        disabledContainerStyle={{ backgroundColor: 'grey' }}
                        style={{ fontSize: 16, color: '#fff', marginLeft: 16, marginRight: 16 }}>
                        点餐
                    </Button>
                </View>

                <View style={{ marginLeft: 16, marginRight: 16, marginTop: 16 }}>
                    <Button
                        disabled={clearBtnDisabled}
                        onPress={() => { this.clearTable() }}
                        containerStyle={{ padding: 10, height: 40, overflow: 'hidden', borderRadius: 4, backgroundColor: '#1296db' }}
                        disabledContainerStyle={{ backgroundColor: 'grey' }}
                        style={{ fontSize: 16, color: '#fff', marginLeft: 16, marginRight: 16 }}>
                        桌台打扫完毕
                    </Button>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});

export default connect((state) => {
    return {
        table: state.table,
    }
}, (dispatch) => {
    return { tableActions: bindActionCreators(tableActions, dispatch) }
})(FunctionChoose);