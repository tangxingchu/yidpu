import React, { Fragment, Component } from 'react';
import { Card, Divider, Button, Form, Input, Upload, Select, Radio, Icon, Modal, message, Popover, Spin, InputNumber } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ipcRenderer } from 'electron';
import { withRouter } from 'react-router';
import _ from 'lodash';

import { staticHost } from '../../../common/config'
import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import homePageActions from '../../../actions/homePage';
import basicConfigActions from '../../../actions/basicConfig';
import businessInfoActions from '../../../actions/businessInfo';
import { getToken, getUid } from '../../../utils/authority';
import { getBase64 } from '../../../utils/utils';
import styles from './index.less'

class BasicInfo extends Component {

    constructor(props) {
        super(props)
        this.removeFileIds = [];
        this.state = {
            previewVisible: false,
            previewImage: '',
        }
    }

    componentDidMount() {
        const { businessConfigList } = this.props.basicConfig;
        if(businessConfigList.length == 0) {
            this.props.basicConfigActions.listBusiness();
        }
        this.props.businessInfoActions.select();
    }

    goBack = () => {
        this.props.history.goBack();
    }

    handlePreview = (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
    }

    handleCancel = () => this.setState({ previewVisible: false })


    beforeUpload_merchantLogo = (file) => {
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
            message.error('logo图片大小不能超过1MB!');
            return false;
        }
        return false;
    }

    onChange_merchantLogo = ({ file, fileList }) => {
        if (file.status !== 'removed') {
            const isLt1M = file.size / 1024 / 1024 < 1;
            if (!isLt1M) {
                return false;
            }
        }
        this.props.homePageActions.merchantLogoOnChange(fileList);
    }

    onRemove_merchantLogo = (file) => {
        const { currMerchantInfo } = this.props.homePage;
        if(currMerchantInfo.changeAuditStatus == 0) {
            return false;
        }
        this.props.homePageActions.removeImage({type: 'logo', uid: file.uid});//删除formData里面的logo，为了让校验起作用
    }

    onPreview = (file) => {
        this.setState({ previewVisible: true, previewImage: file.url || file.thumbUrl });
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
        this.props.homePageActions.photoOnChange(fileList);
    }

    onRemove_photo = (file) => {
        const { currMerchantInfo } = this.props.homePage;
        if(currMerchantInfo.changeAuditStatus == 0) {
            return false;
        }
        //删除已有的商铺照片
        if (!file.originFileObj) {
            this.removeFileIds.push(file.uid);            
        }
        this.props.homePageActions.removeImage({type: 'photo', uid: file.uid});//删除formData里面的yyzz，为了让校验起作用        
    }

    defaultImageChange = (value) => {
		const { photoList } = this.props.homePage;
		const merchantId = getUid();
		for (let i = 0; i < photoList.length; i++) {
			if(photoList[i].uid == value && !photoList[i].originFileObj) {//已保存的商家店铺图片
				this.props.homePageActions.updateDefaultImage(value).then(() => {
                    message.success('默认显示照片修改成功');
                });
			}
		}
    }

    handleCommit = (fieldValues) => {
        Modal.confirm({
            title: '确认提交更改',
            content: '点确认之后,删除的店铺照片将无法恢复,是否确认？',
            onOk: () => {
                let formData = new FormData();
                formData.append("merchantName", fieldValues.merchantName);
                ipcRenderer.send("setCacheData", {name: "merchantName", value: fieldValues.merchantName});
                formData.append("address", fieldValues.address);
                formData.append("remark", fieldValues.remark);
                const { merchantLogoList, photoList } = this.props.homePage;
                if(merchantLogoList && merchantLogoList[0]) {
                    if(merchantLogoList[0].originFileObj) {
                        formData.append("logo", merchantLogoList[0].originFileObj);
                        getBase64(merchantLogoList[0].originFileObj, (data) => {
                            ipcRenderer.send("setCacheData", {name: "logo", value: data});
                        });
                    }
                }
                let defaultPhotoIndex = null;
                let index = 0;
                for (let i = 0; i < photoList.length; i++) {
                    if(photoList[i].originFileObj) {
                        if(photoList[i].uid == fieldValues.defaultImage) {
                            defaultPhotoIndex = index;
                        }
                        formData.append("photos", photoList[i].originFileObj);
                        index++;
                    }
                }
                if(defaultPhotoIndex != null) {
                    formData.append("defaultPhotoIndex", defaultPhotoIndex);
                }
                if (this.removeFileIds && this.removeFileIds.length > 0) {
                    formData.append("delPhotoImage", this.removeFileIds.join(","));
                }
                this.props.homePageActions.commitBasicInfoChange(formData).then(() => {
                    
                });
            }
        });
    }
    getContent = () => {        
        const { listChangeHisLoading, userChangeHis, imageHis } = this.props.homePage;
        if(listChangeHisLoading) {            
            return <Spin />
        } else {
            if(userChangeHis == null)  {
                return (
                    <div>无变更记录</div>
                )
            } else {
                return (
                    <Fragment>
                        <div>店铺logo:{
                            userChangeHis.logoPath ? 
                            <img src={`${staticHost}${userChangeHis.logoPath}?t=${new Date().getTime()}`} style={{width: 64, height: 64}}/>
                            : <span>未变更</span>
                        }
                        </div>
                        <div>店铺地址:<a>{userChangeHis.address}</a></div>
                        <div style={{width: 450}}>店铺描述:<a>{userChangeHis.remark}</a></div>
                        <div>新增店铺照片:
                                {
                                    imageHis.map(photoItem => {
                                        return (
                                            <img key={photoItem.id} src={`${staticHost}${photoItem.imagePath}`} style={{width: 128, height: 128}}/>
                                        )
                                    })
                                }
                        </div>
                        <div>审核结果:<a>{userChangeHis.auditStatus == null ? "审核中..." : userChangeHis.auditStatus == 0 ? "不通过" : "通过"}</a></div>
                        <div>原因:<a>{userChangeHis.auditStatus == null ? "审核中..." : userChangeHis.auditRemark}</a></div>
                    </Fragment>
                )
            }
        }
    }

    getLastHisInfo = () => {
        // const { userChangeHis } = this.props.homePage;
        // if(userChangeHis == null) {
            this.props.homePageActions.listUserChangeHis();
        // }        
    }
    
    selectCurrMerchantInfo = () => {
        this.props.homePageActions.selectCurrMerchantInfo();
    }

    saveBusinessInfo = (pointCash) => {
        this.props.businessInfoActions.save({pointCash}).then(() => {
            message.success("更新成功");
        });
    }

    render() {
        const { merchantLogoList=[], photoList=[], formData, commitChangeDsiabled, currMerchantInfo, commitChangeLoading, loadingCurrMerchantInfo } = this.props.homePage;
        const { businessConfigList, loading } = this.props.basicConfig;
        const { saveConfigLoading } = this.props.defaultPage;
        const { saveLoading, businessInfoData } = this.props.businessInfo;
        const businessInfoLoading = this.props.businessInfo.loading;
        const { formFieldChangeValue } = this.props.homePageActions;
        const { update } = this.props.basicConfigActions;
        const { previewVisible, previewImage } = this.state;
        
        return (
            <PageHeaderLayout
                title={"基本信息&运营信息设置"}
            >
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListOperator}>
                            <Button onClick={() => this.goBack()}>
                                返回
                            </Button>
                        </div>
                        <Divider orientation="left"><span className={styles.title}>基本信息</span><span className={styles.tips}>(店铺名称必须在店铺照片中有显示)</span></Divider>
                        <Card bordered={false}>
                            <WrappedBasicForm photoList={photoList}
                                merchantLogoList={merchantLogoList}
                                {...formData}
                                onPreview={this.onPreview}
                                beforeUpload_merchantLogo={this.beforeUpload_merchantLogo}
                                onChange_merchantLogo={this.onChange_merchantLogo}
                                onRemove_merchantLogo={this.onRemove_merchantLogo}
                                beforeUpload_photo={this.beforeUpload_photo}
                                onChange_photo={this.onChange_photo}
                                onRemove_photo={this.onRemove_photo}
                                fieldChangeValue={formFieldChangeValue}
                                defaultImageChange={this.defaultImageChange}
                                commitChangeDsiabled={commitChangeDsiabled}
                                changeAuditStatus={currMerchantInfo.changeAuditStatus}
                                handleCommit={this.handleCommit}
                                commitChangeLoading={commitChangeLoading}
                                getContent={this.getContent}
                                loadingCurrMerchantInfo={loadingCurrMerchantInfo}
                                selectCurrMerchantInfo={this.selectCurrMerchantInfo}
                            />
                            <div className={styles.viewChangeDiv}>
                                <Popover title="提交更改的信息" content={this.getContent()} trigger="click">
                                    <a href="javascript:void(0)" onClick={() => {this.getLastHisInfo()}}>点我查看上次变更信息</a>
                                </Popover >
                            </div>
                        </Card>
                        <Divider orientation="left"><span className={styles.title}>运营信息</span><span className={styles.tips}>(店铺的基本运营配置信息)</span></Divider>
                        <Card bordered={false}>
                            <WrappedBusinessForm businessConfigList={businessConfigList}
                                update={update}
                                loading={loading}
                                saveConfigLoading={saveConfigLoading}
                                saveLoading={saveLoading}
                                saveBusinessInfo={this.saveBusinessInfo}
                                businessInfoLoading={businessInfoLoading}
                                businessInfoData={businessInfoData}
                            />
                        </Card>
                        
                    </div>
                </Card>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </PageHeaderLayout>
        )
    }

}

