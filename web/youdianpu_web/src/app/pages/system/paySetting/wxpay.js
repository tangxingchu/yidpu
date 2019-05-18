import React, { Fragment, Component } from 'react';
import { Tabs, Icon, Card, Spin, Steps, Button, Alert, Input, Select, Form, Modal, Upload, message, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { shell } from 'electron';

import wxpay1Png from './wxpay_1.png';
import wxpay2_1Png from './wxpay_2_1.png';
import wxpay2_2Png from './wxpay_2_2.png';
import wxpay3_1Png from './wxpay_3_1.png';
import wxpay3_2Png from './wxpay_3_2.png';
import Result from '../../../components/Result';
import styles from './index.less';

const TabPane = Tabs.TabPane;
const Step = Steps.Step; 

export default class WXPaySetting extends Component {

    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
        }
    }

    handleCancel = () => this.setState({ previewVisible: false })

    onPreview = (file) => {
        this.setState({ previewVisible: true, previewImage: file.url || file.thumbUrl });
    }

    render() {
        const { current = 0, wxpayFormData, yyzzList, getYYZZImageBlob, currMerchantInfo, wxpayFormFieldChangeValue,
            identityPhotoFrontOnChange, identityPhotoBackOnChange, orgPhotoOnChange, removeImage, identityPhotoBackList,
            identityPhotoFrontList, orgPhotoList, wxpayInfoSaveLoading, saveWxpayInfo, wxpayInfoLoading, getWxPayInfo,
            wxpayInfoData, getWxpayImage, updateWxpaySteup } = this.props;
        const { previewVisible, previewImage } = this.state;
        const steps = [{
            title: '资料提交(微信审核需要)',
            content: <FirstContentWarpper {...wxpayFormData} 
                yyzzList={yyzzList}
                identityPhotoFrontList={identityPhotoFrontList}
                identityPhotoBackList={identityPhotoBackList}
                orgPhotoList={orgPhotoList}
                getYYZZImageBlob={getYYZZImageBlob}
                currMerchantInfo={currMerchantInfo}
                onPreview={this.onPreview}
                fieldChangeValue={wxpayFormFieldChangeValue}
                identityPhotoFrontOnChange={identityPhotoFrontOnChange}
                identityPhotoBackOnChange={identityPhotoBackOnChange}
                orgPhotoOnChange={orgPhotoOnChange}
                removeImage={removeImage}
                wxpayInfoSaveLoading={wxpayInfoSaveLoading}
                saveWxpayInfo={saveWxpayInfo}
                wxpayInfoLoading={wxpayInfoLoading}
                getWxPayInfo={getWxPayInfo}
                wxpayInfoData={wxpayInfoData}
                getWxpayImage={getWxpayImage}
            >
            </FirstContentWarpper>,
          }, {
            title: '资料审核(微信)',
            content: <SecondContent {...wxpayFormData} wxpayInfoSaveLoading={wxpayInfoSaveLoading}
                updateWxpaySteup={updateWxpaySteup}>
                </SecondContent>,
          }, {
            title: '账户验证(您)',
            content: <ThridContent wxpayInfoSaveLoading={wxpayInfoSaveLoading}
                updateWxpaySteup={updateWxpaySteup}>
                </ThridContent>,
          }, {
            title: '签署协议(您)',
            content: <FourthContent wxpayInfoSaveLoading={wxpayInfoSaveLoading}
                updateWxpaySteup={updateWxpaySteup}>
                </FourthContent>,
        }, {
            title: '开发配置(一点谱)',
            content: <FiveContent></FiveContent>,
        }, {
            title: '完成',
            content: <FinishedContent></FinishedContent>,
        }];
        return (
            <Fragment>
                <Alert message="微信费率为0.6%(实体业)，由微信官方收取，结算周期为T+1 。以下是申请微信支付，微信官方审核需要您提供的资料。" type="info" showIcon/>
                <Steps current={current} style={{marginTop:24}}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className={styles.stepsContent}>{steps[current] && steps[current].content}</div>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Fragment>
        )
    }

}


