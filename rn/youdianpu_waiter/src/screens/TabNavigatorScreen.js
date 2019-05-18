import React, { Component } from 'react';
import {
    Image,
    TouchableOpacity,
} from 'react-native';
import { createBottomTabNavigator } from "react-navigation";
import HomeScreen from './HomeScreen';
/* import OrderScreen from './OrderScreen'; */
import ProfileScreen from './ProfileScreen';
import TableScreen from './TableScreen'
import requestPermissionsAsync from '../utils/requestPermissionsAsync';

const MainScreenNavigator = createBottomTabNavigator({
    HomeTab: { screen: HomeScreen },
    TableTab: { screen: TableScreen },
    /* OrderTab: { screen: OrderScreen }, */
    ProfileTab: { screen: ProfileScreen },
},
    {
        tabBarOptions: {
            //当前选中的tab bar的文本颜色和图标颜色
            activeTintColor: '#1296db',
            //当前未选中的tab bar的文本颜色和图标颜色
            inactiveTintColor: '#000',
            //是否显示tab bar的图标，默认是false
            showIcon: true,
            //showLabel - 是否显示tab bar的文本，默认是true
            showLabel: true,
            //是否将文本转换为大小，默认是true
            upperCaseLabel: false,
            //material design中的波纹颜色(仅支持Android >= 5.0)
            pressColor: '#788493',
            //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
            pressOpacity: 0.8,
            //tab bar的样式
            style: {
                backgroundColor: '#fff',
                paddingBottom: 1,
                borderTopWidth: 0.2,
                paddingTop: 1,
                borderTopColor: '#ccc',
            },
            //tab bar的文本样式
            labelStyle: {
                fontSize: 11,
                margin: 1
            },
            //tab 页指示符的样式 (tab页下面的一条线).
            indicatorStyle: { height: 0 },
            indicatorStyle: {
                backgroundColor: 'transparent',
            },
        },
        tabBarPosition: 'bottom',
        //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
        backBehavior: 'none',
        swipeEnabled: false,
        //是否在切换tab页时使用动画
        animationEnabled: false,
    });

MainScreenNavigator.navigationOptions = ({navigation}) => {
    let title = '首页';
    const { routeName } = navigation.state.routes[navigation.state.index];
    switch(routeName) {
        case "HomeTab": title = "首页"; break;
        case "TableTab": title = "桌台"; break;
        case "OrderTab": title = "订单"; break;
        case "ProfileTab": title = "我的"; break;
    }
    return ({
        title,
        // title: '一点谱',
        // title: navigation.state.params ? navigation.state.params.title: '一点谱',
        headerRight: (
            <TouchableOpacity onPress={() => {_handlerRequestCamera(
                () => navigation.push('QRScanner', { transition: 'forVertical' })
            )}}>
                <Image style={{width: 24, height: 24, marginRight: 16}} source={require('../../assets/images/scan.png')}/>
            </TouchableOpacity>
        ),
    })
};

const _handlerRequestCamera = async (callback) => {
    const allow = await requestPermissionsAsync('camera');
    if (allow) {
        callback();
    }
}

export default MainScreenNavigator;