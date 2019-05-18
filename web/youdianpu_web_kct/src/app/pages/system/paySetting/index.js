import React, { Fragment, Component } from 'react';
import { Tabs, Icon, Card, Steps, Button, Alert, Modal, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QRCode from 'qrcode.react';
import { shell } from 'electron';

import paySettingActions from '../../../actions/paySetting';
import homePageActions from '../../../actions/homePage';
import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import styles from './index.less';
import { alipayMerchantAuthRedirectURL } from '../../../common/config';
import { getToken } from '../../../utils/authority';
import SecondSteupForm from './secondSteupForm';
import Result from '../../../components/Result';
import WXPaySetting from './wxpay';

const TabPane = Tabs.TabPane;

const Step = Steps.Step; 

class PaySetting extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.props.paySettingActions.selectAlipayByMid();

    }

    downLoadAuthTpl = () => {
        shell.openExternal("https://b.alipay.com/doc/bizLicenseAuthTpl.docx");
    }

    saveAuthFile = (fieldValues) => {
        const { sqhList } = this.props.paySetting;
        let formData = new FormData();
        formData.append("sfqy", fieldValues.alipay_dmf);
        if(sqhList && sqhList.length > 0) {
            formData.append("sqh", sqhList[0].originFileObj);
        }
        this.props.paySettingActions.saveAuthFile(formData).then(data => {
            if(data == 1) {
                message.error("请重新上传授权函照片");
            }
        });
    }

    getSqhImage = () => {
        const { currMerchantInfo } = this.props.homePage;
        if(currMerchantInfo.bizLicenseAuthId) {
            this.props.paySettingActions.getSqhImage();
        }
    }

    saveWxpayInfo = (fieldValues) => {
        let formData = new FormData();
		formData.append("id", fieldValues.id);
		formData.append("contactsName", fieldValues.contactsName);
		formData.append("phone", fieldValues.phone);
		formData.append("email", fieldValues.email);
        formData.append("merchantName", fieldValues.merchantName);
        formData.append("servicePhone", fieldValues.servicePhone);
        formData.append("businessLicenceNo", fieldValues.businessLicenceNo);
        formData.append("accountType", fieldValues.accountType);
        formData.append("accountName", fieldValues.accountName);
        formData.append("accountBank", fieldValues.accountBank);
        formData.append("accountFockback", fieldValues.accountFockback);
        formData.append("accountNo", fieldValues.accountNo);
		const { identityPhotoBackList, identityPhotoFrontList, orgPhotoList } = this.props.paySetting;
		if(identityPhotoBackList && identityPhotoBackList[0]) {
			if(identityPhotoBackList[0].originFileObj) {
				formData.append("identityPhotoBack", identityPhotoBackList[0].originFileObj);
			}
        }
        if(identityPhotoFrontList && identityPhotoFrontList[0]) {
			if(identityPhotoFrontList[0].originFileObj) {
				formData.append("identityPhotoFront", identityPhotoFrontList[0].originFileObj);
			}
        }
        if(orgPhotoList && orgPhotoList[0]) {
			if(orgPhotoList[0].originFileObj) {
				formData.append("orgPhoto", orgPhotoList[0].originFileObj);
			}
		}
        this.props.paySettingActions.saveWxpayInfo(formData).then(() => {
			message.success("资料提交成功");
        });
    }

    render() {
        const { currMerchantInfo } = this.props.homePage;
        const { alipayData, alipayLoading, currentSteup, wxpaySteup, firstSteupLoading, qyFormData, sqhList, 
            secondSteupLoading, wxpayFormData, yyzzList, identityPhotoBackList, identityPhotoFrontList,
            orgPhotoList, wxpayInfoSaveLoading, wxpayInfoLoading, wxpayInfoData, defaultActiveKey } = this.props.paySetting;
        const { alipayFieldChangeValue, saveAlipay, getPaySteup, secondFormFieldChange, sqhOnChange, removeImage,
            wxpayFormFieldChangeValue, identityPhotoFrontOnChange, identityPhotoBackOnChange, orgPhotoOnChange, getWxPayInfo,
            getWxpayImage, updateWxpaySteup, onTabChange
        } = this.props.paySettingActions;
        const { getYYZZImageBlob } = this.props.homePageActions;
        const steps = [{
            title: '扫码授权',
            content: <FirstContent getPaySteup={getPaySteup} loading={firstSteupLoading}/>,
          }, {
            title: '签约支付宝',
            content: <SecondContent qyFormData={qyFormData} sqhList={sqhList} 
                secondSteupLoading={secondSteupLoading}
                fieldChangeValue={secondFormFieldChange} sqhOnChange={sqhOnChange} removeImage={removeImage}
                downLoadAuthTpl={this.downLoadAuthTpl} saveAuthFile={this.saveAuthFile}
                getSqhImage={this.getSqhImage}
                />,
          }, {
            title: '等待支付宝审核',
            content: <ThirdContent/>,
          }, {
            title: '完成',
            content: <FinishedContent/>,
        }];       
        return (
            <PageHeaderLayout
                title={"支付收银管理"}
                content="顾客向商家(您)支付宝、微信的支付管理。需要商家(您)上支付宝官网或微信官网签约相应的支付功能或者我们也可以代您签约。有疑问欢迎随时咨询我们的客服人员。"
            >   
                <Card bordered={false}>
                    <Alert message="本收银流程:顾客支付宝或微信扫一扫桌台二维码或前台二维码->显示本次消费明细以及总金额->顾客点击支付按钮->实时到账对应的支付宝或微信商户号->交易完成" type="info"/>
                    <Tabs defaultActiveKey={defaultActiveKey} onChange={onTabChange}>
                        <TabPane tab={<span><Icon type="alipay" />支付宝收银</span>} key="1">
                            {/* <Spin spinning={alipayLoading}>                                
                                <AlipayForm {...alipayData}
                                    fieldChangeValue={alipayFieldChangeValue}
                                    saveAlipay={saveAlipay}
                                >
                                </AlipayForm>
                            </Spin> */}
                            <Alert message="如果您收银支付宝账号已成功签约了支付宝的当面付产品，可直接跳过第2、3步骤，完成第1步扫码授权即可。" type="info" showIcon />
                            <Steps current={currentSteup} style={{marginTop:24}}>
                                {steps.map(item => <Step key={item.title} title={item.title} />)}
                            </Steps>
                            <div className={styles.stepsContent}>{steps[currentSteup].content}</div>
                        </TabPane>
                        <TabPane tab={<span><Icon type="wechat" />微信收银</span>} key="2">
                            <WXPaySetting current={wxpaySteup} wxpayFormData={wxpayFormData}
                                yyzzList={yyzzList}
                                identityPhotoFrontList={identityPhotoFrontList}
                                identityPhotoBackList={identityPhotoBackList}
                                orgPhotoList={orgPhotoList}
                                getYYZZImageBlob={getYYZZImageBlob}
                                currMerchantInfo={currMerchantInfo}
                                wxpayFormFieldChangeValue={wxpayFormFieldChangeValue}
                                identityPhotoFrontOnChange={identityPhotoFrontOnChange}
                                identityPhotoBackOnChange={identityPhotoBackOnChange}
                                orgPhotoOnChange={orgPhotoOnChange}
                                removeImage={removeImage}
                                wxpayInfoSaveLoading={wxpayInfoSaveLoading}
                                saveWxpayInfo={this.saveWxpayInfo}
                                wxpayInfoLoading={wxpayInfoLoading}
                                getWxPayInfo={getWxPayInfo}
                                wxpayInfoData={wxpayInfoData}
                                getWxpayImage={getWxpayImage}
                                updateWxpaySteup={updateWxpaySteup}
                            />
                        </TabPane>
                    </Tabs>
                </Card>
                
            </PageHeaderLayout>
        )
    }

}

