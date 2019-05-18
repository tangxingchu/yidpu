import React, { Fragment, Component } from 'react';
import { Card, Input, Icon, message, Button, Form, Upload, Spin, Alert, Modal, Select } from 'antd';

import styles from './index.less';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class MerchantInfo extends Component {

    constructor(props) {
        super(props);
        this.removeFileIds = [];
        this.removeZZFileIds = [];
        this.state = {
            previewVisible: false,
            previewImage: '',
        }
    }

    componentDidMount() {
        // this.props.
        //已提交过的资料,查询审核历史
        if(this.props.merchantName && this.props.merchantName.value) {
            this.props.listAuditHis();            
        }
        if(this.props.currMerchantInfo && this.props.currMerchantInfo.yyzzs) {
            this.props.currMerchantInfo.yyzzs.map(item => {
                this.props.getYYZZImageBlob({id: item.id, fileName: item.filePath});
            });            
        }
    }

    handlePreview = (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
    }   
    
    handleCancel = () => this.setState({ previewVisible: false })

    onPreview = (file) => {
        this.setState({ previewVisible: true, previewImage: file.url || file.thumbUrl });
    }

    beforeUpload = (file) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('营业执照照片大小不能超过2MB!');
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
        this.props.yyzzOnChange(fileList);
    }

    onRemove = (file) => {
        //删除已有的资质照片
        if (!file.originFileObj) {
            this.removeZZFileIds.push(file.uid);            
        }
        this.props.removeImage({type: 'yyzz', uid: file.uid});//删除formData里面的yyzz，为了让校验起作用
    }

    beforeUpload_logo = (file) => {
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
            message.error('logo图片大小不能超过1MB!');
            return false;
        }
        return false;
    }

    onChange_logo = ({ file, fileList }) => {
        if (file.status !== 'removed') {
            const isLt1M = file.size / 1024 / 1024 < 1;
            if (!isLt1M) {
                return false;
            }
        }
        this.props.merchantLogoOnChange(fileList);
    }

    onRemove_logo = (file) => {
        this.props.removeImage({type: 'logo', uid: file.uid});//删除formData里面的logo，为了让校验起作用
    }

    beforeUpload_photo = (file) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('照片大小不能超过2MB!');
            return false;
        }
        return false;
    }

    onChange_photo = ({ file, fileList }) => {
        if (file.status !== 'removed') {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                return false;
            }
        }
        this.props.photoOnChange(fileList);
    }

    onRemove_photo = (file) => {
        //删除已有的商铺照片
        if (!file.originFileObj) {
            this.removeFileIds.push(file.uid);            
        }
        this.props.removeImage({type: 'photo', uid: file.uid});//删除formData里面的yyzz，为了让校验起作用        
    }

    commitHandler = () => {
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) return;
            this.props.handleCommit(fieldsValue, this.removeFileIds, this.removeZZFileIds);
        });
    };

    render() {
        const { photoList = [], yyzzList = [], merchantLogoList = [], form, saveLoading, auditHisLoading } = this.props;
        const { previewVisible, previewImage } = this.state;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 4 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 20 },
              sm: { span: 20 },
            },
        };
        const uploadButton = (
            <div>
                <Icon type={'plus'} />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        let merchantPropertyError = null;
        if (this.props.merchantProperty.errors) {
            merchantPropertyError = this.props.merchantProperty.errors[0].message;
        }
        let merchantNameError = null;
        if (this.props.merchantName.errors) {
            merchantNameError = this.props.merchantName.errors[0].message;
        }
        let addressError = null;
        if (this.props.address.errors) {
            addressError = this.props.address.errors[0].message;
        }
        let businessLicenceNoError = null;
        if (this.props.businessLicenceNo.errors) {
            businessLicenceNoError = this.props.businessLicenceNo.errors[0].message;
        }
        let merchantLogoError = null;
        if (this.props.merchantLogo.errors) {
            merchantLogoError = this.props.merchantLogo.errors[0].message;
        }
        let yyzzError = null;
        if (this.props.yyzzs.errors) {
            yyzzError = this.props.yyzzs.errors[0].message;
        }
        let photoError = null;
        if (this.props.photo.errors) {
            photoError =  this.props.photo.errors[0].message;
        }
        let defaultImageError = null;
        if (this.props.defaultImage.errors) {
            defaultImageError = this.props.defaultImage.errors[0].message;
        }
        return (
            <Card bordered={false}>
                <Alert style={{ marginBottom: 16, fontSize: 16}} 
                    message={"尊敬的用户: 您好！因为我们的产品是免费试用35天，为了确保试用的真实性以及更好的试用体验，请您稍微花点时间补充以下信息。"} type="info" ></Alert>
                <Spin spinning={auditHisLoading}>
                    {
                        this.props.auditHisList.map((auditItem, index) => {
                            return (
                                <Alert style={{ marginBottom: 16, }} message={`第${index+1}次审核。未通过。原因：${auditItem.auditRemark}。`} type="info" key={auditItem.id} showIcon />
                            )
                        })
                    }
                </Spin>
                <Form >
                    <FormItem
                        {...formItemLayout}
                            label="店铺类型"
                            help={merchantPropertyError ? merchantPropertyError : '快餐厅是以顾客维度下单，中小餐厅是以桌台维度下单'}
                            validateStatus={merchantPropertyError ? 'error' : ''}
                        >
                        {getFieldDecorator('merchantProperty', {
                            rules: [{
                                required: true, message: '请选择您店铺类型',
                            }],
                        })(
                            <Select>
                                <Select.Option key={"1"} value={1}>快餐厅</Select.Option>
                                {/* <Select.Option key={"2"} value={2}>中小餐厅</Select.Option> */}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                            label="店铺名称"
                            help={merchantNameError ? merchantNameError : ''}
                            validateStatus={merchantNameError ? 'error' : ''}
                        >
                        {getFieldDecorator('merchantName', {
                            rules: [{
                                required: true, message: '店铺名称必须在上传的店铺照片中出现', whitespace: true,
                            }],
                        })(
                            <Input placeholder={"店铺名称"} maxLength={50}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="店铺logo"
                        help={merchantLogoError ? merchantLogoError : '请上传您的店铺logo,不能超过1M'}
                        validateStatus={merchantLogoError ? 'error' : ""}
                    >
                        {getFieldDecorator('merchantLogo',  {
                            rules: [{
                                required: true, message: '请您上传店铺logo,方便顾客在扫码支付时确认是您的店铺',
                            }],
                        })(
                            <Upload
                                name="merchantLogo"
                                accept={"image/*"}
                                listType="picture-card"
                                fileList={merchantLogoList}
                                showUploadList={true}
                                onPreview={this.onPreview}                                
                                onChange={this.onChange_logo}
                                beforeUpload={this.beforeUpload_logo}
                                onRemove={this.onRemove_logo}
                            >
                                {merchantLogoList.length >= 1 ? null : uploadButton}
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                            label="店铺地址"
                            help={addressError ? addressError : ''}
                            validateStatus={addressError ? 'error' : ''}
                        >
                        {getFieldDecorator('address', {
                            rules: [{
                                required: true, message: '请输入店铺地址', whitespace: true,
                            }],
                        })(
                            <Input placeholder={"请输入真实店铺地址以方便客户快速定位店铺位置"} maxLength={120}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                            label="店铺描述"
                        >
                        {getFieldDecorator('remark')(
                            <TextArea placeholder={"请输入店铺描述、经验理念等等"} rows={5} maxLength={500}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                            label="营业执照编号"
                            help={businessLicenceNoError ? businessLicenceNoError : ''}
                            validateStatus={businessLicenceNoError ? 'error' : ''}
                        >
                        {getFieldDecorator('businessLicenceNo', {
                            rules: [{
                                required: true, message: '请输入营业执照编号', whitespace: true,
                            }],
                        })(
                            <Input placeholder={"请输入营业执照编号，必须与上传的营业执照上一致。"} maxLength={30}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="相关资质"
                        help={yyzzError ? yyzzError : '请上传相关资质(营业执照、***经营许可证等等,这些是往后申请支付宝、微信支付必须的),每张照片大小不能超过2M'}
                        validateStatus={yyzzError ? 'error' : ""}
                    >
                        {getFieldDecorator('yyzzs',  {
                            rules: [{
                                required: true, message: '请上传相关资质(营业执照、***经营许可证等等)',
                            }],
                        })(
                            <Upload
                                name="yyzzs"
                                accept={"image/*"}
                                listType="picture-card"
                                fileList={yyzzList}
                                showUploadList={true}
                                onPreview={this.onPreview}                                
                                onChange={this.onChange}
                                beforeUpload={this.beforeUpload}
                                onRemove={this.onRemove}
                            >
                                {yyzzList.length >= 5 ? null : uploadButton}
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="上传店铺照片"
                        help={photoError ? photoError : '最多上传5张店铺照片,每张照片大小不能超过2M.'}
                        validateStatus={photoError ? 'error' : ""}
                    >
                        {getFieldDecorator('photo', {
                            rules: [{
                                required: true, message: '请上传店铺照片,其中一张照片请包含店铺名称(申请支付宝支付必须)',
                            }],
                        })(
                            <Upload name="photo"
                                listType="picture-card"
                                accept={"image/*"}
                                showUploadList={true}
                                fileList={photoList}
                                onPreview={this.onPreview}
                                beforeUpload={this.beforeUpload_photo}
                                onChange={this.onChange_photo}
                                onRemove={this.onRemove_photo}
                            >
                                {photoList.length >= 5 ? null : uploadButton}
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="默认显示照片"
                        help={defaultImageError ? defaultImageError : '请先上传一张照片'}
                        validateStatus={defaultImageError ? 'error' : ''}>
                        {getFieldDecorator('defaultImage', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择默认显示照片',
                                },
                            ],
                        })(
                            <Select
                                placeholder="默认显示照片"
                                onChange={(value) => {this.props.defaultImageChange(value)}}
                            >
                                {
                                    photoList.map((item, index) => {
                                        return (
                                            <Select.Option key={item.uid} value={item.uid}>第{index + 1}张-{item.name || item.originFileObj.name}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem style={{textAlign: 'center'}}>
                        <Button type="primary" loading={saveLoading} onClick={() => {this.commitHandler()}}>提交</Button>
                    </FormItem>
                </Form>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Card>
        )
    }

}

const CreateFormWarpper = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            merchantProperty: Form.createFormField({
                value: props.merchantProperty.value,
            }),
            merchantName: Form.createFormField({
                value: props.merchantName.value,
            }),
            merchantLogo: Form.createFormField({
                value: props.merchantLogo.value,
            }),
            address: Form.createFormField({
                value: props.address.value,
            }),
            remark: Form.createFormField({
                value: props.remark.value,
            }),
            businessLicenceNo: Form.createFormField({
                value: props.businessLicenceNo.value,
            }),
            yyzzs: Form.createFormField({
                value: props.yyzzs.value,
            }),
            photo: Form.createFormField({
                value: props.photo.value,
            }),
            defaultImage: Form.createFormField({
                value: props.defaultImage.value,
            }),
        }
    }
})(MerchantInfo);

export default CreateFormWarpper;