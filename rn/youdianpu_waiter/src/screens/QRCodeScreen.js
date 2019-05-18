import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { QRScannerView } from '../components/QRScanner';
import { Toast } from 'antd-mobile-rn';
import parseUrl from '../utils/utlis';

export default class QRCodeScreen extends Component {

    render() {
        const { width } = Dimensions.get("window");
        const rectWidth = width/2 + (width/4);
        return (

            < QRScannerView
                onScanResultReceived={this.barcodeReceived.bind(this)}

                renderTopBarView={() => this._renderTitleBar()}

                renderBottomMenuView={() => this._renderMenu()}

                hintText={"将二维码放入框内，即可自动扫码"}

                rectHeight={rectWidth}

                rectWidth={rectWidth}
            />
        )
    }

    _onClose = () => {
        this.props.navigation.goBack();
    }

    _renderTitleBar() {
        return (
                <View style={{width: Dimensions.get('window').width, position: 'absolute',
                    justifyContent: 'center', alignItems: 'center', paddingLeft: 8}}>
                    <Text style={{ color: 'white', fontSize: 20}}>
                    </Text>
                </View>
        );
    }

    _renderMenu() {
        return (
            <TouchableOpacity onPress={() => {this._onClose()}}>
                <View style={{width: Dimensions.get('window').width,
                    height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ color: 'white', fontSize: 16}}>
                        <Ionicons name="md-close-circle-outline" size={16} ></Ionicons>取消
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    barcodeReceived(e) {
        const params = parseUrl(e.data);
        if(params != null && params.merchantId != null && params.tableCode != null) {
            this.props.navigation.replace('FunctionChoose', { transition: 'forHorizontal', merchantId: params.merchantId, tableCode: params.tableCode });
        } else {
            this.props.navigation.pop();
            Toast.info(e.data, 2);
        }
        // this.props.navigation.pop();
        // this.props.navigation.push('PlaceOrder');
    }
}