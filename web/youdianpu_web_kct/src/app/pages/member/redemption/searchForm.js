import React, { Component, Fragment } from 'react';
import { Row, Col, Form, Button, Input } from 'antd';

class SearchForm extends Component {

    constructor(props) {
        super(props)
    }

    resetForm = () => {
        this.props.resetFields();
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err) return;
            this.props.handleSearch(values);
        });
    }

    render() {
        const { form, loading,  } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 6 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 18 },
              sm: { span: 18 },
            },
        };
        return (
            <Form onSubmit={this.handleSearch}>
                <Row>
                    <Col span={10}>
                        <Form.Item {...formItemLayout} label="手机号码"
                        >
                            {getFieldDecorator('phone')(
                                <Input placeholder="会员手机号码" maxLength={20}/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={14} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" loading={loading}>查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={() => this.resetForm()}>重置</Button>
                    </Col>
                </Row>
            </Form>
        )
    }

}

const WrapperSearchForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            phone: Form.createFormField({
                value: props.phone.value,
            }),
        }
    }
})(SearchForm);

export default WrapperSearchForm;