class FirstContent extends Component {

    constructor(props) {
        super(props);
    }

    goToFeiLv = () => {        
        shell.openExternal("https://b.alipay.com/signing/productDetail.htm?productId=I1011000290000001003");
    }

    downLoad = () => {
        shell.openExternal("https://mobile.alipay.com/index.htm");
    }

    render() {
        return (
            <Card bordered={false}>
                <div className={styles.tips}>
                    <div>
                        1、登录<a href="javascript:void(0)" onClick={() => {this.downLoad()}}>支付宝</a>手机客户端扫描下面二维码授权给我们的【一点谱商服】应用。
                    </div>
                    <div>2、费率为0.6%，由支付宝收取，详细请查看支付宝当面付<a href='javascript:void(0)' onClick={() => {this.goToFeiLv()}}>费率详情</a>(打开后请点左边的产品费率)</div>
                </div>
                <div className={styles.firstContent}>
                    <QRCode value={`${alipayMerchantAuthRedirectURL}?token=${getToken()}`} />
                    <h3>授权二维码</h3>
                </div>
                <div className={styles.firstContent}>
                    <Button type="primary" loading={this.props.loading} onClick={() => {this.props.getPaySteup()}}>我已授权,下一步</Button>
                </div>
            </Card>
        )
    }

}

