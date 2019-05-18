import React, { PureComponent, Fragment, Component } from 'react';
import { Row, Col, Card, Form, Input, Select, Button, Icon, InputNumber, DatePicker, Modal, Tooltip, Radio, message, Upload, Divider, Spin } from 'antd';

import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import { getUid, getSub } from '../../../utils/authority';
import Config from '../../../common/config';
import styles from './index.less'

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const dateFormat = 'YYYY-MM-DD';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class CreateForm extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            previewVisible: false,
            previewImage: '',
        };
        this.photo = null;
        this.removeFileIds = [];
    }

    componentDidMount() {
        
    }

    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        if (!(isJPG || isPNG)) {
            message.error('只能上传jpg或者png格式照片!');
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('单张照片大小不能超过2MB!');
            return false;
        }
        getBase64(file, photoImageUrl => 
            this.props.photoOnChange(photoImageUrl)
        );
        this.photo = file;
        return false;
    }

    beforeUpload2 = (file, fileList) => {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        if (!(isJPG || isPNG)) {
            message.error('只能上传jpg或者png格式照片!');
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('单张照片大小不能超过2MB!');
            return false;
        }
        return false;
    }

    onChange2 = ({ file, fileList }) => {
        if (file.status !== 'removed') {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            if (!(isJPG || isPNG)) {
                return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                return false;
            }
        }
        this.props.fileOnChange(fileList);
    }

    onRemove2 = (file) => {
        //删除已有的资质
        return false;    
    }

    onPreview = (file) => {
        this.setState({ previewVisible: true, previewImage: file.url || file.thumbUrl });
    }

    handleCancel = () => {
        this.setState({ previewVisible: false });
    }

    customRequest = ({ file }) => {
        // const formData = new FormData();
        // formData.append('file', file);
        // return this.props.upload(formData).then(() => {
        //     getBase64(file, imageUrl => this.setState({
        //         imageUrl,
        //         loading: false,
        //     }));
        // }).catch(e => {
        //     message.error(e.message);
        //     console.error(e);
        // });
        return Promise.resolve();
    }

    render() {
        const { modalVisible, form, handleAdd, handleUpdate, handleModalVisible, confirmLoading, fileList, photoImageUrl, resetFields, dictItemMap } = this.props;
        const { getFieldDecorator, getFieldValue, getFieldError, getFieldsError } = this.props.form;
        const { previewVisible, previewImage } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };

        return (
            <Fragment>
                <Modal
                    title={"员工基本信息"}
                    visible={modalVisible}
                    width={1000}
                    footer={null}
                    onCancel={() => { resetFields(); handleModalVisible(false) }}
                >
                    <Card bordered={false}>
                        <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
                            <FormItem style={{display: 'none'}}>
                                {form.getFieldDecorator('id')(<Input disabled/>)}
                            </FormItem>
                            <Row gutter={4}>
                                <Col span={24}>
                                    <FormItem labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} label="证件照">
                                        {getFieldDecorator('avatar')(
                                            <Fragment
                                            >
                                                {photoImageUrl ? <img src={photoImageUrl} alt="avatar" className={styles.photo} /> : "未上传证件照"}
                                            </Fragment>
                                        )}
                                    </FormItem>
                                </Col>

                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="姓名">
                                        {getFieldDecorator('fullName')(
                                            <Input maxLength={20} />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="员工编号">
                                        {getFieldDecorator('employeeNo')(<Input maxLength={11} />)}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="身份证号">
                                        {getFieldDecorator('identityCard')(<Input maxLength={20} />)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="联系电话">
                                        {getFieldDecorator('mobileTelephone')(<Input maxLength={11} />)}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="岗位">
                                        {getFieldDecorator('position')(
                                            <Select mode="multiple">
                                                {dictItemMap["DICT_EMPLOYEE_POSITION"] ? dictItemMap["DICT_EMPLOYEE_POSITION"].map(item => {
                                                    return <Option key={item.id} value={item.itemValue}>{item.itemName}</Option>
                                                }) : null}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="电子邮箱">
                                        {getFieldDecorator('email')(<Input maxLength={30} />)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="学历">
                                        {getFieldDecorator('education')(
                                            <Select>
                                                {dictItemMap["DICT_EMPLOYEE_EDUCATION"] ? dictItemMap["DICT_EMPLOYEE_EDUCATION"].map(item => {
                                                    return <Option key={item.id} value={item.itemValue}>{item.itemName}</Option>
                                                }) : null}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="性别">
                                        {getFieldDecorator('sex')(
                                            <RadioGroup>
                                                {dictItemMap["DICT_EMPLOYEE_SEX"] ? dictItemMap["DICT_EMPLOYEE_SEX"].map(item => {
                                                    return <RadioButton key={item.id} value={item.itemValue}>{item.itemName}</RadioButton>
                                                }) : null}
                                            </RadioGroup>
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="婚否">
                                        {getFieldDecorator('maritalStatus')(
                                            <RadioGroup >
                                                {dictItemMap["DICT_EMPLOYEE_MARITAL"] ? dictItemMap["DICT_EMPLOYEE_MARITAL"].map(item => {
                                                    return <RadioButton key={item.id} value={item.itemValue}>{item.itemName}</RadioButton>
                                                }) : null}
                                            </RadioGroup>
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="出生日期">
                                        {getFieldDecorator('birthday')(<DatePicker showTime={false} format="YYYY-MM-DD" />)}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="入职日期">
                                        {getFieldDecorator('joinedDate')(<DatePicker showTime={false} format="YYYY-MM-DD" />)}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="转正日期">
                                        {getFieldDecorator('wokeDate')(<DatePicker showTime={false} format="YYYY-MM-DD" />)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="合同截止日">
                                        {getFieldDecorator('contractDate')(<DatePicker showTime={false} format="YYYY-MM-DD" />)}
                                    </FormItem>
                                </Col>
                                <Col span={16}>
                                    <FormItem labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} label="住址">
                                        {getFieldDecorator('address')(
                                            <TextArea style={{ minHeight: 32 }} rows={2} maxLength={200} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <FormItem labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} label="上传资质">
                                        {getFieldDecorator('zizhi')(
                                            <Upload name="zizhi"
                                                listType='picture'
                                                showUploadList={true}
                                                fileList={fileList}
                                                disabled={true}
                                                onPreview={this.onPreview}
                                                beforeUpload={this.beforeUpload2}
                                                onChange={this.onChange2}
                                                onRemove={this.onRemove2}
                                            >
                                                <Button disabled={true}>
                                                    <Icon type="upload" />选择相关资质照片文件
                                                </Button>
                                            </Upload>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Modal>
                <Modal visible={previewVisible} footer={null} width={600} onCancel={this.handleCancel} mask={false}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Fragment>
        );
    }

}

const formatDate = (value) => {
    if(value) {
        return moment(value, dateFormat);
    } else {
        return value;
    }
}

const CreateFormWarpper = Form.create({
    mapPropsToFields(props) {
        return {
            id: Form.createFormField({
                value: props.id.value,
            }),
            fullName: Form.createFormField({
                value: props.fullName.value,
            }),
            mobileTelephone: Form.createFormField({
                value: props.mobileTelephone.value,
            }),
            position: Form.createFormField({
                value: props.position.value,
            }),
            identityCard: Form.createFormField({
                value: props.identityCard.value,
            }),
            email: Form.createFormField({
                value: props.email.value,
            }),
            birthday: Form.createFormField({
                value: formatDate(props.birthday.value),
            }),
            education: Form.createFormField({
                value: props.education.value,
            }),
            sex: Form.createFormField({
                value: props.sex.value,
            }),
            maritalStatus: Form.createFormField({
                value: props.maritalStatus.value,
            }),
            joinedDate: Form.createFormField({
                value: formatDate(props.joinedDate.value),
            }),
            wokeDate: Form.createFormField({
                value: formatDate(props.wokeDate.value),
            }),
            contractDate: Form.createFormField({
                value: formatDate(props.contractDate.value),
            }),
            address: Form.createFormField({
                value: props.address.value,
            }),
            employeeNo: Form.createFormField({
                value: props.employeeNo.value,
            }),
        }
    }
})(CreateForm);

export default CreateFormWarpper;