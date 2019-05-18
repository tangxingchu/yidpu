import React, { Component, Fragment } from 'react';
import { Button, Table, Popconfirm, Divider, Input, Form, Select, Spin } from 'antd';

import PointForm from './pointForm';
import styles from './index.less';

export default class PointGift extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { pointFormData, onPhoneChange, loading, phone, selectMemberPoint, giftLoading, giftList, pointGiftFormData, onGiftSelect,
            redemptionGift, redemptionLoading} = this.props;
        return (
            <div className={styles.tableList}>
                <div className={styles.search}>
                    <Input placeholder="请输入会员手机号码" maxLength={20} value={phone} style={{ width: 200, marginRight: 8 }}
                        onChange={e => { onPhoneChange(e.target.value) }}
                        onPressEnter={() => selectMemberPoint(phone)}
                    />
                    <Button type="primary" loading={loading} onClick={() => selectMemberPoint(phone)}>查询</Button>
                </div>
                <PointForm {...pointFormData}/>
                <Divider>礼品</Divider>
                {
                    pointFormData.id.value ? 
                        <WrapperPointGiftForm giftList={giftList} giftLoading={giftLoading} 
                        {...pointGiftFormData}
                        onGiftSelect={onGiftSelect}
                        redemptionGift={redemptionGift}
                        loading={redemptionLoading}
                    />
                    : <div className={styles.tips}>请先查询会员信息</div>
                }                
            </div>
        )
    }

}

class PointGiftForm extends Component {

    onGiftSelect = (value, option) => {
        this.props.onGiftSelect(option.key);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.redemptionGift(values.giftId, values.changeDesc);
            }
        });
    }

    render() {
        const { giftList, giftLoading, loading } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 4 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 16 },
              sm: { span: 16 },
            },
        };
        return (
            <Spin spinning={giftLoading}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item {...formItemLayout} label="选择礼品">
                        {getFieldDecorator('giftId', {
                                rules: [{ required: true, message: '请选择兑换礼品',}],
                            })(
                            <Select showSearch onSelect={this.onGiftSelect}>
                                {
                                    giftList.map(gift => {
                                        return (
                                            <Select.Option key={gift.id} value={gift.id}>{gift.giftName}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="礼品剩余数量">
                        {getFieldDecorator('giftNum')(
                            <Input readOnly/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="兑换所需积分">
                        {getFieldDecorator('giftPoint')(
                            <Input readOnly/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="备注">
                        {getFieldDecorator('changeDesc')(
                            <Input.TextArea rows={5}/>
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 24, offset: 4 }}>
                        <Button type="primary" htmlType="submit" loading={loading}>确认兑换1个</Button>
                    </Form.Item>
                </Form>
            </Spin>
        )
    }
}

const WrapperPointGiftForm = Form.create({
    mapPropsToFields(props) {
        return {
            giftId: Form.createFormField({
                value: props.giftId.value,
            }),
            giftNum: Form.createFormField({
                value: props.giftNum.value,
            }),
            giftPoint: Form.createFormField({
                value: props.giftPoint.value,
            }),
            changeDesc: Form.createFormField({
                value: props.changeDesc.value,
            }),
        }
    }
})(PointGiftForm);