class SecondContent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { qyFormData, sqhList, fieldChangeValue, sqhOnChange, removeImage, downLoadAuthTpl, saveAuthFile, getSqhImage, secondSteupLoading } = this.props;
        return (
            <Card bordered={false}>
                <div className={styles.tips}>
                    <div>
                        这一步骤是我们代您签约支付宝,无需您花时间去了解支付宝的签约规则以及签约流程。这些都交给我们，帮您节约时间。
                        <a href="javascript:void(0)" onClick={() => {downLoadAuthTpl()}}>下载授权函模板</a>
                    </div>
                </div>
                <SecondSteupForm {...qyFormData}
                    sqhList={sqhList}
                    fieldChangeValue={fieldChangeValue}
                    sqhOnChange={sqhOnChange}
                    removeImage={removeImage}
                    downLoadAuthTpl={downLoadAuthTpl}
                    saveAuthFile={saveAuthFile}
                    getSqhImage={getSqhImage}
                    secondSteupLoading={secondSteupLoading}
                >
                </SecondSteupForm>
            </Card>
        )
    }
}

class ThirdContent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Result type="clock"
                style={{marginTop: 24}}
                title="等待支付宝官方审核"
                description={"请您耐心等待支付宝官方的审核,审核通过后(1-2个工作日)我们会第一时间短信或电话通知您..."}
            />
        )
    }
}

class FinishedContent extends Component {
    constructor(props) {
        super(props)
    }

    changeAlipay = () => {
        Modal.info({
            title: '提示',
            content: (
                <div>
                    <p>为了您的资金安全,请联系我们客服,我们与您电话确认之后发起支付宝收银账号变更.</p>
                </div>
            ),
        })
    }

    render() {
        return (
            <Fragment>
                <Result type="success"
                    style={{marginTop: 24}}
                    title="签约成功"
                    description={"您的收银支付宝账号签约审核已通过，从现在开始您可以在工作台选择桌台生成收银二维码."}
                    actions={<Button type="primary" onClick={() => {this.changeAlipay()}} loading={false}>更换支付宝收银账号</Button>}
                />
            </Fragment>
        )
    }
}

export default connect((state) => {
    return {
        paySetting: state.paySetting,
        homePage: state.homePage,
    }
}, (dispatch) => {
    return {
        paySettingActions: bindActionCreators(paySettingActions, dispatch),
        homePageActions: bindActionCreators(homePageActions, dispatch),
    }
})(PaySetting);