import React, { Component, Fragment } from 'react';
import { Row, Col, Modal, InputNumber, Alert, Form, Badge, Tag, Input } from 'antd';

export default class DinersNumModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { visible, handleModalVisible, loading, fieldChangeValue, submitOrder, dinersFormData, local_cartList } = this.props;
        return (
            <WrapperDinersNumForm {...dinersFormData}
                handleModalVisible={handleModalVisible}
                loading={loading}
                fieldChangeValue={fieldChangeValue}
                visible={visible}
                submitOrder={submitOrder}
                local_cartList={local_cartList}
            />
        )
    }

}

class DinersNumForm extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if(err) return;
            this.props.submitOrder(values.dinersNum, values.seqNumber);
        });
    }

    render() {
        const { form, dinersNum, loading, visible, handleModalVisible, local_cartList } = this.props;
        const { getFieldDecorator } = form;
        let seqNumberError = null;
        if (this.props.seqNumber.errors) {
            seqNumberError = this.props.seqNumber.errors[0].message;
        }
        let dinersNumError = null;
        if (this.props.dinersNum.errors) {
            dinersNumError = this.props.dinersNum.errors[0].message;
        }
        return (
            <Modal 
                title={"餐牌号以及用餐人数"}
                visible={visible}
                onCancel={() => handleModalVisible(false)}
                onOk={() => this.onSubmit()}
                confirmLoading={loading}
                okText="确认提交订单"
                maskClosable={false}
                cancelText="取消"
            > 
                <Alert message={"注:请务必确认用餐人数,往后会为您店铺统计客流量."} type={"info"} showIcon style={{marginBottom: 16}}/>
                <Form>
                    <Row>
                        <Col span={24}>
                        <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="餐牌号"
                                help={seqNumberError ? seqNumberError : ''}
                                validateStatus={seqNumberError ? 'error' : ''}
                                >
                                {getFieldDecorator('seqNumber', {
                                    rules: [{required: true, message: '请输入餐牌号', whitespace: true, }],
                                })(
                                    <Input
                                        style={{ width: '100%'}}
                                        placeholder="请输入餐牌号"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="用餐人数"
                                help={dinersNumError ? dinersNumError : ''}
                                validateStatus={dinersNumError ? 'error' : ''}
                                >
                                {getFieldDecorator('dinersNum', {
                                    rules: [{required: true, message: '请确认用餐人数' }],
                                    initialValue: dinersNum,
                                })(
                                    <InputNumber
                                        style={{ width: '100%'}}
                                        placeholder="请确认用餐人数"
                                        min={1}
                                        step={1}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                {
                    local_cartList && local_cartList.map(item => {
                        return <span key={item.id}>
                            <Tag style={{fontSize: 14, marginRight: 0}}>{item.name}</Tag>
                            x<span style={{fontSize: 16, fontWeight: 'bold', marginRight: 8}}>{`${item.num}${item.unitName}`}</span>
                        </span>
                    })
                }
            </Modal>
        )
    }
}

const WrapperDinersNumForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            dinersNum: Form.createFormField({
                value: props.dinersNum.value,
            }),
            seqNumber: Form.createFormField({
                value: props.seqNumber.value,
            }),
        }
    }
})(DinersNumForm);