import React, { Component, Fragment } from 'react';
import { Card, Modal, Radio, Icon, message, Button, Alert } from 'antd';
import { ipcRenderer } from 'electron';

export default class QRCodeModal extends Component {

    constructor(props) {
        super(props);
    }

    saveQrCode = (qrcodeData) => {
        ipcRenderer.on('saved-file', function (event, path) {
            ipcRenderer.send('save-qrcode', { path, qrcodeData });
            ipcRenderer.removeAllListeners("saved-file");
        });
        ipcRenderer.send('save-dialog');        
    }

    render() {
        const { modalVisible, handleModalVisible, qrcodeData } = this.props;
        return (
            <Modal visible={modalVisible}
                title={"桌台二维码"}
                onCancel={() => handleModalVisible(false)}
                footer={[
                    <Button key="close" style={{marginRight: 8,}} onClick={() => handleModalVisible(false)}>
                        关闭
                    </Button>,
                    <Button key="payment" onClick={() => {this.saveQrCode(qrcodeData)}} type="primary">保存二维码</Button>,
                ]}
                visible={modalVisible}
            >   
                <Alert message="请将此二维码保存至本地并制作实物粘贴在对应的桌台上，顾客扫此二维码可以微信\支付宝点餐、微信\支付宝付款。"  type="info" showIcon/>
                <div style={{display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <img src={qrcodeData}/>
                </div>
            </Modal>
        )
    }

}