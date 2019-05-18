import React, { Fragment, Component } from 'react';
import { Row, Col, Card, Form, Input, Select, Button, Icon, DatePicker, Modal, Radio, message, Upload } from 'antd';

import moment from 'moment';
import styles from './index.less'

const FormItem = Form.Item;
const { Option } = Select;
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
        if (!file.originFileObj) {
            this.removeFileIds.push(file.uid);
        }
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
        const { zizhiDisabled, modalVisible, form, handleAdd, handleUpdate, handleModalVisible, confirmLoading, fileList, photoImageUrl, resetFields, dictItemMap } = this.props;
        const { getFieldDecorator, getFieldValue, getFieldError, getFieldsError } = this.props.form;
        const { previewVisible, previewImage } = this.state;
        const isUpdate = !!this.props.id.value;
        const okHandle = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                if (isUpdate) {
                    handleUpdate(fieldsValue, this.photo, fileList, this.removeFileIds, () => {
                        resetFields()
                    });
                } else {
                    handleAdd(fieldsValue, this.photo, fileList, () => {
                        resetFields()
                    });
                }
            });
        };

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

        const uploadButton = (
            <div>
                <Icon type={'plus'} />
                <div className="ant-upload-text">上传</div>
            </div>
        );

        let fullNameError = null;
        if (this.props.fullName.errors) {
            fullNameError = this.props.fullName.errors[0].message;
        }
        let mobileTelephoneError = null;
        if (this.props.mobileTelephone.errors) {
            mobileTelephoneError = this.props.mobileTelephone.errors[0].message;
        }

        return (
            <Fragment>
                <Modal
                    title={isUpdate ? "修改员工信息" : "新建员工信息"}
                    visible={modalVisible}
                    okText="保存"
                    width={1000}
                    onOk={okHandle}
                    confirmLoading={confirmLoading}
                    cancelText="取消"
                    onCancel={() => { handleModalVisible() }}
                >
                    <Form >
                        <FormItem style={{ display: 'none' }}>
                            {form.getFieldDecorator('id')(<Input disabled />)}
                        </FormItem>
                        <Row gutter={4}>
                            <Col span={24}>
                                <FormItem labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} label="证件照"
                                    help={"图片大小不能超过2M"}>
                                    {getFieldDecorator('avatar')(
                                        <Upload
                                            name="avatar"
                                            accept={"image/*"}
                                            listType="picture-card"
                                            className={styles.avatarUploader}
                                            showUploadList={false}
                                            beforeUpload={this.beforeUpload}
                                        >
                                            {photoImageUrl ? <img src={photoImageUrl} alt="avatar" className={styles.photo} /> : uploadButton}
                                        </Upload>
                                    )}
                                </FormItem>
                            </Col>

                        </Row>
                        <Row gutter={24}>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="姓名"
                                    help={fullNameError ? fullNameError : ''}
                                    validateStatus={fullNameError ? 'error' : ''}>
                                    {getFieldDecorator('fullName', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入真实姓名',
                                                whitespace: true,
                                            },
                                        ],
                                    })(
                                        <Input placeholder="姓名" maxLength={20} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="员工编号">
                                    {getFieldDecorator('employeeNo')(<Input placeholder="员工编号" maxLength={11} />)}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="身份证号">
                                    {getFieldDecorator('identityCard')(<Input placeholder="身份证号" maxLength={20} />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="手机号码"
                                    help={mobileTelephoneError ? mobileTelephoneError : ''}
                                    validateStatus={mobileTelephoneError ? 'error' : ''}>
                                    {getFieldDecorator('mobileTelephone', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入手机号码',
                                                whitespace: true,
                                            },
                                        ],
                                    })(<Input placeholder="退款操作时,需要校验手机短信验证码" maxLength={11} />)}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="岗位">
                                    {getFieldDecorator('position')(
                                        <Select
                                            mode="multiple"
                                            placeholder="岗位"
                                        >
                                            {dictItemMap["DICT_EMPLOYEE_POSITION"] ? dictItemMap["DICT_EMPLOYEE_POSITION"].map(item => {
                                                return <Option key={item.id} value={item.itemValue}>{item.itemName}</Option>
                                            }) : null}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="电子邮箱">
                                    {getFieldDecorator('email')(<Input placeholder="电子邮箱" maxLength={30} />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="学历">
                                    {getFieldDecorator('education')(
                                        <Select
                                            placeholder="学历"
                                        >
                                            {dictItemMap["DICT_EMPLOYEE_EDUCATION"] ? dictItemMap["DICT_EMPLOYEE_EDUCATION"].map(item => {
                                                return <Option key={item.id} value={item.itemValue}>{item.itemName}</Option>
                                            }) : null}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="性别">
                                    {getFieldDecorator('sex', {
                                        initialValue: "1",
                                    })(
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
                                    {getFieldDecorator('maritalStatus', {
                                        initialValue: "1",
                                    })(
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
                                    {getFieldDecorator('birthday')(<DatePicker placeholder="出生日期" showTime={false} format="YYYY-MM-DD" />)}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="入职日期">
                                    {getFieldDecorator('joinedDate')(<DatePicker placeholder="入职日期" showTime={false} format="YYYY-MM-DD" />)}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="转正日期">
                                    {getFieldDecorator('wokeDate')(<DatePicker placeholder="转正日期" showTime={false} format="YYYY-MM-DD" />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="合同截止日">
                                    {getFieldDecorator('contractDate')(<DatePicker placeholder="合同截止日" showTime={false} format="YYYY-MM-DD" />)}
                                </FormItem>
                            </Col>
                            <Col span={16}>
                                <FormItem labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} label="住址">
                                    {getFieldDecorator('address')(
                                        <TextArea style={{ minHeight: 32 }} placeholder="请输入住址" rows={2} maxLength={200} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={24}>
                                <FormItem labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} label="上传资质"
                                    help={"最多上传5张资质照片,每张大小不能超过2M."}>
                                    {getFieldDecorator('zizhi')(
                                        <Upload name="zizhi"
                                            listType='picture'
                                            accept={"image/*"}
                                            showUploadList={true}
                                            fileList={fileList}
                                            disabled={zizhiDisabled}
                                            onPreview={this.onPreview}
                                            beforeUpload={this.beforeUpload2}
                                            onChange={this.onChange2}
                                            onRemove={this.onRemove2}
                                        >
                                            <Button disabled={zizhiDisabled}>
                                                <Icon type="upload" />选择相关资质照片文件
                                                </Button>
                                        </Upload>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
                <Modal visible={previewVisible} footer={null} width={600} onCancel={this.handleCancel} mask={false}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Fragment>
        );
    }

}

const formatDate = (value) => {
    if (value) {
        return moment(value, dateFormat);
    } else {
        return value;
    }
}

const CreateFormWarpper = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
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