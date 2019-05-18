import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
} from 'react-native';
import { Accordion, List, WingBlank } from 'antd-mobile-rn';

export default class OrderScreen extends Component {

    static navigationOptions = {
        tabBarLabel: '订单',
        tabBarIcon: ({ focused }) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../assets/images/order_focused.png')} />
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../assets/images/order.png')} />
            );
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            activeSections: [2, 0],
        }
    }

    onChange = (activeSections) => {
        this.setState({ activeSections });
    };

    render() {
        return (
            <WingBlank size="md">
                <View style={{ marginBottom: 8 }}>
                    <Accordion
                        onChange={this.onChange}
                        activeSections={this.state.activeSections}
                    >
                        <Accordion.Panel header="Title 1">
                            <List>
                                <List.Item>Content 1</List.Item>
                                <List.Item>Content 2</List.Item>
                                <List.Item>Content 3</List.Item>
                            </List>
                        </Accordion.Panel>
                        <Accordion.Panel header="Title 2">
                            this is panel content2 or other
                    </Accordion.Panel>
                        <Accordion.Panel header="Title 3">
                            Text text text text text text text text text text text text text
                    text text
                    </Accordion.Panel>
                    </Accordion>
                </View>
            </WingBlank>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarIcon: {
        width: 21,
        height: 21,
    }
});