import React, { Fragment, Component } from 'react';
import { Card, Row, Col, Button, Spin, message, Input, Form, Upload, Icon, Modal, Alert } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import smsSignActions from '../../../actions/smsSign';
import styles from './index.less';
import smsjpg from './sms.jpg';

class SmsSign extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { formData } = this.props.smsSign;
        if(!formData.signName.value) {
            this.props.smsSignActions.selectSMSSign().then((data) => {
                if(data && data.signName) {
                    this.props.smsSignActions.getSqhImage();
                }
            });
        }
    }

    saveSMSSign = (fieldValues) => {
        const { sqhList } = this.props.smsSign;
        let formData = new FormData();
        formData.append("signName", fieldValues.signName);
        if(sqhList && sqhList.length > 0) {
            formData.append("sqh", sqhList[0].originFileObj);
        }
        this.props.smsSignActions.saveSMSSign(formData).then(() => {
            message.success("提交成功,1个自然日内应用内通知您结果");
        });
    }

    render() {
        const { loading, formData, sqhList, saveLoading } = this.props.smsSign;
        const { fieldChangeValue, onImageChange, removeImage } = this.props.smsSignActions;
        return (
            <PageHeaderLayout
                title="短信签名"
                content={`在会员消费的时候,需要会员手机号码收到的动态密码告知收银员。会员充值、消费余额短信提醒。短信内容里面的签名【您设置的签名】。
                    如果您不设置签名，默认签名是【一点谱】`}
            >
                <Card bordered={false}>
                    <div className={styles.content}>
                        <div className={styles.demo}>
                            <div style={{marginBottom: 8}}>短信签名示例:【一点谱】为签名</div>
                            <img src={smsjpg}/>
                        </div>
                        <div className={styles.sign}>
                            <Spin spinning={loading}>
                                <SMSSignFormWrapper {...formData} sqhList={sqhList}
                                    fieldChangeValue={fieldChangeValue}
                                    onImageChange={onImageChange}
                                    removeImage={removeImage}
                                    saveSMSSign={this.saveSMSSign}
                                    saveLoading={saveLoading}
                                />
                            </Spin>
                        </div>
                    </div>
                </Card>
            </PageHeaderLayout>
        )
    }

}

class SMSSignForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
        }
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    } 

    handleCancel = () => this.setState({ previewVisible: false })

    handleSubmit = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err) return;
            this.props.saveSMSSign(values);
        });
    }

    onChange = ({ file, fileList }) => {
        if (file.status !== 'removed') {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                return false;
            }
        }
        this.props.onImageChange(fileList);
    }

    onRemove = (file) => {
        if(this.props.signStatus.value == "1" || this.props.signStatus.value == "0") {
            return false;
        }
        this.props.removeImage();//删除formData里面的sqh，为了让校验起作用
    }

    beforeUpload = (file) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('照片大小不能超过2MB!');
            return false;
        }
        return false;
    }

    onPreview = (file) => {
        this.setState({ previewVisible: true, previewImage: file.url || file.thumbUrl });
    }

    render() {
        const { previewVisible, previewImage } = this.state;
        const { form, sqhList, saveLoading } = this.props;
        const { getFieldDecorator } = form;
        const uploadButton = (
            <div>
                <Icon type={'plus'} />
                <div className="ant-upload-text">上传</div>
            </div>
        );
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
        let sqhError = null;
        if (this.props.sqh.errors) {
            sqhError = this.props.sqh.errors[0].message;
        }
        let signNameError = null;
        if (this.props.signName.errors) {
            signNameError = this.props.signName.errors[0].message;
        }
        return (
            <Fragment>
                <Alert message="我们使用的是阿里云短信服务平台,请认真填写签名,一旦阿里云审核通过就不在支持修改。" showIcon type={"warning"} style={{marginBottom: 16}}/>
                <Form>
                    <Form.Item {...formItemLayout} label="签名"
                        help={signNameError ? signNameError : `授权委托书中的被授权方名称请填写[湖南一点谱科技有限公司]`}
                        validateStatus={signNameError ? 'error' : ''}
                    >
                        {getFieldDecorator('signName', {
                            rules: [{ required: true, message: '请输入签名',}],
                        })(
                            <Input placeholder="签名一般为店铺名称或店铺简称" maxLength={20} style={{width: 300}} 
                                readOnly={this.props.signStatus.value == "1" || this.props.signStatus.value == "0" ? true : false}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="上传授权委托书"
                        help={sqhError ? sqhError : '请下载授权委托书按要求填写拍照上传,图片大小不能超过2M'}
                        validateStatus={sqhError ? 'error' : ''}>
                        {form.getFieldDecorator('sqh', {
                            rules: [{ required: true, message: '请上传授授权委托书,图片大小不能超过2M',}],
                        })(
                            
                            <Upload
                                    name="sqh"
                                    accept={"image/*"}
                                    listType="picture-card"
                                    fileList={sqhList}
                                    onPreview={this.onPreview}
                                    onChange={this.onChange}
                                    beforeUpload={this.beforeUpload}
                                    onRemove={this.onRemove}
                                >
                                    {sqhList.length >= 1 ? null : uploadButton}
                                    
                            </Upload>
                        )}
                        <div><a href='https://files.alicdn.com/tpsservice/da71622cd863004dd3a8d16466a20d12.doc'>下载【授权委托书】模板</a></div>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 24, offset: 6 }}>
                        {
                            this.props.signStatus && this.props.signStatus.value == "1" ?
                            <Fragment>
                                <div>待审核中...</div>
                                <Button type="primary" loading={saveLoading} disabled>提交</Button>
                            </Fragment>
                            :
                            this.props.signStatus && this.props.signStatus.value == "0" ?
                            <div style={{color: '#87d068'}}>审核已通过</div>
                            :
                            <Button type="primary" loading={saveLoading} onClick={() => this.handleSubmit()}>提交</Button>
                        }
                    </Form.Item>
                </Form>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Fragment>
        )
    }
}

const SMSSignFormWrapper = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            signName: Form.createFormField({
                value: props.signName.value,
            }),
            sqh: Form.createFormField({
                value: props.sqh.value,
            }),
            signStatus: Form.createFormField({
                value: props.signStatus.value,
            }),
        }
    }
})(SMSSignForm);

export default connect((state) => {
    return {
        smsSign: state.smsSign,
    }
}, (dispatch) => {
    return { smsSignActions: bindActionCreators(smsSignActions, dispatch) }
})(SmsSign);