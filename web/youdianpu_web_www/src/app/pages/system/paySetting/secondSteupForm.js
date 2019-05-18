import React, { Fragment, Component } from 'react';
import { Form, Upload, Button, Alert, message, Radio, Modal, Icon } from 'antd';

const FormItem = Form.Item;

class SecondSteupForm extends Component {

    constructor(props) {
        super(props)
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
    
    componentDidMount() {
        this.props.getSqhImage();
    }

    handleCancel = () => this.setState({ previewVisible: false })

    onPreview = (file) => {
        this.setState({ previewVisible: true, previewImage: file.url || file.thumbUrl });
    }

    beforeUpload = (file) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('授权函照片大小不能超过2MB!');
            return false;
        }
        return false;
    }

    onChange = ({ file, fileList }) => {
        if (file.status !== 'removed') {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                return false;
            }
        }
        this.props.sqhOnChange(fileList);
    }

    onRemove = (file) => {
        this.props.removeImage({type: 'sqh', uid: file.uid});//删除formData里面的sqh，为了让校验起作用
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.saveAuthFile(values);
            }
        });
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type={'plus'} />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        const { form, id, fieldChangeValue, sqhList, secondSteupLoading } = this.props;
        const { getFieldDecorator, getFieldValue, getFieldError, getFieldsError } = this.props.form;
        const { previewVisible, previewImage } = this.state;
        let sqhError = null;
        if (this.props.sqh.errors) {
            sqhError = this.props.sqh.errors[0].message;
        }
        return (
            <Fragment>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} label="是否已签约"
                        help={"是否已签约支付宝(当面付)"}
                    >                        
                        {form.getFieldDecorator('alipay_dmf')(
                            <Radio.Group >
                                <Radio.Button value="0">还未签约</Radio.Button>
                                <Radio.Button value="1">我已签约</Radio.Button>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} label="上传授权函"
                        style={{display: form.getFieldValue('alipay_dmf') == "1" ? "none" : ""}}
                        help={sqhError ? sqhError : '请下载授权函按要求填写拍照上传,图片大小不能超过2M'}
                        validateStatus={sqhError ? 'error' : ''}>
                        {form.getFieldDecorator('sqh', {
                            rules: [{ required: form.getFieldValue('alipay_dmf') == "0", message: '请上传授权函,图片大小不能超过2M',}],
                        })(
                            
                            <Upload
                                    name="sqh"
                                    accept={"image/*"}
                                    listType="picture-card"
                                    fileList={sqhList}
                                    showUploadList={true}
                                    onPreview={this.onPreview}
                                    onChange={this.onChange}
                                    beforeUpload={this.beforeUpload}
                                    onRemove={this.onRemove}
                                >
                                    {sqhList.length >= 1 ? null : uploadButton}
                                    
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem wrapperCol={{ span: 18, offset: 4 }}>
                        <Button type="primary" htmlType="submit" loading={secondSteupLoading}>
                            下一步
                        </Button>
                    </FormItem>
                </Form>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Fragment>
        )
    }

}

const SecondSteupFormWarpper = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            alipay_dmf: Form.createFormField({
                value: props.alipay_dmf.value,
            }),
            sqh: Form.createFormField({
                value: props.sqh.value,
            }),
        }
    }
})(SecondSteupForm);

export default SecondSteupFormWarpper;