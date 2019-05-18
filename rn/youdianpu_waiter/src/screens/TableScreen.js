import React, { Component, Fragment } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Alert,
    Modal,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import {
    WingBlank,
    Grid,
    Modal as AntdModal,
} from 'antd-mobile-rn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-native-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Toast } from 'antd-mobile-rn';

import tableActions from '../actions/table';
import orderActions from '../actions/order';

const data = Array.from(new Array(9)).map((_val, i) => ({
    icon: '../../assets/images/table.png',
    text: `Name${i}`,
}));

class TableScreen extends Component {

    static navigationOptions = {
        tabBarLabel: '桌台',
        tabBarIcon: ({ focused }) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../assets/images/table_focused.png')} />
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../assets/images/table.png')} />
            );
        },
    };

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            modalVisible: false,
            tableModalVisible: false,
            currTableStatus: null, //默认是空闲中
            currChangeTableCode: null,//当前选中的换台餐桌
        }
    }

    componentDidMount() {
        if(global.socket) {
            //查询所有桌台以及桌台状态
            global.socket.on('queryAllTableStatusMsg', data => {
                // console.log(data);
                //提取floor
                const floors = [];
                if(data) {
                    data.forEach(item => {
                        const floorObj = floors.find(floorItem => item.floor_id == floorItem.id);
                        let tableVo = {floorId: item.floor_id, floorName: item.floor_name, id: item.id, status: item.status,
                            tableCode: item.table_code, tableLimit: item.table_limit, tableName: item.table_name};
                        if(!floorObj) {
                            let floor = {id: item.floor_id, floorName: item.floor_name, tableVos: []};
                            floors.push(floor);
                            floor.tableVos.push(tableVo);//桌台
                        } else {
                            floorObj.tableVos.push(tableVo);//桌台
                        }
                    });
                }
                this.props.tableActions.dispatch_tables(data);
                this.props.tableActions.dispatch_floors(floors);
                // this.setState({loading: false});
            });
            //桌台状态修改
            global.socket.on('udpateTableStatusMsg', ({tableCode, status}) => {
                this.props.tableActions.dispatch_tableStatus(tableCode, status);
            });

            global.socket.on('changeTableMsg', data => {
                const { currChangeTableCode } = this.state;
                const { tableList } = this.props.table;
                const tableCode = this.tableCode;
                const tableStatus = tableList.find(item => item.table_code == tableCode);
                if(data.success) {//还没有提及订单，只在购物车里面换台
                    //桌台状态修改
                    global.socket.emit("udpateTableStatus", {tableCode: this.tableCode, status: 1});
                    //桌台状态修改
                    global.socket.emit("udpateTableStatus", {tableCode: currChangeTableCode, status: tableStatus.status});
                    this.setState({tableModalVisible: false});
                    Toast.success("换台成功", 1);
                } else {
                    this.setState({tableModalVisible: false});
                    Toast.loading("处理中...", 0);
                    this.props.orderActions.changeTableCode(tableCode, currChangeTableCode).then(() => {
                        Toast.hide();
                        Toast.success("换台成功", 1);
                        //桌台状态修改
                        global.socket.emit("udpateTableStatus", {tableCode: this.tableCode, status: 1});
                        //桌台状态修改
                        global.socket.emit("udpateTableStatus", {tableCode: currChangeTableCode, status: tableStatus.status});
                    }).catch(e => {
                        Toast.hide();
                        Toast.fail(e.message);
                    });
                }
            });
        }
        this._onRefresh();
    }

    componentWillUnmount() {
        if (global.socket) {
            global.socket.removeAllListeners("queryAllTableStatusMsg");
            global.socket.removeAllListeners("udpateTableStatusMsg");
            global.socket.removeAllListeners("changeTableMsg");
        }
    }

    _onRefresh = () => {
        if(global.socket) {
            // this.setState({loading: true});
            global.socket.emit('queryAllTableStatus');
        }
    }

    setModalVisible = (flag) => {
        this.setState({ modalVisible: flag });
    }

    _gridItemClick = (el, index) => {
        const { tableList } = this.props.table;
        const tableCode = el.tableCode;
        this.tableCode = tableCode;
        const tableStatus = tableList.find(item => item.table_code == tableCode);
        this.setState({ modalVisible: true, currTableStatus: tableStatus ? tableStatus : null});
    }

    _gridItemClick2 = (el, index) => {
        const tableCode = el.tableCode;
        this.setState({currChangeTableCode: tableCode});
    }

    confirmChangeTableLocal = () => {
        const { currChangeTableCode } = this.state;
        const { tableList } = this.props.table;
        const tableCode = this.tableCode;
        if(global.socket) {
            global.socket.emit('changeTable', {tableCode, newTableCode: currChangeTableCode});
        }
    }

    navigateToPlaceOrder = () => {
        const { navigate } = this.props.navigation;
        navigate('PlaceOrder', { transition: 'forHorizontal', tableCode: this.tableCode });
        this.setModalVisible(false);
    }

    //重置桌台状态
    resetTableStatus = (status) => {
        const title = "提示";
        const message = "重置为空闲将清空下单列表,确定重置为空闲吗?";
        Alert.alert(
            title,
            message,
            [
                { text: '取消', onPress: () => { console.log('Cancel Pressed') }, style: 'cancel' },
                {
                    text: '确定', onPress: () => {
                        if(global.socket) {
                            global.socket.emit("udpateTableStatus", {tableCode: this.tableCode, status});
                            this.props.tableActions.dispatch_tableStatus(this.tableCode, status);
                            if(status == 1) {//重置为空闲状态,清空购物车
                                global.socket.emit("clearShoppingCart", this.tableCode);
                            }
                            this.setModalVisible(false);
                            Toast.info("桌台已重置为空闲状态", 2);
                        }
                    }
                },
            ],
        )   
    }

    //查询桌台订单
    router2TableOrder = () => {
        this.setModalVisible(false);
        const { navigate } = this.props.navigation;
        navigate('TableOrder', { transition: 'forHorizontal', tableCode: this.tableCode });
    }

    renderTableImage = (tableCode) => {
        const { tableList } = this.props.table;
        const tableStatus = tableList.find(item => item.table_code == tableCode);
        if(tableStatus) {
            switch(tableStatus.status) {
                case 1: return <Image style={styles.tabBarIcon} source={require('../../assets/images/table.png')} />; break;
                case 2: return <Image style={styles.tabBarIcon} source={require('../../assets/images/table_2.png')} />; break;
                case 3: return <Image style={styles.tabBarIcon} source={require('../../assets/images/table_3.png')} />; break;
                case 4: return <Image style={styles.tabBarIcon} source={require('../../assets/images/table_4.png')} />; break;
                case 5: return <Image style={styles.tabBarIcon} source={require('../../assets/images/table_5.png')} />; break;
            }
        } else {
            return <Image style={styles.tabBarIcon} source={require('../../assets/images/table.png')} />;
        }
    }

    renderTextStyle = (tableCode) => {
        const { tableList } = this.props.table;
        const tableStatus = tableList.find(item => item.table_code == tableCode);
        if(tableStatus) {
            switch(tableStatus.status) {
                case 1: return {color: '#000000'}; break;
                case 2: return {color: '#C4DCF0'}; break;
                case 3: return {color: '#DEC87C'}; break;
                case 4: return {color: '#97D78F'}; break;
                case 5: return {color: '#EA9B9B'}; break;
            }
        } else {
            return {color: '#000000'};
        }
    }

    changeTableLocal = () => {
        this.setState({tableModalVisible: true, modalVisible: false});
    }

    render() {
        const { loading, tableModalVisible } = this.state;
        const { floorList } = this.props.table;
        const renderItem = (el, index) => {
            return (
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {this.renderTableImage(el.tableCode)}
                    <Text style={this.renderTextStyle(el.tableCode)}>{el.tableName}</Text>
                </View>
            )
        }
        //只渲染空闲餐桌
        const renderItemStatus1 = (el, index) => {
            const { tableList } = this.props.table;
            const { currChangeTableCode } = this.state;
            const tableStatus = tableList.find(item => item.table_code == el.tableCode);
            if(tableStatus && tableStatus.status == 1) {
                if(currChangeTableCode == el.tableCode) {
                    return (
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 
                            'center', alignItems: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: '#1296db' }}>
                            {this.renderTableImage(el.tableCode)}
                            <Text style={this.renderTextStyle(el.tableCode)}>{el.tableName}</Text>
                        </View>
                    )
                } else {
                    return (
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            {this.renderTableImage(el.tableCode)}
                            <Text style={this.renderTextStyle(el.tableCode)}>{el.tableName}</Text>
                        </View>
                    )
                }
            }
        }
        const { height, width } = Dimensions.get('window');
        const modalBackgroundStyle = {backgroundColor: 'rgba(0, 0, 0, 0.5)'};
        const { currTableStatus } = this.state;
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 8,}}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={styles.tabBarIcon} source={require('../../assets/images/table.png')} />
                        <Text style={{ fontSize: 12}}>空闲</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={styles.tabBarIcon} source={require('../../assets/images/table_2.png')} />
                        <Text style={{ fontSize: 12, color: '#C4DCF0'}}>下单中</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={styles.tabBarIcon} source={require('../../assets/images/table_3.png')} />
                        <Text style={{ fontSize: 12, color: '#DEC87C'}}>待确认</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={styles.tabBarIcon} source={require('../../assets/images/table_4.png')} />
                        <Text style={{ fontSize: 12, color: '#97D78F'}}>用餐中</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={styles.tabBarIcon} source={require('../../assets/images/table_5.png')} />
                        <Text style={{ fontSize: 12, color: '#EA9B9B'}}>待打扫</Text>
                    </View>
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={this._onRefresh}
                            tintColor="#ffffff"
                            title="数据加载中..."
                            titleColor="#ffffff"
                            colors={['#ffffff']}
                            progressBackgroundColor="#1296db"
                        />
                    }
                >
                    {
                        floorList.map(table => {
                            return (
                                <View style={[{ margin: 10 }]} key={table.id}>
                                    <WingBlank size="md"><Text style={styles.title}>{table.floorName}</Text></WingBlank>
                                    <Grid hasLine={false}
                                        data={table.tableVos}
                                        renderItem={renderItem}
                                        onClick={this._gridItemClick}
                                    />
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
                        <View style={[{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }, modalBackgroundStyle]}>
                            <View style={{  backgroundColor: '#fff', width: width - 50, borderRadius: 10, padding: 16, shadowRadius: 4 }}>
                                <View style={{ marginLeft: 8, marginRight: 8, marginTop: 16, flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text style={{fontSize: 20}}>请选择</Text>
                                </View>
                                <View style={{ marginLeft: 8, marginRight: 8, marginTop: 16,}}>
                                    <Button
                                        containerStyle={{ padding: 10, height: 40, overflow: 'hidden', borderRadius: 4, backgroundColor: '#1296db' }}
                                        disabledContainerStyle={{ backgroundColor: 'grey' }}
                                        style={{ fontSize: 16, color: '#fff', marginLeft: 16, marginRight: 16 }}
                                        onPress={this.navigateToPlaceOrder}
                                    >
                                        下单
                                    </Button>
                                </View>
                                
                                {
                                    currTableStatus && (currTableStatus.status == 5 || currTableStatus.status == 2) ? 
                                    <Fragment>
                                        <View style={{ marginLeft: 8, marginRight: 8, marginTop: 16, }}>
                                            <Button
                                                containerStyle={{ padding: 10, height: 40, overflow: 'hidden', borderRadius: 4, backgroundColor: '#1296db' }}
                                                disabledContainerStyle={{ backgroundColor: 'grey' }}
                                                style={{ fontSize: 16, color: '#fff', marginLeft: 16, marginRight: 16 }}
                                                onPress={() => this.changeTableLocal()}
                                            >
                                                换台
                                            </Button>
                                        </View>
                                        <View style={{ marginLeft: 8, marginRight: 8, marginTop: 16, }}>
                                            <Button
                                                containerStyle={{ padding: 10, height: 40, overflow: 'hidden', borderRadius: 4, backgroundColor: '#1296db' }}
                                                disabledContainerStyle={{ backgroundColor: 'grey' }}
                                                style={{ fontSize: 16, color: '#fff', marginLeft: 16, marginRight: 16 }}
                                                onPress={() => this.resetTableStatus(1)}
                                            >
                                                置为空闲状态
                                            </Button>
                                            <Text style={{color: 'rgba(0, 0, 0, 0.45)'}}>重置为空闲状态,桌台购物车将会清空</Text>
                                        </View>
                                    </Fragment>
                                    : null
                                }

                                {
                                    currTableStatus && (currTableStatus.status == 4 || currTableStatus.status == 3) ? 
                                    <Fragment>
                                        <View style={{ marginLeft: 8, marginRight: 8, marginTop: 16, }}>
                                            <Button
                                                containerStyle={{ padding: 10, height: 40, overflow: 'hidden', borderRadius: 4, backgroundColor: '#1296db' }}
                                                disabledContainerStyle={{ backgroundColor: 'grey' }}
                                                style={{ fontSize: 16, color: '#fff', marginLeft: 16, marginRight: 16 }}
                                                onPress={() => this.router2TableOrder()}
                                            >
                                                桌台订单
                                            </Button>
                                        </View>
                                        <View style={{ marginLeft: 8, marginRight: 8, marginTop: 16, }}>
                                            <Button
                                                containerStyle={{ padding: 10, height: 40, overflow: 'hidden', borderRadius: 4, backgroundColor: '#1296db' }}
                                                disabledContainerStyle={{ backgroundColor: 'grey' }}
                                                style={{ fontSize: 16, color: '#fff', marginLeft: 16, marginRight: 16 }}
                                                onPress={() => this.changeTableLocal()}
                                            >
                                                换台
                                            </Button>
                                        </View>
                                    </Fragment>
                                    : null
                                }

                                <View style={{ marginLeft: 8, marginRight: 8, marginTop: 16, flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
                                        <Text style={{fontSize: 16}} >
                                            <Ionicons name="md-close-circle-outline" size={16}></Ionicons>关闭
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <AntdModal
                    popup
                    visible={tableModalVisible}
                    maskClosable={true}
                    onClose={() => this.setState({tableModalVisible: false, currChangeTableCode: null})}
                    animationType="slide-up"
                >
                    {
                        floorList.map(table => {
                            return (
                                <View style={[{ margin: 10 }]} key={table.id}>
                                    <WingBlank size="md"><Text style={styles.title}>{table.floorName}</Text></WingBlank>
                                    <Grid hasLine={false}
                                        data={table.tableVos}
                                        renderItem={renderItemStatus1}
                                        onClick={this._gridItemClick2}
                                        columnNum={8}
                                    />
                                    
                                    
                                </View>
                            )
                        })
                    }
                    <Button
                        containerStyle={{ padding: 10, height: 40, marginTop: 4, marginBottom: 4, overflow: 'hidden', borderRadius: 4, backgroundColor: '#1296db' }}
                        disabledContainerStyle={{ backgroundColor: 'grey' }}
                        style={{ fontSize: 16, color: '#fff', marginLeft: 16, marginRight: 16 }}
                        onPress={() => this.confirmChangeTableLocal()}
                    >
                        确定换台
                    </Button>
                    {/* <Button
                        containerStyle={{ padding: 10, height: 40, marginTop: 8, overflow: 'hidden', borderRadius: 4, backgroundColor: '#fff' }}
                        disabledContainerStyle={{ backgroundColor: 'grey' }}
                        style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.65)', marginLeft: 16, marginRight: 16, }}
                        onPress={() => this.setState({tableModalVisible: false, currChangeTableCode: null})}
                    >
                        关闭
                    </Button> */}
                </AntdModal>
            </View>
        )
    }

}

export default connect((state) => {
    return {
        table: state.table,
    }
}, (dispatch) => {
    return { 
        tableActions: bindActionCreators(tableActions, dispatch),
        orderActions: bindActionCreators(orderActions, dispatch),
    }
})(TableScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    tabBarIcon: {
        width: 21,
        height: 21,
    }
});