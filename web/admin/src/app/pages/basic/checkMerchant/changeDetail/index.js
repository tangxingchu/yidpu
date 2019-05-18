import React, { Fragment, Component } from 'react';
import { Row, Col, Card, Form, Input, Button, InputNumber, Modal, message, Divider, Table, Popconfirm, Alert } from 'antd';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageHeaderLayout from '../../../../components/Layout/PageHeaderLayout';
import checkMerchantActions from '../../../../actions/checkMerchant';
import config from '../../../../common/config';
import styles from './index.less';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class MerchantChangeDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            auditResult: null,
        }
    }

    componentDidMount() {
        const { id } = this.props.location.state.query;
        this.props.checkMerchantActions.selectById(id);
        this.props.checkMerchantActions.listUserChangeHis(id);
    }

    getLonLat = () => {
        const { userHis } = this.props.checkMerchant;
        this.props.checkMerchantActions.getLonLat(userHis.address).then(data => {
            if(data.status == 1) {
                message.error(data.msg);
            }
        });
    }

    audit = (status) => {
        if(status == 0) {
            this.setState({modalVisible: true});
        } else {
            const { merchantUser, detailData } = this.props.checkMerchant;
            const auditMsg = {merchantId: merchantUser.id, auditRemark: this.state.auditResult, auditStatus: 1,
                lon: detailData.lon.value, lat: detailData.lat.value};
            this.props.checkMerchantActions.checkMerchantChange(auditMsg).then(() => {
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
        this.props.checkMerchantActions.checkMerchantChange(auditMsg).then(() => {
            this.setState({modalVisible: false});
            this.props.history.push("/youdianpu/basic/checkMerchant");
        });
    }

    onChange = (value) => {
        this.setState({auditResult: value});
    }

    render() {
        const { detailData, merchantUser, checkLoading, userHis = {}, imageHis } = this.props.checkMerchant;
        const { formFieldChangeValue } = this.props.checkMerchantActions;
        const { modalVisible, auditResult } = this.state;
        return (
            <Fragment>
                <Card bordered={true} title={"变更之前的信息"}>
                    <CreateFormWarpper
                        {...detailData}
                        formFieldChangeValue={formFieldChangeValue}                        
                        merchantUser={merchantUser}                        
                        audit={this.audit}
                    />
                </Card>
                <Card title={"变更之后的信息"} style={{marginTop: 16}}>
                    <NewMerchantFormWarpper userHis={userHis} 
                        getLonLat={this.getLonLat}
                        merchantUser={merchantUser}
                        imageHis={imageHis}                        
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

class NewMerchantForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { form, userHis, merchantUser } = this.props;
        return (
            <Form>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商家名称">
                    {form.getFieldDecorator('merchantName', {
                        initialValue: userHis.merchantName,
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商家店铺logo">
                    <div>
                        <img src={`${config.staticHost}${userHis.logoPath}`} style={{width: 64, height: 64}}/>
                    </div>
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商家地址">
                    {form.getFieldDecorator('address', {
                        initialValue: userHis.address,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="店铺描述(经验理念)">
                    {form.getFieldDecorator('remark', {
                        initialValue: userHis.remark,
                    })(
                        <Input.TextArea />
                    )}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="根据商家地址">
                    <Button onClick={() => {this.props.getLonLat()}}>更新经纬度(腾讯地图)</Button>
                </FormItem>
                
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商家店铺新增照片">
                    <div>
                        {
                            this.props.imageHis ? 
                            this.props.imageHis.map(photoItem => {
                                return (
                                    <img key={photoItem.id} src={`${config.staticHost}${photoItem.imagePath}`} style={{width: 128, height: 128}}/>
                                )
                            })
                            : <img/>
                        }
                    </div>
                </FormItem>
                
                
            </Form>
        )
    }
}

const NewMerchantFormWarpper = Form.create()(NewMerchantForm);


class MerchantForm extends Component {

    constructor(props) {
        super(props);
    }

    check = () => {
        this.props.form.validateFields((err, fieldsValue) => {
            if(err) return;
            this.props.audit(1)
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
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商家地址">
                    {form.getFieldDecorator('address', {
                        rules: [{ required: true, message: '请输入商家地址' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="店铺描述(经验理念)">
                    {form.getFieldDecorator('remark')(
                        <Input.TextArea />
                    )}
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
                    <Button type={"primary"} onClick={() => {this.check()}}>审核通过</Button>
                    <Button type={"default"} style={{marginLeft: 16}} onClick={() => {this.props.audit(0)}}>审核不通过</Button>
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
})(MerchantChangeDetail));