class FirstContent extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.yyzzList.length == 0) {
            if(this.props.currMerchantInfo && this.props.currMerchantInfo.yyzzs) {
                this.props.currMerchantInfo.yyzzs.map(item => {
                    this.props.getYYZZImageBlob({id: item.id, fileName: item.filePath});
                });
            }
        }
        if(this.props.wxpayInfoData == null) {
            this.props.getWxPayInfo().then(data => {
                if(data.identityPhotoFrontPath) {
                    this.props.getWxpayImage(data.identityPhotoFrontPath, "identityPhotoFront")
                }
                if(data.identityPhotoBackPath) {
                    this.props.getWxpayImage(data.identityPhotoBackPath, "identityPhotoBack")
                }
                if(data.orgPhotoPath) {
                    this.props.getWxpayImage(data.orgPhotoPath, "orgPhoto")
                }
            });
        }
    }

    onChange_identityPhotoFront = ({ file, fileList }) => {
        if (file.status !== 'removed') {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                return false;
            }
        }
        this.props.identityPhotoFrontOnChange(fileList);
    }

    onChange_identityPhotoBack = ({ file, fileList }) => {
        if (file.status !== 'removed') {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                return false;
            }
        }
        this.props.identityPhotoBackOnChange(fileList);
    }

    onChange_orgPhoto = ({ file, fileList }) => {
        if (file.status !== 'removed') {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                return false;
            }
        }
        this.props.orgPhotoOnChange(fileList);
    }

    onRemove = (file, type) => {
        this.props.removeImage({type, uid: file.uid});//删除formData里面的logo，为了让校验起作用
    }

    beforeUpload = (file) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('照片大小不能超过2MB!');
            return false;
        }
        return false;
    }

    handleSubmit = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err) return;
            this.props.saveWxpayInfo(values);
        });
    }

    render() {
        const { form, id, fieldChangeValue, yyzzList = [], identityPhotoFrontList = [], identityPhotoBackList=[], orgPhotoList=[], 
            onPreview, wxpayInfoSaveLoading } = this.props;
        const { getFieldDecorator, getFieldValue, getFieldError, getFieldsError } = this.props.form;
        const uploadButton = (
            <div>
                <Icon type={'plus'} />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        let contactsNameError = null;
        if (this.props.contactsName.errors) {
            contactsNameError = this.props.contactsName.errors[0].message;
        }
        let phoneError = null;
        if (this.props.phone.errors) {
            phoneError = this.props.phone.errors[0].message;
        }
        let emailError = null;
        if (this.props.email.errors) {
            emailError = this.props.email.errors[0].message;
        }
        let merchantNameError = null;
        if (this.props.merchantName.errors) {
            merchantNameError = this.props.merchantName.errors[0].message;
        }
        let servicePhoneError = null;
        if (this.props.servicePhone.errors) {
            servicePhoneError = this.props.servicePhone.errors[0].message;
        }
        let businessLicenceNoError = null;
        if (this.props.businessLicenceNo.errors) {
            businessLicenceNoError = this.props.businessLicenceNo.errors[0].message;
        }
        let identityPhotoFrontError = null;
        if (this.props.identityPhotoFront.errors) {
            identityPhotoFrontError = this.props.identityPhotoFront.errors[0].message;
        }
        let identityPhotoBackError = null;
        if (this.props.identityPhotoBack.errors) {
            identityPhotoBackError = this.props.identityPhotoBack.errors[0].message;
        }
        let accountNameError = null;
        if (this.props.accountName.errors) {
            accountNameError = this.props.accountName.errors[0].message;
        }
        let accountBankError = null;
        if (this.props.accountBank.errors) {
            accountBankError = this.props.accountBank.errors[0].message;
        }
        let accountFockbackError = null;
        if (this.props.accountFockback.errors) {
            accountFockbackError = this.props.accountFockback.errors[0].message;
        }
        let accountNoError = null;
        if (this.props.accountNo.errors) {
            accountNoError = this.props.accountNo.errors[0].message;
        }
        const formItemLayout = {
            labelCol: {
              xs: { span: 6 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 12 },
              sm: { span: 12 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 6,
                offset: 0,
              },
              sm: {
                span: 12,
                offset: 6,
              },
            },
        };
        return (
            <Spin spinning={this.props.wxpayInfoLoading}>
                <Form>
                    <Form.Item style={{ display: 'none' }}>
                        {form.getFieldDecorator('id')(<Input disabled />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="联系人姓名"
                        help={contactsNameError ? contactsNameError : ''}
                        validateStatus={contactsNameError ? 'error' : ''}>
                        {form.getFieldDecorator('contactsName', {
                            rules: [{ required: true, message: '请输入联系人姓名', whitespace: true, }],
                        })(
                            <Input placeholder="联系人姓名" maxLength={20}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="手机号码"
                        help={phoneError ? phoneError : ''}
                        validateStatus={phoneError ? 'error' : ''}>
                        {form.getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入手机号码', whitespace: true, }],
                        })(
                            <Input placeholder="手机号码" maxLength={20}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="常用邮箱"
                        help={emailError ? emailError : '非常重要,微信审核通过后会发送商户号开通邮件至该邮箱,接下来的3、4步骤需要你根据邮箱内容指引完成.'}
                        validateStatus={emailError ? 'error' : ''}>
                        {form.getFieldDecorator('email', {
                            rules: [{ required: true, message: '请输入常用邮箱', whitespace: true, }],
                        })(
                            <Input placeholder="常用邮箱" maxLength={20}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="商家简称"
                        help={merchantNameError ? merchantNameError : ''}
                        validateStatus={merchantNameError ? 'error' : ''}>
                        {form.getFieldDecorator('merchantName', {
                            rules: [{ required: true, message: '请输入商家简称', whitespace: true, }],
                        })(
                            <Input placeholder="商家简称" maxLength={20}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="客服电话"
                        help={servicePhoneError ? servicePhoneError : ''}
                        validateStatus={servicePhoneError ? 'error' : ''}>
                        {form.getFieldDecorator('servicePhone', {
                            rules: [{ required: true, message: '请输入客服电话', whitespace: true, }],
                        })(
                            <Input placeholder="客服电话,手机或者座机都可以" maxLength={20}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="营业执照编号"
                        help={businessLicenceNoError ? businessLicenceNoError : ''}
                        validateStatus={businessLicenceNoError ? 'error' : ''}>
                        {form.getFieldDecorator('businessLicenceNo', {
                            rules: [{ required: true, message: '请输入营业执照编号', whitespace: true, }],
                        })(
                            <Input placeholder="营业执照编号" maxLength={20}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="相关资质"
                        help={"营业执照、***经营许可证等"}
                    >
                        {getFieldDecorator('yyzzs')(
                            <Upload
                                name="yyzzs"
                                accept={"image/*"}
                                listType="picture-card"
                                fileList={yyzzList}
                                showUploadList={true}
                                onPreview={onPreview}
                            >
                            </Upload>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="法人/经办人身份证正面"
                        help={identityPhotoFrontError ? identityPhotoFrontError : '请上传法人或者经办人身份证正面,个体工商户必须提供法人身份证拍图，企业可提供法人或者经办人身份证拍图, 大小不能超过2M'}
                        validateStatus={identityPhotoFrontError ? 'error' : ""}
                    >
                        {getFieldDecorator('identityPhotoFront',  {
                            rules: [{
                                required: getFieldValue("accountType") == "2", message: '请上传法人或者经办人身份证正面,个体工商户必须提供法人身份证拍图，企业可提供法人或者经办人身份证拍图, 大小不能超过2M',
                            }],
                        })(
                            <Upload
                                name="identityPhotoFront"
                                accept={"image/*"}
                                listType="picture-card"
                                fileList={identityPhotoFrontList}
                                showUploadList={true}
                                onPreview={onPreview}                                
                                onChange={this.onChange_identityPhotoFront}
                                beforeUpload={this.beforeUpload}
                                onRemove={(file) => this.onRemove(file, "identityPhotoFront")}
                            >
                                {identityPhotoFrontList.length >= 1 ? null : uploadButton}
                            </Upload>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="法人/经办人身份证反面"
                        help={identityPhotoBackError ? identityPhotoBackError : '请上传法人或者经办人身份证反面,个体工商户必须提供法人身份证拍图，企业可提供法人或者经办人身份证拍图, 大小不能超过2M'}
                        validateStatus={identityPhotoBackError ? 'error' : ""}
                    >
                        {getFieldDecorator('identityPhotoBack',  {
                            rules: [{
                                required: getFieldValue("accountType") == "2", message: '请上传法人或者经办人身份证反面,个体工商户必须提供法人身份证拍图，企业可提供法人或者经办人身份证拍图, 大小不能超过2M',
                            }],
                        })(
                            <Upload
                                name="identityPhotoBack"
                                accept={"image/*"}
                                listType="picture-card"
                                fileList={identityPhotoBackList}
                                showUploadList={true}
                                onPreview={onPreview}                                
                                onChange={this.onChange_identityPhotoBack}
                                beforeUpload={this.beforeUpload}
                                onRemove={(file) => this.onRemove(file, "identityPhotoBack")}
                            >
                                {identityPhotoBackList.length >= 1 ? null : uploadButton}
                            </Upload>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="组织机构代码证"
                        help={'非个体户，非三证合一商户提供, 大小不能超过2M'}
                    >
                        {getFieldDecorator('orgPhoto')(
                            <Upload
                                name="orgPhoto"
                                accept={"image/*"}
                                listType="picture-card"
                                fileList={orgPhotoList}
                                showUploadList={true}
                                onPreview={onPreview}                                
                                onChange={this.onChange_orgPhoto}
                                beforeUpload={this.beforeUpload}
                                onRemove={(file) => this.onRemove(file, "orgPhoto")}
                            >
                                {orgPhotoList.length >= 1 ? null : uploadButton}
                            </Upload>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="账户类型"
                        help={'请合理选择账户类型,如果您是企业请选对公账户,如果您是个体工商户可以选择法人私人账户'}
                    >
                        {form.getFieldDecorator('accountType')(
                            <Select >
                                <Select.Option value="1">对公账户</Select.Option>
                                <Select.Option value="2">法人私人账户</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="开户名称"
                        help={accountNameError ? accountNameError : ''}
                        validateStatus={accountNameError ? 'error' : ''}>
                        {form.getFieldDecorator('accountName', {
                            rules: [{ required: true, message: '请输入开户名称', whitespace: true, }],
                        })(
                            <Input placeholder="开户名称(个体工商户如：张三，企业：应该是企业名称)" maxLength={20}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="开户银行"
                        help={accountBankError ? accountBankError : ''}
                        validateStatus={accountBankError ? 'error' : ''}>
                        {form.getFieldDecorator('accountBank', {
                            rules: [{ required: true, message: '请输入开户银行', whitespace: true, }],
                        })(
                            <Input placeholder="开户银行(如：民生银行)" maxLength={20}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="开户支行"
                        help={accountFockbackError ? accountFockbackError : ''}
                        validateStatus={accountFockbackError ? 'error' : ''}>
                        {form.getFieldDecorator('accountFockback', {
                            rules: [{ required: true, message: '请输入开户支行', whitespace: true, }],
                        })(
                            <Input placeholder="开户支行(如：民生银行湘府路支行)" maxLength={20}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="银行账号"
                        help={accountNoError ? accountNoError : ''}
                        validateStatus={accountNoError ? 'error' : ''}>
                        {form.getFieldDecorator('accountNo', {
                            rules: [{ required: true, message: '请输入银行账号', whitespace: true, }],
                        })(
                            <Input placeholder="银行账号" maxLength={20}/>
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Popconfirm placement="top" title={"资料核对无误，确认提交？"} okText="是的" cancelText="再确认下"
                            onConfirm={() => this.handleSubmit()}>
                            <Button type={"primary"} loading={wxpayInfoSaveLoading} >确认提交</Button>
                        </Popconfirm>
                    </Form.Item>
                </Form>
            </Spin>
        )
    }

}

const FirstContentWarpper = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            id: Form.createFormField({
                value: props.id.value,
            }),
            contactsName: Form.createFormField({
                value: props.contactsName.value,
            }),
            phone: Form.createFormField({
                value: props.phone.value,
            }),
            email: Form.createFormField({
                value: props.email.value,
            }),
            merchantName: Form.createFormField({
                value: props.merchantName.value,
            }),
            servicePhone: Form.createFormField({
                value: props.servicePhone.value,
            }),
            businessLicenceNo: Form.createFormField({
                value: props.businessLicenceNo.value,
            }),
            orgPhoto: Form.createFormField({
                value: props.orgPhoto.value,
            }),
            identityPhotoBack: Form.createFormField({
                value: props.identityPhotoBack.value,
            }),
            identityPhotoFront: Form.createFormField({
                value: props.identityPhotoFront.value,
            }),
            yyzzs: Form.createFormField({
                value: props.yyzzs.value,
            }),
            accountType: Form.createFormField({
                value: props.accountType.value,
            }),
            accountName: Form.createFormField({
                value: props.accountName.value,
            }),
            accountBank: Form.createFormField({
                value: props.accountBank.value,
            }),
            accountFockback: Form.createFormField({
                value: props.accountFockback.value,
            }),
            accountNo: Form.createFormField({
                value: props.accountNo.value,
            }),
        }
    }
})(FirstContent);

class SecondContent extends Component {
    render() {
        const { email, wxpayInfoSaveLoading, updateWxpaySteup } = this.props;
        return (
            <Fragment>
                <Result type="clock"
                    style={{marginTop: 24}}
                    title="等待微信官方审核"
                    description={`请您耐心等待微信官方的审核,审核通过后(1-3个工作日)微信官方会发送一封成功开通商户号邮件至您的邮箱以及
                        微信随机打款一笔金额至您银行账户(一般是几分钱)`}
                />
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{marginBottom: 8}}>以下是回执邮件模板</div>
                    <img style={{marginBottom: 8}} src={wxpay1Png}/>
                    <Popconfirm placement="top" title={"我已收到邮件，确认吗？"} okText="是的" cancelText="再确认下"
                        onConfirm={() => updateWxpaySteup(2)}>
                        <Button type={"primary"} loading={wxpayInfoSaveLoading}>我已收到微信官方邮件</Button>
                    </Popconfirm>
                </div>
            </Fragment>
        )
    }
}

class ThridContent extends Component {

    openWxpay = () => {
        shell.openExternal("https://pay.weixin.qq.com");
    }

    render() {
        const { wxpayInfoSaveLoading, updateWxpaySteup } = this.props;
        return (
            <Fragment>
                <Result type="clock"
                    style={{marginTop: 24}}
                    title="等待您完成账户验证"
                    description={`打款金额需要您在对公账户或法人私人账户流水账户内查询`}
                />
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{marginBottom: 8}}>根据“财付通回执邮件内的商户平台登录账户”和“商户平台登录密码”登录：<a href="javascript:void(0)" onClick={() => {this.openWxpay()}}>https://pay.weixin.qq.com</a></div>
                    <img style={{marginBottom: 8}} src={wxpay2_1Png}/>
                    <img style={{marginBottom: 8}} src={wxpay2_2Png}/>
                    <Popconfirm placement="top" title={"确认已完成账户验证吗？"} okText="是的" cancelText="再确认下"
                        onConfirm={() => updateWxpaySteup(3)}>
                        <Button type={"primary"} loading={wxpayInfoSaveLoading}>我已完成账户验证</Button>
                    </Popconfirm>
                </div>
            </Fragment>
        )
    }
}

class FourthContent extends Component {

    render() {
        const { wxpayInfoSaveLoading, updateWxpaySteup } = this.props;
        return (
            <Fragment>
                <Result type="clock"
                    style={{marginTop: 24}}
                    title="等待您签署协议"
                    description={`验证完账户之后就可以立马签署协议`}
                />
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img style={{marginBottom: 8}} src={wxpay3_1Png}/>
                    <img style={{marginBottom: 8}} src={wxpay3_2Png}/>
                    <Popconfirm placement="top" title={"确认已签署协议吗？"} okText="是的" cancelText="再确认下"
                        onConfirm={() => updateWxpaySteup(4)}>
                        <Button type={"primary"} loading={wxpayInfoSaveLoading}>我已签署协议</Button>
                    </Popconfirm>
                </div>
            </Fragment>
        )
    }
}

class FiveContent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Result type="clock"
                style={{marginTop: 24}}
                title="等待我们(一点谱)完成开发配置"
                description={"请您耐心等待一点谱的开发配置,配置完成后(1个自然日内)我们会第一时间短信或电话通知您..."}
            />
        )
    }
}

class FinishedContent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <Result type="success"
                    style={{marginTop: 24}}
                    title="签约成功"
                    description={"您的微信支付已开通，从现在开始您可以在工作台选择桌台生成收银二维码."}
                />
            </Fragment>
        )
    }
}