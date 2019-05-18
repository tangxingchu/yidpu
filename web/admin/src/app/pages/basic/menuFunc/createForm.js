import React, { PureComponent } from 'react';
import {
    Form,
    Input,
    DatePicker,
    Select,
    Button,
    Card,
    InputNumber,
    Switch,
    Radio,
    Icon,
    message,
    Tooltip,
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class CreateForm extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const isUpdate = !!this.props.id.value;
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                if (isUpdate) {
                    this.props.updateFunction(fieldsValue, () => {
                        form.resetFields()
                    });
                } else {
                    this.props.saveFunction(fieldsValue, () => {
                        form.resetFields()
                    });
                }
            }
        });
    }

    render() {
        const { saveLoading, parentFunction } = this.props;
        const { getFieldDecorator, getFieldValue, getFieldError, getFieldsError } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 10 },
            },
        };
        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };
        /** redux 与 onFieldsChange 会校验提示显示不出来,
         * https://github.com/ant-design/ant-design/issues/3794
         * 那就手动显示错误信息吧
         */
        let functionNameError = null;
        if (this.props.functionName.errors) {
            functionNameError = this.props.functionName.errors[0].message;
        }
        let functionCodeError = null;
        if (this.props.functionCode.errors) {
            functionCodeError = this.props.functionCode.errors[0].message;
        }
        let functionUriError = null;
        if (this.props.functionUri.errors) {
            functionUriError = this.props.functionUri.errors[0].message;
        }
        let gradeError = null;
        if (this.props.grade.errors) {
            gradeError = this.props.grade.errors[0].message;
        }
        return (
            <Card bordered={false} title={"新建&&修改function"}>
                <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
                    <FormItem style={{ display: 'none' }}>
                        {getFieldDecorator('id')(<Input disabled />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="父功能菜单">
                        {getFieldDecorator('parentId')(
                            <Select disabled>
                                <Option value={parentFunction ? parentFunction.id : ""}>{parentFunction ? parentFunction.functionName : ""}</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="功能菜单名"
                        help={functionNameError ? functionNameError : ''}
                        validateStatus={functionNameError ? 'error' : ''}>
                        {getFieldDecorator('functionName', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入功能菜单名称',
                                },
                            ],
                        })(<Input placeholder="功能菜单名" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="功能菜单编码"
                        help={functionCodeError ? functionCodeError : ''}
                        validateStatus={functionCodeError ? 'error' : ''}>
                        {getFieldDecorator('functionCode', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入功能菜单编码',
                                },
                            ],
                        })(<Input placeholder="功能菜单编码" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="功能菜单URI"
                        help={functionUriError ? functionUriError : ''}
                        validateStatus={functionUriError ? 'error' : ''}>
                        {getFieldDecorator('functionUri', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入功能菜单URI',
                                },
                            ],
                        })(<Input placeholder="功能菜单URI" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="功能菜单Icon">
                        {getFieldDecorator('functionIcon')(<Input placeholder="antd的icon" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="功能菜单类型">
                        {getFieldDecorator('functionType', {
                            initialValue: "1",
                        })(
                            <Select>
                                {this.props.dictItemMap["DICT_MERCHANT_FUNCTION_TYPE"] ? this.props.dictItemMap["DICT_MERCHANT_FUNCTION_TYPE"].map(item => {
                                    return <Option key={item.id} value={item.itemValue}>{item.itemName}</Option>
                                }) : null}
                            </Select>
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="是否启用">
                        {getFieldDecorator('enabled', {
                            valuePropName: 'checked'
                        })(
                            <Switch />
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="排序">
                        {getFieldDecorator('sortNo',  { initialValue: 1 })(
                            <InputNumber min={1} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="功能菜单行业分类">
                        {getFieldDecorator('functionCategory', {
                            initialValue: "0",
                        })(
                            <Select>
                                <Option value="0">所有行业</Option>
                                {this.props.dictItemMap["DICT_MERCHANT_CATEGORY"] ? this.props.dictItemMap["DICT_MERCHANT_CATEGORY"].map(item => {
                                    return <Option key={item.id} value={item.itemValue}>{item.itemName}</Option>
                                }) : null}
                            </Select>
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="商家等级"
                        help={gradeError ? gradeError : '商家必须达到该等级才有此功能权限'}
                        validateStatus={gradeError ? 'error' : ''}>
                        {getFieldDecorator('grade', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择商家等级',
                                },
                            ],
                        })(
                            <Select placeholder="商家必须达到该等级才有此功能权限">
                                {this.props.dictItemMap["DICT_MERCHANT_GRADE"] ? this.props.dictItemMap["DICT_MERCHANT_GRADE"].map(item => {
                                    return <Option key={item.id} value={item.itemValue}>{item.itemName}</Option>
                                }) : null}
                            </Select>
                            )}
                    </FormItem>
                    <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                        <Button disabled={!parentFunction} type="primary" htmlType="submit" loading={saveLoading}>
                            保存
                        </Button>   
                    </FormItem>
                </Form>
            </Card>
        );
    }

}

const CreateFormWrapper = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            id: Form.createFormField({
                value: props.id.value,
            }),
            functionName: Form.createFormField({
                value: props.functionName.value,
            }),
            functionCode: Form.createFormField({
                value: props.functionCode.value,
            }),
            functionIcon: Form.createFormField({
                value: props.functionIcon.value,
            }),
            functionUri: Form.createFormField({
                value: props.functionUri.value,
            }),
            functionType: Form.createFormField({
                value: props.functionType.value,
            }),
            enabled: Form.createFormField({
                value: props.enabled.value,
            }),
            sortNo: Form.createFormField({
                value: props.sortNo.value,
            }),
            functionCategory: Form.createFormField({
                value: props.functionCategory.value,
            }),
            parentId: Form.createFormField({
                value: props.parentId.value,
            }),
            grade: Form.createFormField({
                value: props.grade.value,
            }),
        }
    }
})(CreateForm);

export default CreateFormWrapper