import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Easing,
	Animated,
} from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import CodePush from 'react-native-code-push';
import TabNavigatorScreen from './src/screens/TabNavigatorScreen';
import LoginScreen from './src/screens/LoginScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import QRCodeScreen from './src/screens/QRCodeScreen';
import PlaceOrderScreen from './src/screens/PlaceOrderScreen';
import TableOrderScreen from './src/screens/tableOrderScreen';
import FunctionChooseScreen from './src/screens/FunctionChooseScreen';
import ModifyPasswordScreen from './src/screens/ModifyPasswordScreen';
// import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
//上下切换
const upDownTransition = (sceneProps) => {
	const { layout, position, scene } = sceneProps;
	const { index } = scene;

	const height = layout.initHeight;
	//沿Y轴平移
	const translateY = position.interpolate({
		inputRange: [index - 1, index, index + 1],
		outputRange: [height, 0, 0],
	});
	//透明度
	const opacity = position.interpolate({
		inputRange: [index - 1, index - 0.99, index],
		outputRange: [0, 1, 1],
	});
	return { opacity, transform: [{ translateY }] };
}
//左右切换
const leftRightTransition = (sceneProps) => {
	const {layout, position, scene} = sceneProps;
	const {index} = scene;
	const Width = layout.initWidth;
	//沿X轴平移
	const translateX = position.interpolate({
		inputRange: [index - 1, index, index + 1],
		outputRange: [Width, 0, -(Width - 10)],
	});
	//透明度
	const opacity = position.interpolate({
		inputRange: [index - 1, index - 0.99, index],
		outputRange: [0, 1, 1],
	});
	return {opacity, transform: [{translateX}]};

}

const TransitionConfiguration = () => ({
	screenInterpolator: (sceneProps) => {
		const { scene } = sceneProps;
		const { route } = scene;
		const params = route.params || {};
		const transition = params.transition || 'forHorizontal';
		if(transition === 'forHorizontal') {
			return leftRightTransition(sceneProps);
		} else {
			return upDownTransition(sceneProps);
		}
		// return leftRightTransition(sceneProps);
	},
});

const AppStack = createStackNavigator({
	Home: {
		screen: TabNavigatorScreen,
	},
	QRScanner: {
		screen: QRCodeScreen,
		navigationOptions: ({ navigation }) => ({
            header: null,
		}),
	},
	PlaceOrder: {
		screen: PlaceOrderScreen,
		navigationOptions: ({ navigation }) => ({
			title: `${navigation.state.params.tableCode}下单`,
		}),
	},
	TableOrder: {
		screen: TableOrderScreen,
		navigationOptions: ({ navigation }) => ({
			title: `${navigation.state.params.tableCode}订单详情`,
		}),
	},
	FunctionChoose: {
		screen: FunctionChooseScreen,
	},
	ModifyPasswordScreen: {
		screen: ModifyPasswordScreen,
	}
}, {
	transitionConfig: TransitionConfiguration,
	/* navigationOptions: ({navigation}) => {
		console.log(navigation);
		return {
			title: "sss",
		}
	} */
});
const AuthStack = createStackNavigator({ Login: LoginScreen });

export default createSwitchNavigator({
	  AuthLoading: AuthLoadingScreen,
	  App: {
		  screen: AppStack,
	  },
	  Auth: AuthStack,
	}, {
		initialRouteName: 'AuthLoading',
	}
)