class BasicForm extends Component {
    constructor(props) {
        super(props)
    }
    commitHandler = () => {
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) return;
            this.props.handleCommit(fieldsValue);
        });
    };
    render() {
        const { merchantLogoList=[], photoList=[], onPreview, beforeUpload_merchantLogo, onChange_merchantLogo, onRemove_merchantLogo, beforeUpload_photo, onChange_photo, onRemove_photo, 
            defaultImageChange, commitChangeDsiabled, changeAuditStatus, commitChangeLoading, loadingCurrMerchantInfo } = this.props;
        const { getFieldDecorator } = this.props.form;
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
        let merchantLogoError = null;
        if (this.props.merchantLogo.errors) {
            merchantLogoError = this.props.merchantLogo.errors[0].message;
        }
        let addressError = null;
        if (this.props.address.errors) {
            addressError = this.props.address.errors[0].message;
        }
        let remarkError = null;
        if (this.props.remark.errors) {
            remarkError = this.props.remark.errors[0].message;
        }
        let photoError = null;
        if (this.props.photo.errors) {
            photoError = this.props.photo.errors[0].message;
        }
        let defaultImageError = null;
        if (this.props.defaultImage.errors) {
            defaultImageError = this.props.defaultImage.errors[0].message;
        }
        return (
            <Spin spinning={loadingCurrMerchantInfo}>
                <Form>
                    <Form.Item
                        {...formItemLayout}
                            label="店铺名称"
                        >
                        {getFieldDecorator('merchantName')(
                            <Input placeholder={"店铺名称"} maxLength={50} disabled={true}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="店铺logo"
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
                                listType="picture-card"
                                accept={"image/*"}
                                fileList={merchantLogoList}
                                showUploadList={true}
                                onPreview={onPreview}                                
                                onChange={onChange_merchantLogo}
                                beforeUpload={beforeUpload_merchantLogo}
                                onRemove={onRemove_merchantLogo}
                                disabled={changeAuditStatus==0}
                            >
                                {merchantLogoList.length >= 1 ? null : uploadButton}
                            </Upload>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                            label="店铺地址"
                            help={addressError ? addressError : '请输入店铺地址'}
                            validateStatus={addressError ? 'error' : ""}
                        >
                        {getFieldDecorator('address', {
                            rules: [{
                                required: true, message: '请输入店铺地址', whitespace: true,
                            }],
                        })(
                            <Input placeholder={"请输入真实店铺地址以方便客户快速定位店铺位置"} maxLength={120} disabled={changeAuditStatus==0}/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                            label="店铺描述"
                            help={remarkError ? remarkError : '请输入店铺地址'}
                            validateStatus={remarkError ? 'error' : ""}
                        >
                        {getFieldDecorator('remark', {
                            rules: [{
                                required: true, message: '请输入店铺描述', whitespace: true,
                            }],
                        })(
                            <Input.TextArea placeholder={"请输入店铺描述、经验理念等等"} 
                                rows={5}
                                maxLength={500}
                                disabled={changeAuditStatus==0}
                            />
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="店铺照片"
                        help={photoError ? photoError : '最多上传5张店铺照片,其中一张照片请包含店铺名称,每张照片大小不能超过2M.'}
                        validateStatus={photoError ? 'error' : ""}
                    >
                        {getFieldDecorator('photo',  {
                            rules: [{
                                required: true, message: '请上传店铺照片,其中一张照片请包含店铺名称',
                            }],
                        })(
                            <Upload name="photo"
                                listType="picture-card"
                                accept={"image/*"}
                                showUploadList={true}
                                fileList={photoList}
                                onPreview={onPreview}
                                beforeUpload={beforeUpload_photo}
                                onChange={onChange_photo}
                                onRemove={onRemove_photo}
                                disabled={changeAuditStatus==0}
                            >
                                {photoList.length >= 5 ? null : uploadButton}
                            </Upload>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="默认显示照片"
                        help={defaultImageError ? defaultImageError : '选择的默认显示照片不是新上传的店铺照片无需提交变更'}
                        validateStatus={defaultImageError ? 'error' : ""}
                    >
                        {getFieldDecorator('defaultImage', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择默认显示照片',
                                },
                            ],
                        })(
                            <Select
                                placeholder="默认显示图片"
                                onChange={(value) => {defaultImageChange(value)}}
                                disabled={changeAuditStatus==0}
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
                    </Form.Item>
                    {
                        changeAuditStatus==0
                        ?
                        <Form.Item style={{textAlign: 'center'}}>
                            <Button type="primary" loading={commitChangeLoading} disabled >请稍后,正审核您上次提交的信息...</Button>
                            <Button icon={"reload"} loading={loadingCurrMerchantInfo} onClick={() => this.props.selectCurrMerchantInfo()}
                                style={{marginLeft: 8}}>刷新</Button>
                        </Form.Item>
                        :
                        <Form.Item style={{textAlign: 'center'}}>
                            <Button type="primary" loading={commitChangeLoading} disabled={commitChangeDsiabled} onClick={() => {this.commitHandler()}}>提交更改</Button>
                            <Button icon={"reload"} loading={loadingCurrMerchantInfo} onClick={() => this.props.selectCurrMerchantInfo()}
                                style={{marginLeft: 8}}>刷新</Button>
                        </Form.Item>
                    }
                    
                </Form>
            </Spin>
        )
    }
}

const WrappedBasicForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
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
            photo: Form.createFormField({
                value: props.photo.value,
            }),
            defaultImage: Form.createFormField({
                value: props.defaultImage.value,
            }),
        }
    }
})(BasicForm);

class BusinessForm extends Component {
    constructor(props) {
        super(props)
    }
    onRadioChange = (e, code) => {
        const value = e.target.value;
        const basicConfig = { "configCode": code, "configValue": value };
        this.props.update(basicConfig).then(() => {
            ipcRenderer.send("updateBasicConfig", basicConfig);
        });
    }

    saveBusinessInfo = () => {
        const pointCash = this.props.form.getFieldValue("pointCash");
        this.props.saveBusinessInfo(pointCash);
    }

    render() {
        const formItemLayout = {
            labelCol: {
              xs: { span: 8 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 16 },
              sm: { span: 16 },
            },
        };
        const { businessConfigList, loading, saveConfigLoading, saveLoading, businessInfoLoading, businessInfoData } = this.props;
        const { getFieldDecorator } = this.props.form;
        const isChecked = (configCode, configValue) => {
            const basicConfig = businessConfigList.find(item => (item.configCode == configCode && item.configValue == configValue));
            return basicConfig ? true : false;
        }
        const getValue = (configCode) => {
            const basicConfig = businessConfigList.find(item => (item.configCode == configCode));
            return basicConfig ? basicConfig.configValue : "0";
        }
        return (
            <Spin spinning={loading}>
                <Form>
                    <Form.Item
                        {...formItemLayout}
                        label="积分返现比例"
                        help={"设置的是返现1元需要多少积分"}
                    >
                        {getFieldDecorator('pointCash', {
                            initialValue: businessInfoData.pointCash,
                        })(
                            <InputNumber step={1} min={1} disabled={businessInfoLoading}/>
                        )}
                        <Button type={"primary"} style={{marginLeft: 4}} loading={saveLoading} onClick={() => this.saveBusinessInfo()}>保存</Button>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="下单之后是否自动打印下单小票"
                        help={"使用的是USB打印机连接前台电脑打印"}
                    >
                        {getFieldDecorator('autoPrintTicket', {
                            initialValue: getValue('auto-print-ticket'),
                        })(
                            <Radio.Group disabled={saveConfigLoading["auto-print-ticket"]}
                                buttonStyle="solid"
                                onChange={(e) => { this.onRadioChange(e, "auto-print-ticket") }}>
                                <Radio.Button value={"0"} checked={isChecked("auto-print-ticket", "0")}>否</Radio.Button>
                                <Radio.Button value={"1"} checked={isChecked("auto-print-ticket", "1")}>是</Radio.Button>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="下单之后是否后厨自动打印用餐订单明细"
                        help={"使用的是后厨网络打印机打印"}
                    >
                        {getFieldDecorator('autoPrintOrder', {
                            initialValue: getValue('auto-print-order'),
                        })(
                            <Radio.Group disabled={saveConfigLoading["auto-print-order"]}
                                buttonStyle="solid"
                                onChange={(e) => { this.onRadioChange(e, "auto-print-order") }}>
                                <Radio.Button value="0" checked={isChecked("auto-print-order", "0")}>否</Radio.Button>
                                <Radio.Button value="1" checked={isChecked("auto-print-order", "1")}>是</Radio.Button>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="收银之后是否自动打印收银小票"
                        help={"使用的是USB打印机连接前台电脑打印"}
                    >
                        {getFieldDecorator('autoPrintCashier', {
                            initialValue: getValue('auto-print-cashier'),
                        })(
                            <Radio.Group disabled={saveConfigLoading["auto-print-cashier"]}
                                buttonStyle="solid"
                                onChange={(e) => { this.onRadioChange(e, "auto-print-cashier") }}>
                                <Radio.Button value="0" checked={isChecked("auto-print-cashier", "0")}>否</Radio.Button>
                                <Radio.Button value="1" checked={isChecked("auto-print-cashier", "1")}>是</Radio.Button>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    {/* <Form.Item
                        {...formItemLayout}
                        label="是否开启库存预警"
                        help={"库存预警是根据您在商品基本信息中配置的预警阀值来预警,低于阀值预警"}
                    >
                        {getFieldDecorator('isOpenedWaring', {
                            initialValue: getValue('is-opened-waring'),
                        })(
                            <Radio.Group buttonStyle="solid"
                                onChange={(e) => { this.onRadioChange(e, "is-opened-waring") }}>
                                <Radio.Button value="0" checked={isChecked("is-opened-waring", "0")}>否</Radio.Button>
                                <Radio.Button value="1" checked={isChecked("is-opened-waring", "1")}>是</Radio.Button>
                            </Radio.Group>
                        )}
                    </Form.Item> */}
                    <Form.Item
                        {...formItemLayout}
                        label="顾客自助点餐是否必须连接店内WIFI"
                    >
                        {getFieldDecorator('isMustbeLinkedWIFI', {
                            initialValue: getValue('is-mustbe-linked-wifi'),
                        })(
                            <Radio.Group disabled={saveConfigLoading["is-mustbe-linked-wifi"]}
                                buttonStyle="solid"
                                onChange={(e) => { this.onRadioChange(e, "is-mustbe-linked-wifi") }}>
                                <Radio.Button value="0" checked={isChecked("is-mustbe-linked-wifi", "0")}>否</Radio.Button>
                                <Radio.Button disabled value="1" checked={isChecked("is-mustbe-linked-wifi", "1")}>是</Radio.Button>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    
                </Form>
            </Spin>
        )
    }
}

const WrappedBusinessForm = Form.create()(BusinessForm);


export default withRouter(connect((state) => {
    return {
        homePage: state.homePage,
        basicConfig: state.basicConfig,
        defaultPage: state.defaultPage,
        businessInfo: state.businessInfo,
    }
}, (dispatch) => {
    return {
        homePageActions: bindActionCreators(homePageActions, dispatch),
        basicConfigActions: bindActionCreators(basicConfigActions, dispatch),
        businessInfoActions: bindActionCreators(businessInfoActions, dispatch),
    }
})(BasicInfo));