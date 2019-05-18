import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Animated,
    Easing,
    Image,
    Alert,
    View,
} from 'react-native';

import spinner from '../../../assets/images/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
    constructor() {
        super();

        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this._onPress = this._onPress.bind(this);
    }

    _onPress() {
        if (this.props.isLoading) return;

        const pending = () => {
            Animated.timing(this.buttonAnimated, {
                toValue: 1,
                duration: 200,
                easing: Easing.linear,
            }).start();
        };

        const success = () => {
            this._onGrow();
        };

        const failure = () => {
            this.buttonAnimated.setValue(0);
            this.growAnimated.setValue(0);
        }

        this.props.login(pending, success, failure);    
        
    }

    _onGrow() {
        Animated.timing(this.growAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
        }).start();
    }

    render() {
        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
        });
        const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, MARGIN],
        });

        return (
            <View style={styles.container}>
                <Animated.View style={{ width: changeWidth }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._onPress}
                        activeOpacity={1}>
                        {this.props.loginLoading ? (
                            <Image source={spinner} style={styles.image} />
                        ) : (
                                <Text style={styles.text}>登录</Text>
                            )}
                    </TouchableOpacity>
                    <Animated.View
                        style={[styles.circle, { transform: [{ scale: changeScale }] }]}
                    />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1296db',
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100,
    },
    circle: {
        height: MARGIN,
        width: MARGIN,
        marginTop: -MARGIN,
        borderWidth: 1,
        borderColor: '#1296db',
        borderRadius: 100,
        alignSelf: 'center',
        zIndex: 99,
        backgroundColor: '#1296db',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    image: {
        width: 24,
        height: 24,
    },
});