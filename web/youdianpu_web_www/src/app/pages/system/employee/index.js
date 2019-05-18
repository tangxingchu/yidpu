import React, { PureComponent, Fragment, Component } from 'react';
import { Card, Button, message, Divider, Table, Upload, Popconfirm } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import employeeActions from '../../../actions/employee';
import uploadActions from '../../../actions/upload';
import { getUid, getSub } from '../../../utils/authority';
import CreateForm from './createForm';
import DetailForm from './detailForm';
import styles from './index.less'


class Employee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            detailModalVisiable: false,
        }
        this.preOpreation = null;
    }

    componentDidMount() {
        const { employeeList, dictItemMap } = this.props.employee;
        if (!dictItemMap) {
            this.props.employeeActions.queryDict(["DICT_EMPLOYEE_SEX", "DICT_EMPLOYEE_POSITION", "DICT_EMPLOYEE_MARITAL", "DICT_EMPLOYEE_EDUCATION"]);
        }
        if (employeeList.length === 0) {
            this.props.employeeActions.list({});
        }
    }

    list = () => {
        this.props.employeeActions.list({});
    }

    handleModalVisible = (flag, operation) => {
        //保证编辑 取消之后 在添加显示的不是脏数据
        if (flag) {
            if (this.preOpreation != operation && operation) {
                this.props.employeeActions.resetFields();
            }
            this.preOpreation = operation;
        }
        this.setState({ modalVisible: !!flag });
    }

    handleDetailModalVisible = (flag) => {
        this.setState({ detailModalVisiable: !!flag });
    }

    save = (values, photo, fileList) => {
        let formData = new FormData();
        for (const pro in values) {
            if (values[pro]) {
                formData.append(pro, values[pro]);
            }
        }
        formData.append("merchantId", getUid());
        if (photo != null) {
            formData.append("photo", photo);
        }
        if (fileList != null) {
            for (let i = 0; i < fileList.length; i++) {
                formData.append("files", fileList[i].originFileObj);
            }
        }
        this.props.employeeActions.save(formData).then(() => {
            message.success("员工信息保存成功");
            this.props.employeeActions.list({});
            this.handleModalVisible(false);
        });
    }

    update = (values, photo, fileList, removeFileIds) => {
        let formData = new FormData();
        for (const pro in values) {
            if (values[pro]) {
                formData.append(pro, values[pro]);
            }
        }
        formData.append("merchantId", getUid());
        if (photo != null) {
            formData.append("photo", photo);
        }
        if (fileList != null) {
            for (let i = 0; i < fileList.length; i++) {
                formData.append("files", fileList[i].originFileObj);
            }
        }
        if (removeFileIds && removeFileIds.length > 0) {
            formData.append("delFile", removeFileIds.join(","));
        }
        this.props.employeeActions.update(formData).then(() => {
            message.success("员工信息修改成功");
            this.props.employeeActions.list({});
            this.handleModalVisible(false);
        });
    }

    selectById = (id) => {
        this.props.employeeActions.selectById(id).then(data => {
            if (data.photo) {
                this.props.employeeActions.getPhotoImageBlob(data.photo.filePath);
            }
            if (data.qualificationes) {
                data.qualificationes.map(item => {
                    this.props.employeeActions.getQualificationImageBlob(item);
                });
            }
            this.handleModalVisible(true);
        });
    }

    showDetail = (id) => {
        this.props.employeeActions.selectById(id).then(data => {
            if (data.photo) {
                this.props.employeeActions.getPhotoImageBlob(data.photo.filePath);
            }
            if (data.qualificationes) {
                data.qualificationes.map(item => {
                    this.props.employeeActions.getQualificationImageBlob(item);
                });
            }
            this.handleDetailModalVisible(true);
        });
    }

    beforeUpload = (file) => {
        return true;
    }

    customRequest = ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);
        return this.props.employeeActions.importExcel(formData).then((data) => {
            message.success(`成功导入${data}条数据.`);
            this.props.employeeActions.list({});
        }).catch(e => {
            message.error(e.message);
            console.error(e);
        });
        return Promise.resolve();
    }

    deleteEmployee = (id) => {
        return this.props.employeeActions.deleteEmployee({ id }).then((data) => {
            message.success(`删除成功.`);
        }).catch(e => {
            message.error(e.message);
            console.error(e);
        });
    }

    render() {
        const { loading, employeeList, saveLoading, employeeData, byIdLoading, fileList, photoImageUrl, zizhiDisabled, importLoading, dictItemMap = {} } = this.props.employee;
        const { fieldChangeValue, resetFields, fileOnChange, photoOnChange } = this.props.employeeActions;
        const { upload } = this.props.uploadActions;
        const { modalVisible, detailModalVisiable } = this.state;

        const columns = [
            {
                title: '姓名',
                dataIndex: 'fullName',
                key: 'fullName',
            },
            {
                title: '员工编号',
                dataIndex: 'employeeNo',
                key: 'employeeNo',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render: (text, record) => {
                    if (dictItemMap && dictItemMap["DICT_EMPLOYEE_SEX"] && record.sex) {
                        const dictItem = dictItemMap["DICT_EMPLOYEE_SEX"].find(item => item.itemValue == record.sex);
                        return dictItem ? dictItem.itemName : text;
                    } else {
                        return text;
                    }
                }
            },
            {
                title: '联系电话',
                dataIndex: 'mobileTelephone',
                key: 'mobileTelephone',
            },
            {
                title: '岗位',
                dataIndex: 'position',
                key: 'position',
                render: (text, record) => {
                    if (dictItemMap && dictItemMap["DICT_EMPLOYEE_POSITION"] && record.position) {
                        const positionNames = [];
                        const positions = record.position.split(",");
                        for (let i = 0; i < positions.length; i++) {
                            const dictItem = dictItemMap["DICT_EMPLOYEE_POSITION"].find(item => item.itemValue == positions[i]);
                            positionNames.push(dictItem ? dictItem.itemName : text);
                        }
                        return positionNames.join(",");
                    } else {
                        return text;
                    }
                }
            },
            {
                title: '身份证号码',
                dataIndex: 'identityCard',
                key: 'identityCard',
            },
            {
                title: '出生日期',
                dataIndex: 'birthday',
                key: 'birthday',
            },
            {
                title: '学历',
                dataIndex: 'education',
                key: 'education',
                render: (text, record) => {
                    if (dictItemMap && dictItemMap["DICT_EMPLOYEE_EDUCATION"] && record.education) {
                        const dictItem = dictItemMap["DICT_EMPLOYEE_EDUCATION"].find(item => item.itemValue == record.education);
                        return dictItem ? dictItem.itemName : text;
                    } else {
                        return text;
                    }
                }
            },
            {
                title: '入职日期',
                dataIndex: 'joinedDate',
                key: 'joinedDate',
            },
            {
                title: '合同截止日',
                dataIndex: 'contractDate',
                key: 'contractDate',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Fragment>
                        <Popconfirm title="确定删除吗？" okText="确定" cancelText="取消" onConfirm={() => { this.deleteEmployee(record.id) }}>
                            <a href="javascript:;">删除</a>
                        </Popconfirm>
                        <Divider type="vertical" />
                        <a href="javascript:void(0)" onClick={() => { this.selectById(record.id) }}>编辑</a>
                        <Divider type="vertical" />
                        <a href="javascript:void(0)" onClick={() => { this.showDetail(record.id) }}>查看详细</a>
                    </Fragment>
                ),
            },
        ];

        const uploadButton = (
            <Button icon="arrow-up" loading={importLoading}>
                {importLoading ? "数据导入中" : "导入"}
            </Button>
        );

        return (
            <PageHeaderLayout
                title="员工信息管理"
            >
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}></div>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true, true)}>
                                新增
                            </Button>
                            <Upload name="importExcel"
                                showUploadList={false}
                                accept={".xlsx"}
                                customRequest={this.customRequest}
                                beforeUpload={this.beforeUpload}
                            >
                                {uploadButton}
                            </Upload>
                            <Button icon="reload" onClick={() => this.list()}>
                                刷新
                            </Button>
                            {/* <Button icon="arrow-down" onClick={() => this.handleModalVisible(true)}>
                                导出
                            </Button> */}
                            <a href="javascript:void(0)" onClick={() => { }}>模板下载</a>
                        </div>
                        <Table rowKey={record => record.id}
                            loading={loading}
                            columns={columns}
                            dataSource={employeeList}
                        />
                    </div>
                </Card>
                <CreateForm modalVisible={modalVisible}
                    {...employeeData}
                    confirmLoading={saveLoading}
                    handleModalVisible={this.handleModalVisible}
                    handleAdd={this.save}
                    handleUpdate={this.update}
                    upload={upload}
                    fieldChangeValue={fieldChangeValue}
                    byIdLoading={byIdLoading}
                    fileList={fileList}
                    photoImageUrl={photoImageUrl}
                    resetFields={resetFields}
                    fileOnChange={fileOnChange}
                    photoOnChange={photoOnChange}
                    zizhiDisabled={zizhiDisabled}
                    dictItemMap={dictItemMap || {}}
                />
                <DetailForm modalVisible={detailModalVisiable}
                    {...employeeData}
                    handleModalVisible={this.handleDetailModalVisible}
                    fileList={fileList}
                    resetFields={resetFields}
                    photoImageUrl={photoImageUrl}
                    dictItemMap={dictItemMap || {}}
                />
            </PageHeaderLayout>
        )
    }

}


export default withRouter(connect((state) => {
    return {
        employee: state.employee,
    }
}, (dispatch) => {
    return {
        employeeActions: bindActionCreators(employeeActions, dispatch),
        uploadActions: bindActionCreators(uploadActions, dispatch),
    }
})(Employee));