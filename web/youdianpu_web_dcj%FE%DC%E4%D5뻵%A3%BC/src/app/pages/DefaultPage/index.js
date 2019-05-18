import React, { Component, Fragment } from 'react';
import { Card, Form, Input, Button, Row, Col } from 'antd';


class Defaultpage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("我来了");
    }

    componentWillUnmount() {

    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if(err) return;
            this.props.connectServer(values);
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 10 },
              sm: { span: 10 },
            },
            wrapperCol: {
              xs: { span: 14 },
              sm: { span: 14 },
            },
        };
        return (
            <Card title="请连接点餐服务">
                <Form className="login-form">
                    <Form.Item {...formItemLayout} label={"服务IP地址"}>
                        {getFieldDecorator('ip', {
                            rules: [{ required: true, message: '请输入点餐服务IP地址', whitespace: true }],
                        })(
                            <Input size="large" style={{ width: 300 }} placeholder="点餐服务IP地址"/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={"端口"}>
                        {getFieldDecorator('port', {
                            rules: [{ required: true, message: '请输入端口号', whitespace: true }],
                        })(
                                <Input size="large" style={{ width: 300 }}  placeholder="端口默认是1688" maxLength="4"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Row>
                            <Col offset={12}>
                                <Button type={"primary"} loading={this.props.loading} onClick={() => this.handleSubmit()}>
                                连接
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Card>
        );
    }

}

const WrappedDefaultpage = Form.create()(Defaultpage);

export default WrappedDefaultpage;