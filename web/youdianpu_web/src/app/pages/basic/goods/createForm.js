import React, { Fragment, Component } from 'react';
import { Row, Col, Card, Form, Input, Select, InputNumber, Spin, Tooltip, Icon, Modal, message, Upload, Tabs, Checkbox } from 'antd';
import moment from 'moment';
import numeral from 'numeral';

import SelectedExtra from './selectedExtra';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { Option } = Select;
const { TextArea } = Input;

class CreateForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            removeFileIds: [],
        };
    }

    componentDidMount() {
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
        //删除已有的图片
        if (!file.originFileObj) {
            this.state.removeFileIds.push(file.uid);
        }
        this.props.removeFile({uid: file.uid});
    }

    onPreview = (file) => {
        this.setState({ previewVisible: true, previewImage: file.url || file.thumbUrl });
    }

    handleCancel = () => {
        this.setState({ previewVisible: false });
    }

    render() {
        const { modalVisible, form, handleAdd, handleUpdate, handleModalVisible, onTabChange, extraList, onExtraChange, extraItems, selectedExtraItems,
            onPriceChange, detailLoading, networkPrinters,
            confirmLoading, fileList, resetFields, categoryList, dictItemMap, activeKey } = this.props;
        const { getFieldDecorator, getFieldValue, getFieldError, getFieldsError } = this.props.form;
        const { previewVisible, previewImage, removeFileIds } = this.state;
        const isUpdate = !!this.props.id.value;
        const okHandle = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                const defaultImageFile = fileList.find(item => item.uid === this.props.defaultImage.value);
                if (!defaultImageFile) {
                    message.error("您选择的默认图片已不在图片列表中,请重新选择.");
                    return;
                }
                //后台还没有的图片
                let defaultImageIndex = null, defaultImageId = null;
                if (defaultImageFile.originFileObj) {
                    let index = -1;
                    fileList.map(item => {
                        if (item.originFileObj && item.uid === defaultImageFile.uid) { //必须是新上传的文件的索引
                            index++;
                        }
                    })
                    defaultImageIndex = index;
                } else {
                    defaultImageId = defaultImageFile.uid;
                }
                if (isUpdate) {
                    handleUpdate(fieldsValue, fileList, removeFileIds, defaultImageIndex, defaultImageId, () => {
                        resetFields()
                    });
                } else {
                    handleAdd(fieldsValue, fileList, defaultImageIndex, () => {
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
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

        let nameError = null;
        if (this.props.name.errors) {
            nameError = this.props.name.errors[0].message;
        }
        let priceError = null;
        if (this.props.price.errors) {
            priceError = this.props.price.errors[0].message;
        }
        let categoryError = null;
        if (this.props.category.errors) {
            categoryError = this.props.category.errors[0].message;
        }
        // let printerIdError = null;
        // if (this.props.printerId.errors) {
        //     printerIdError = this.props.printerId.errors[0].message;
        // }
        let defaultImageError = null;
        if (this.props.defaultImage.errors) {
            defaultImageError = this.props.defaultImage.errors[0].message;
        }
        return (
            <Fragment>
                <Modal
                    title={isUpdate ? "修改商品信息(注意：主信息与附属信息需要分别保存)" : "新建商品信息(请先保存主信息,在编辑附属信息保存)"}
                    visible={modalVisible}
                    okText="保存"
                    width={1000}
                    onOk={okHandle}
                    confirmLoading={confirmLoading}
                    maskClosable={false}
                    cancelText="关闭"
                    onCancel={() => { handleModalVisible() }}
                >
                    <Spin spinning={detailLoading}>
                    <Tabs onChange={onTabChange} type="card" activeKey={activeKey}>
                        <TabPane tab="商品主信息" key="1">
                            <Card bordered={false}>
                                <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
                                    <FormItem style={{ display: 'none' }}>
                                        {form.getFieldDecorator('id')(<Input disabled />)}
                                    </FormItem>
                                    <Row gutter={24}>
                                        <Col span={12}>
                                            <FormItem {...formItemLayout} label="商品名称"
                                                help={nameError ? nameError : ''}
                                                validateStatus={nameError ? 'error' : ''}>
                                                {getFieldDecorator('name', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '请输入商品名称',
                                                            whitespace: true,
                                                        },
                                                    ],
                                                })(
                                                    <Input placeholder="商品名称" maxLength={20} />
                                                    )}
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem {...formItemLayout} label="拼音简写"
                                                help={"商品名称拼音首字母,可以更快捷查找"}>
                                                {getFieldDecorator('piny')(
                                                    <Input placeholder="比如宫保鸡丁的拼音简写:gbjd" maxLength={20} />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={24}>
                                        <Col span={12}>
                                            <FormItem {...formItemLayout} label="计量单位">
                                                {getFieldDecorator('unit')(
                                                    <Select
                                                        placeholder="计量单位"
                                                    >
                                                        {dictItemMap["DICT_GOODS_UNIT"] ? dictItemMap["DICT_GOODS_UNIT"].map(item => {
                                                            return <Option key={item.id} value={item.itemValue}>{item.itemName}</Option>
                                                        }) : null}
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem {...formItemLayout} label="成本价格(￥)">
                                                {getFieldDecorator('costPrice')(
                                                    <InputNumber min={0} step={0.01} precision={2}
                                                        formatter={value => numeral(`${value}`).format('0,0.00')}
                                                    />
                                                )}
                                            </FormItem>
                                        </Col>

                                    </Row>
                                    <Row gutter={24}>
                                        <Col span={12}>
                                            <FormItem {...formItemLayout} label="销售价格(￥)"
                                                help={priceError ? priceError : ''}
                                                validateStatus={priceError ? 'error' : ''}>
                                                {getFieldDecorator('price', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '请输入销售价格',
                                                        },
                                                    ],
                                                })(
                                                    <InputNumber min={0} step={0.01}
                                                        formatter={value => numeral(`${value}`).format('0,0.00')}
                                                    />
                                                    )}
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem {...formItemLayout} label="库存">
                                                {getFieldDecorator('inventory')(
                                                    <InputNumber
                                                        min={0} max={99999}
                                                        formatter={value => numeral(`${value}`).format('0,0')}
                                                    />
                                                )}
                                            </FormItem>
                                        </Col>

                                    </Row>
                                    <Row gutter={24}>
                                        <Col span={12}>
                                            <FormItem {...formItemLayout} label="分类"
                                                help={categoryError ? categoryError : ''}
                                                validateStatus={categoryError ? 'error' : ''}>
                                                {getFieldDecorator('category', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '请选择分类',
                                                        },
                                                    ],
                                                })(
                                                    <Select
                                                        placeholder="商品分类"
                                                    >
                                                        {
                                                            categoryList.map(item => {
                                                                return (
                                                                    <Option key={item.id} value={item.id}>{item.categoryName}</Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                    )}
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} label="打印机">
                                                {getFieldDecorator('printerId', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '请选择后厨打印机',
                                                        },
                                                    ],
                                                })(
                                                    <Select>
                                                        <Select.Option key={0} value={""} style={{height: 24}}></Select.Option>
                                                        {
                                                            networkPrinters.map(item => {
                                                                return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                                            })
                                                        }
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={24}>
                                        <Col span={24}>
                                            <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} label="备注">
                                                {getFieldDecorator('description')(
                                                    <TextArea style={{ minHeight: 32 }} placeholder="" rows={2} maxLength={200} />
                                                )}
                                            </FormItem>
                                        </Col>       
                                    </Row>
                                    <Row gutter={24}>
                                        <Col span={24}>
                                            <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} label={(
                                                <span>
                                                    上传商品图片&nbsp;
                                            <Tooltip title="上传图片是让顾客在自助点餐时浏览商品图片">
                                                        <Icon type="question-circle-o" />
                                                    </Tooltip>
                                                </span>
                                            )}
                                                help={"最多上传5张商品图片,每张大小不能超过2M."}>
                                                {getFieldDecorator('image')(
                                                    <Upload name="image"
                                                        accept={"image/*"}
                                                        listType='picture-card'
                                                        showUploadList={true}
                                                        fileList={fileList}
                                                        onPreview={this.onPreview}
                                                        beforeUpload={this.beforeUpload2}
                                                        onChange={this.onChange2}
                                                        onRemove={this.onRemove2}
                                                    >
                                                        {fileList.length >= 5 ? null : uploadButton}
                                                    </Upload>
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={24}>
                                        <Col span={24}>
                                            <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} label="默认显示图片"
                                                help={defaultImageError ? defaultImageError : '请先上传一张图片'}
                                                validateStatus={defaultImageError ? 'error' : ''}>
                                                {getFieldDecorator('defaultImage', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '请选择默认显示图片',
                                                        },
                                                    ],
                                                })(
                                                    <Select
                                                        placeholder="默认显示图片"
                                                    >
                                                        {
                                                            fileList.map((item, index) => {
                                                                return (
                                                                    <Option key={item.uid} value={item.uid}>第{index + 1}张-{item.name || item.originFileObj.name}</Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                    )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </TabPane>
                        <TabPane tab="商品附属信息" disabled={!this.props.id.value} key="2">
                            <Fragment>
                                <Card title={"可选取的商品附属信息"}>
                                    <Row>
                                    {
                                        extraList.map(extra => {
                                            return <Col span={4} key={extra.id}><Checkbox onChange={onExtraChange} value={extra.dictCode} checked={extra.checked}>{extra.dictName}</Checkbox></Col>
                                        })
                                    }
                                    </Row>
                                </Card>
                                <Card title={"已选取的商品附属信息"} style={{marginTop: 8}}>
                                    <SelectedExtra extraList={extraList}
                                        selectedExtraItems={selectedExtraItems}
                                        onChange={onPriceChange}
                                    />
                                </Card>
                            </Fragment>
                        </TabPane>
                    </Tabs>
                    </Spin>
                </Modal>
                <Modal visible={previewVisible} footer={null} width={800} onCancel={this.handleCancel} mask={false}>
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
            name: Form.createFormField({
                value: props.name.value,
            }),
            piny: Form.createFormField({
                value: props.piny.value,
            }),
            unit: Form.createFormField({
                value: props.unit.value,
            }),
            costPrice: Form.createFormField({
                value: props.costPrice.value,
            }),
            price: Form.createFormField({
                value: props.price.value,
            }),
            inventory: Form.createFormField({
                value: props.inventory.value,
            }),
            category: Form.createFormField({
                value: props.category.value,
            }),
            printerId: Form.createFormField({
                value: props.printerId.value,
            }),
            description: Form.createFormField({
                value: props.description.value,
            }),
            defaultImage: Form.createFormField({
                value: props.defaultImage.value,
            }),
        }
    }
})(CreateForm);

export default CreateFormWarpper;