import React, { Component, Fragment } from 'react';
import { Modal, Checkbox } from 'antd';

export default class PrintTicket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: true,
        }
    }

    okHandle = () => {
        const isRePrint = this.state.checked;
        this.props.rePrintTicket(isRePrint);
    }

    onChange = (e) => {
        const { checked } = e.target;
        this.setState({checked});
    }

    render() {
        const { checked } = this.state;
        const { modalVisible, handleModalVisible, selectOrderLoading } = this.props;
        return (
            <Modal title={"打印下单小票"}
                visible={modalVisible}
                okText="确定并打印"
                onOk={this.okHandle}
                cancelText="取消"
                onCancel={() => { handleModalVisible() }}
                confirmLoading={selectOrderLoading}
            >   
                <div id="table" style={{paddingTop: 16, textAlign: 'center'}}>
                    <Checkbox onChange={this.onChange} checked={checked}>是否补打</Checkbox>
                </div>
            </Modal>
        );
    }

}