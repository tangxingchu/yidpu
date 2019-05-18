import React, { PureComponent, Fragment, Component } from 'react';

import { Form, Row, Col, Select, Input, Button } from 'antd';

import styles from './searchForm.less';

const FormItem = Form.Item;
const Option = Select.Option;

class SearchFrom extends PureComponent {

    handleFormReset = () => {
        this.props.form.resetFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSubmit(values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="字典代码">
                            {getFieldDecorator('dictCode')(<Input placeholder="请输入字典代码" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="字典名称">
                            {getFieldDecorator('dictName')(<Input placeholder="请输入字典名称" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                                重置
                            </Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

}

export default Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            dictName: Form.createFormField({
                value: props.dictName.value,
            }),
            dictCode: Form.createFormField({
                value: props.dictCode.value,
            }),
        }
    }
})(SearchFrom);