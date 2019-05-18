import React, { Component } from 'react';
import { Row, Col, Modal, Button, Divider } from 'antd';

export default class OperationModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { visible, handleModalVisible } = this.props;
        return (
            <Modal 
                title={"请选择具体操作"}
                visible={visible}
                width={840}
                onCancel={() => handleModalVisible(false)}
                footer={[<Button key="close" onClick={() => handleModalVisible(false)}>关闭</Button>]}
            > 
                <Row>
                    <Col span={6}>
                        <Button type={"primary"} style={{width: 160}} onClick={() => this.props.initPlaceOrder()}>下单</Button>
                    </Col>
                    <Col span={6}>
                        <Button type={"primary"} style={{width: 160}} onClick={() => this.props.hadnleCopyOrder()}>下单(复制其它台)</Button>
                    </Col>
                    <Col span={6}>
                        <Button type={"primary"} style={{width: 160}} onClick={() => this.props.changeTable()}>换台</Button>
                    </Col>
                    <Col span={6}>
                        <Button type={"primary"} style={{width: 160}} onClick={() => this.props.viewOrderItem()}>订单明细</Button>
                    </Col>
                </Row>
                <Divider></Divider>
                <Row>
                    <Col span={6}>
                        <Button type={"primary"} style={{width: 160}} onClick={() => this.props.printTicket()}>打印下单小票</Button>
                    </Col>
                    <Col span={6}>
                        <Button type={"primary"} style={{width: 160}} onClick={() => this.props.printOrder()}>后厨打印订单明细</Button>
                    </Col>
                </Row>
                <Divider></Divider>
                <Row>
                    <Col span={6}>
                        <Button type={"primary"} style={{width: 160}} onClick={() => this.props.setFree()}>重置为空闲</Button>
                    </Col>
                    <Col span={6}>
                        <Button type={"primary"} style={{width: 160}} onClick={() => this.props.setDinner()}>重置为用餐中</Button>
                    </Col>
                    <Col span={6}>
                        <Button type={"primary"} style={{width: 160}} onClick={() => this.props.setSeat()}>重置为入座点餐中</Button>
                    </Col>
                </Row>
            </Modal>
        )
    }
}