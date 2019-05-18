import React, { Component } from 'react';
import moment from 'moment';
import { Form, Input, Button, DatePicker, Modal, Radio, AutoComplete, Alert } from 'antd';
import 'moment/locale/zh-cn';
moment.locale('zh-CN')

import { getSub } from '../../../utils/authority';

const FormItem = Form.Item;
const Option = AutoComplete.Option;
const dateFormat = 'YYYY-MM-DD';

class CreateForm extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.listEmployee({});
    }

    handleSearch = (value) => {
        this.props.handleSearch(value);
    }

    disabledEffectiveTime = (current) => {
        return current && current < moment().subtract(1, 'days');
    }

    disabledExpirationTime = (current) => {
        const effectiveTime = this.props.effectiveTime.value;
        if (!current || !effectiveTime) {
            return false;
        }
        return current.valueOf() <= effectiveTime.valueOf();
    }

    validateAccountFields = (rule, value, callback) => {
        if (!value || !/^[A-Za-z0-9]+$/.test(value)) {
            callback("子账户必须是数字与字母的组合");
        }
        callback();
    }

    getRealSub = () => {
        const sub = getSub();
        if(sub.indexOf(":") > -1) {
            return sub.split(":")[0]
        } else {
            return sub;
        }
    }

    render() {
        const { modalVisible, form, handleAdd, handleUpdate, handleModalVisible, confirmLoading, autoCompleteData } = this.props;
        const { getFieldDecorator, getFieldValue, getFieldError, getFieldsError } = this.props.form;
        const isUpdate = !!this.props.id.value;
        const okHandle = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                if (isUpdate) {
                    handleUpdate(fieldsValue, () => {
                        this.props.resetFields()
                    });
                } else {
                    handleAdd(fieldsValue, () => {
                        this.props.resetFields()
                    });
                }
            });
        };
        /** redux 与 onFieldsChange 会校验提示显示不出来,
         * https://github.com/ant-design/ant-design/issues/3794
         * 那就手动显示错误信息吧
         */
        let accountError = null;
        if (this.props.account.errors) {
            accountError = this.props.account.errors[0].message;
        }
        let realnameError = null;
        if (this.props.realname.errors) {
            realnameError = this.props.realname.errors[0].message;
        }
        let effectiveTimeError = null;
        if (this.props.effectiveTime.errors) {
            effectiveTimeError = this.props.effectiveTime.errors[0].message;
        }
        let expirationTimeError = null;
        if (this.props.expirationTime.errors) {
            expirationTimeError = this.props.expirationTime.errors[0].message;
        }
        let phoneError = null;
        if (this.props.phone.errors && getFieldValue('hasEmployee') === '2') {
            phoneError = this.props.phone.errors[0].message;
        }
        const children = autoCompleteData.map((item) => {
            const text = `${item.fullName}-${item.mobileTelephone}`;
            return <Option key={item.id}>{text}</Option>;
        });
        return (
            <Modal
                title={isUpdate ? "修改子账户" : "新建子账户"}
                visible={modalVisible}
                okText="保存"
                onOk={okHandle}
                width={600}
                confirmLoading={confirmLoading}
                cancelText="取消"
                onCancel={() => { this.props.resetFields(); handleModalVisible() }}
            >
                <FormItem>
                    <Alert message={"子账号初始密码：456789"}/>
                </FormItem>
                <FormItem style={{ display: 'none' }}>
                    {form.getFieldDecorator('id')(<Input disabled />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} label="登录账号"
                    help={accountError ? accountError : `子账户登录输入 ${this.getRealSub()}:${this.props.account.value}`}
                    validateStatus={accountError ? 'error' : ''}>
                    {form.getFieldDecorator('account', {
                        rules: [{ required: true, message: '请输入账号', whitespace: true, }, {
                            validator: this.validateAccountFields,
                        }],
                    })(<Input addonBefore={`${this.getRealSub()}:`} placeholder="必须是数字与字母的组合" autoFocus />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} label="是否已添加员工">
                    {getFieldDecorator('hasEmployee')(
                        <Radio.Group>
                            <Radio value="1">已添加员工</Radio>
                            <Radio value="2">暂时还不想添加员工</Radio>
                        </Radio.Group>
                    )}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} label="关联员工" style={{ display: getFieldValue('hasEmployee') === '1' ? 'block' : 'none', }}>
                    {getFieldDecorator('employeeId')(
                        <AutoComplete
                            style={{ width: '100%' }}
                            onSearch={this.handleSearch}
                            placeholder="输入姓名或者手机号码自动关联"
                        >
                            {children}
                        </AutoComplete>
                    )}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} label="真实姓名" style={{ display: getFieldValue('hasEmployee') === '2' ? 'block' : 'none', }}
                    help={realnameError ? realnameError : ''}
                    validateStatus={realnameError ? 'error' : ''}>
                    {form.getFieldDecorator('realname', {
                        rules: [{ required: getFieldValue('hasEmployee') === '2', message: '请输入真实姓名', whitespace: true, }],
                    })(<Input placeholder="请输入真实姓名" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} label="手机号码" style={{ display: getFieldValue('hasEmployee') === '2' ? 'block' : 'none', }}
                    help={phoneError ? phoneError : ''}
                    validateStatus={phoneError ? 'error' : ''}>
                    {form.getFieldDecorator('phone', {
                        rules: [{ required: getFieldValue('hasEmployee') === '2', message: '请输入手机号码', whitespace: true, }],
                    })(<Input placeholder="请输入手机号码" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} label="生效时间"
                    help={effectiveTimeError ? effectiveTimeError : "立即生效请选择此刻"} 
                    validateStatus={effectiveTimeError ? 'error' : ''}>
                    {form.getFieldDecorator('effectiveTime', {
                        initialValue: moment(),
                        rules: [{ required: true, message: '请输入生效时间'}],
                    })(<DatePicker placeholder="生效时间" disabledDate={this.disabledEffectiveTime} showTime
                        format="YYYY-MM-DD HH:mm:ss" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} label="失效时间"
                    help={expirationTimeError ? expirationTimeError : ''}
                    validateStatus={expirationTimeError ? 'error' : ''}>
                    {form.getFieldDecorator('expirationTime', {
                        rules: [{ required: true, message: '请输入失效时间'}],
                    })(<DatePicker placeholder="失效时间" disabledDate={this.disabledExpirationTime} showTime format="YYYY-MM-DD HH:mm:ss" />)}
                </FormItem>
            </Modal>
        );
    }

}

const formatDate = (value) => {
    if (value) {
        return moment(value, dateFormat);
    } else {
        return value;
    }
}

const CreateFormWarpper = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            id: Form.createFormField({
                value: props.id.value,
            }),
            account: Form.createFormField({
                value: props.account.value,
            }),
            realname: Form.createFormField({
                value: props.realname.value,
            }),
            employeeId: Form.createFormField({
                value: props.employeeId.value,
            }),
            phone: Form.createFormField({
                value: props.phone.value,
            }),
            effectiveTime: Form.createFormField({
                value: formatDate(props.effectiveTime.value),
            }),
            expirationTime: Form.createFormField({
                value: formatDate(props.expirationTime.value),
            }),
            hasEmployee: Form.createFormField({
                value: props.hasEmployee.value,
            }),
        }
    }
})(CreateForm);

export default CreateFormWarpper;