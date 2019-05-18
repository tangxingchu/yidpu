import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions, Platform } from 'react-native';

export default class MobilePreview extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let { height, width } = Dimensions.get('window');
        if(Platform.OS === 'web') {
            height = this.props.height;
        }
        return (
            <View style={styles.box}>
                <View style={{ width: 80 }}>
                    <ScrollView>
                        <Text>分类列表</Text>
                    </ScrollView>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', height }}>
                    <ScrollView >
                        <View style={{ width: 50, height: 150, backgroundColor: 'powderblue' }} />
                        <View style={{ width: 50, height: 150, backgroundColor: 'skyblue' }} />
                        <View style={{ width: 50, height: 150, backgroundColor: 'steelblue' }} />
                        <View style={{ width: 50, height: 150, backgroundColor: 'powderblue' }} />
                        <View style={{ width: 50, height: 150, backgroundColor: 'skyblue' }} />
                        <View style={{ width: 50, height: 150, backgroundColor: 'steelblue' }} />
                        <View style={{ width: 50, height: 150, backgroundColor: 'powderblue' }} />
                        <View style={{ width: 50, height: 150, backgroundColor: 'skyblue' }} />
                        <View style={{ width: 50, height: 150, backgroundColor: 'steelblue' }} />
                    </ScrollView>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 8,
        paddingRight: 8,
    },
    text: { fontWeight: 'bold' }
});