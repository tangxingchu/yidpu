import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import { StyleSheet, View, Text, TouchableOpacity,} from 'react-native';

export default class SignupSection extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {this.props.forgetPWD()}}>
                    <Text style={styles.text}>忘记密码?</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    text: {
        marginRight: 24,
        color: '#000',
        backgroundColor: 'transparent',
    },
});