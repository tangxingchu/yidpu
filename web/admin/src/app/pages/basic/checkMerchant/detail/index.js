import React, { Fragment, Component } from 'react';
import { Row, Col, Card, Form, Input, Button, InputNumber, Modal, message, Divider, Table, Popconfirm, Alert } from 'antd';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageHeaderLayout from '../../../../components/Layout/PageHeaderLayout';
import checkMerchantActions from '../../../../actions/checkMerchant';
import config from '../../../../common/config';
import styles from './index.less';
import { staticHost } from '../../../../common/config';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class MerchantDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            auditResult: null,
        }
    }

    componentDidMount() {
        const { id } = this.props.location.state.query;
        this.props.checkMerchantActions.selectById(id).then(data => {
            if(data.yyzzs) {
                data.yyzzs.map(item => {
                    this.props.checkMerchantActions.getYYZZImageBlob({merchantId: id, filePath: item.filePath})
                })
            }
        });
        this.props.checkMerchantActions.listAuditHis(id);
    }

    getLonLat = () => {
        const { detailData } = this.props.checkMerchant;
        this.props.checkMerchantActions.getLonLat(detailData.address.value).then(data => {
            if(data.status == 1) {
                message.error(data.msg);
            }
        });
    }

    updateMerchantExp = (merchantId) => {
        this.props.checkMerchantActions.updateMerchantExp(merchantId).then(() => {
            message.success("设置账号失效成功");
        });
    }

    audit = (status) => {
        if(status == 0) {
            this.setState({modalVisible: true});
        } else {
            const { merchantUser, detailData } = this.props.checkMerchant;
            const auditMsg = {merchantId: merchantUser.id, auditRemark: this.state.auditResult, auditStatus: status,
                lon: detailData.lon.value, lat: detailData.lat.value};
            this.props.checkMerchantActions.checkMerchant(auditMsg).then(() => {
                this.setState({modalVisible: false});
                this.props.history.push("/youdianpu/basic/checkMerchant");
            });          
        }
    }

    auditBack = () => {
        if(!this.state.auditResult) {
            message.warning("请输入不通过原因");
            return;
        }
        const { merchantUser, detailData } = this.props.checkMerchant;
        const auditMsg = {merchantId: merchantUser.id, auditRemark: this.state.auditResult, auditStatus: 0};
        this.props.checkMerchantActions.checkMerchant(auditMsg).then(() => {
            this.setState({modalVisible: false});
            this.props.history.push("/youdianpu/basic/checkMerchant");
        });
    }

    onChange = (value) => {
        this.setState({auditResult: value});
    }

    render() {
        const { detailData, merchantUser, checkLoading, auditHisList, zzList } = this.props.checkMerchant;
        const { formFieldChangeValue } = this.props.checkMerchantActions;
        const { modalVisible, auditResult } = this.state;
        return (
            <Fragment>
                <Card bordered={false}>
                    <div>
                        {auditHisList.map((auditItem, index) => {
                            return (
                                <Alert style={{ marginBottom: 16, }} message={`第${index+1}次审核。未通过。原因：${auditItem.auditRemark}。`} type="info" key={auditItem.id} showIcon />
                            )
                        })}
                    </div>
                    <CreateFormWarpper
                        {...detailData}
                        formFieldChangeValue={formFieldChangeValue}
                        getLonLat={this.getLonLat}
                        merchantUser={merchantUser}
                        updateMerchantExp={this.updateMerchantExp}
                        audit={this.audit}
                        zzList={zzList}
                    />
                </Card>
                <Modal visible={modalVisible}
                    title={"输入不通过原因"}
                    cancelText="取消"
                    okText="确定"
                    onCancel={() => {this.setState({modalVisible: false})}}
                    confirmLoading={checkLoading}
                    onOk={() => {this.auditBack()}}
                >
                    <TextArea autoFocus value={this.state.auditResult} onChange={(e) => {this.onChange(e.target.value)}}></TextArea>
                </Modal>
            </Fragment>
        )
    }

}

class MerchantForm extends Component {

    constructor(props) {
        super(props);
    }

    check = (status) => {
        this.props.form.validateFields((err, fieldsValue) => {
            if(err) return;
            this.props.audit(status)
        }); 
    }

    updateMerchantExp = () => {
        const id = this.props.merchantUser.id;
        this.props.updateMerchantExp(id);
    }

    render() {
        const { form } = this.props;
        return (
            <Form>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商家名称">
                    {form.getFieldDecorator('merchantName', {
                        rules: [{ required: true, message: '请输入商家名称' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商家店铺logo">
                    <div>
                        {
                            this.props.merchantUser ? 
                            <img src={`${config.staticHost}${this.props.merchantUser.logoPath}`} style={{width: 64, height: 64}}/>
                            : null
                        }                        
                    </div>
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商家地址">
                    {form.getFieldDecorator('address', {
                        rules: [{ required: true, message: '请输入商家地址' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="营业执照编号">
                    {form.getFieldDecorator('businessLicenceNo', {
                        rules: [{ required: true, message: '请输入商家营业执照编号' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="店铺描述(经验理念)">
                    {form.getFieldDecorator('remark')(
                        <Input.TextArea />
                    )}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="根据商家地址">
                    <Button onClick={() => {this.props.getLonLat()}}>获取经纬度(腾讯地图)</Button>
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商家地址经度">
                    {form.getFieldDecorator('lon', {
                        rules: [{ required: true, message: '请输入商家地址经度' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商家地址纬度">
                    {form.getFieldDecorator('lat', {
                        rules: [{ required: true, message: '请输入商家地址纬度' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商家营业执照等等">
                    <div>
                    { 
                        this.props.zzList.map((item, index) => {
                            return <img key={index} src={item.url} style={{width: 128, height: 128}}/>
                        })
                    }
                    </div>
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商家店铺照片">
                    <div>
                        {
                            this.props.merchantUser && this.props.merchantUser.photos ? 
                            this.props.merchantUser.photos.map(photoItem => {
                                return (
                                    <img key={photoItem.id} src={`${config.staticHost}${photoItem.imagePath}`} style={{width: 128, height: 128}}/>
                                )
                            })
                            : <img/>
                        }
                    </div>
                </FormItem>
                <div style={{marginTop: 24, textAlign:'center'}}>
                    <Button type={"primary"} onClick={() => {this.check(1)}}>审核通过</Button>
                    <Button type={"primary"} style={{marginLeft: 16}} onClick={() => {this.check(2)}}>审核通过并且跳过试用步骤</Button>
                    <Button type={"default"} style={{marginLeft: 16}} onClick={() => {this.props.audit(0)}}>审核不通过</Button>
                    <Popconfirm title="确定设置账号失效吗?" onConfirm={() => {this.updateMerchantExp()}} cancelText="取消" okText="确定">
                        <Button type={"danger"} style={{marginLeft: 16}} >使该账号失效</Button>
                    </Popconfirm>
                </div>
            </Form>
        )
    }

}

const CreateFormWarpper = Form.create({
    mapPropsToFields(props) {
        return {
            merchantName: Form.createFormField({
                value: props.merchantName.value,
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
            lon: Form.createFormField({
                value: props.lon.value,
            }),
            lat: Form.createFormField({
                value: props.lat.value,
            }),
        }
    }
})(MerchantForm);

export default withRouter(connect((state) => {
    return {
        checkMerchant: state.checkMerchant,
    }
}, (dispatch) => {
    return { checkMerchantActions: bindActionCreators(checkMerchantActions, dispatch) }
})(MerchantDetail));