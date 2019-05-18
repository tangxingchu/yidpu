import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';

import logoImg from '../../../assets/images/logo.png';

export default class Logo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={logoImg} style={styles.image} />
                <Text style={styles.text}>一点谱服务员版</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 80,
        height: 80,
    },
    text: {
        color: '#000',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginTop: 8,
    },
});