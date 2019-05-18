import React, { Component, Fragment } from 'react';
import { Modal, Button, Alert } from 'antd';
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
        const { modalVisible, handleModalVisible, qrcodeData, message, title } = this.props;
        return (
            <Modal visible={modalVisible}
                title={title}
                onCancel={() => handleModalVisible(false)}
                footer={[
                    <Button key="close" style={{marginRight: 8,}} onClick={() => handleModalVisible(false)}>
                        关闭
                    </Button>,
                    <Button key="payment" onClick={() => {this.saveQrCode(qrcodeData)}} type="primary">保存二维码</Button>,
                ]}
                visible={modalVisible}
            >   
                <Alert message={message}  type="info" showIcon/>
                <div style={{display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <img src={qrcodeData}/>
                </div>
            </Modal>
        )
    }

}