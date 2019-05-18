import React, { Component, Fragment } from 'react';
import { Button, Table, Popconfirm, Divider, Form, Input, InputNumber, Spin, } from 'antd';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

import PointForm from './pointForm';
import styles from './index.less';
import { rootRouter } from '../../../common/config';

export default class PointCash extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { pointCashFormData } = this.props;
        if(!pointCashFormData.pointCash.value) {
            this.props.selectPointCash();
        }        
    }

    render() {
        const { pointFormData, onPhoneChange, loading, phone, selectMemberPoint, pointCashFormData, 
            selectPointCashLoading, redemptionCash, redemptionLoading, pointCashFormFieldsChange } = this.props;
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
                <Divider>返现</Divider>
                {
                    pointFormData.id.value ? 
                        <WrapperPointCashForm
                            selectPointCashLoading={selectPointCashLoading}
                            {...pointCashFormData}
                            redemptionCash={redemptionCash}
                            loading={redemptionLoading}
                            fieldChangeValue={pointCashFormFieldsChange}
                        />
                    : <div className={styles.tips}>请先查询会员信息</div>
                }
            </div>
        )
    }

}

class PointCashForm extends Component {

    handleSubmit = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.redemptionCash(values.point, values.changeDesc);
            }
        });
    }

    render() {
        const { selectPointCashLoading, loading } = this.props;
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
            <Spin spinning={selectPointCashLoading}>
                <Form onSubmit={this.handleSubmit}>
                    {/* <Form.Item {...formItemLayout} label="选择礼品">
                        {getFieldDecorator('type')(
                            
                        )}
                    </Form.Item> */}
                    <Form.Item {...formItemLayout} label="换现积分">
                        {getFieldDecorator('point', {
                            rules: [{ required: true, message: '请输入换现积分',}],
                        })(
                            <InputNumber min={10} step={10} style={{width: 200}}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="积分返现比例">
                        {getFieldDecorator('pointCash')(
                            <InputNumber readOnly/>
                        )}
                        <span style={{marginLeft: 4, marginRight: 8}}>积分返现￥1元</span><Link to={`${rootRouter}/user/basicInfo`}>更改比例</Link>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="返现金额">
                        {getFieldDecorator('cash')(
                            <Input readOnly/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="备注">
                        {getFieldDecorator('changeDesc')(
                            <Input.TextArea rows={5}/>
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 24, offset: 4 }}>
                        <Popconfirm title={`确认消耗${this.props.point.value}积分返现￥${numeral(this.props.cash.value).format('0,0.00')}吗?`} onConfirm={() => this.handleSubmit()}>
                            <Button type="primary" loading={loading}>确认返现</Button>
                        </Popconfirm>
                    </Form.Item>
                </Form>
            </Spin>
        )
    }
}

const WrapperPointCashForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            type: Form.createFormField({
                value: props.type.value,
            }),
            point: Form.createFormField({
                value: props.point.value,
            }),
            pointCash: Form.createFormField({
                value: props.pointCash.value,
            }),
            cash: Form.createFormField({
                value: props.cash.value,
            }),
            changeDesc: Form.createFormField({
                value: props.changeDesc.value,
            }),
        }
    }
})(PointCashForm);