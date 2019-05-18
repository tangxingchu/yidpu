import React, { Component, Fragment } from 'react';
import { Row, Col, Card, message, Button, Table, Popover, Popconfirm, Rate } from 'antd';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import memberInfoActions from '../../../actions/memberInfo';
import SearchForm from './searchForm';
import ChangeDescModal from '../memberInfo/changeDescModal';
import DetailModal from './detailModal';
import styles from './index.less';

class MemberDeletePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            changeDescModalVisible: false,
            detailModalVisible: false,
        }
        this.columns = [{
            title: '真实姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '手机号码',
            dataIndex: 'phone',
            key: 'phone',
            render: (text, record) => {
                return <a onClick={() => this.handleDetailModalVisible(true, record.id)}>{record.phone}</a>
            }
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render: (text, record) => {
                if(record.sex == "1") {
                    return <span>男</span>
                } else if(record.sex == "2") {
                    return <span>女</span>
                } else {
                    return <span>未知</span>
                }
            }
        }, {
            title: '入会日期',
            dataIndex: 'registerTime',
            key: 'registerTime',
            render: (text, record) => {
                return <Popover title={"具体日期"} content={`${record.registerTime}`}>{`${moment(record.registerTime, "YYYY-MM-DD").fromNow()}`}</Popover>
            }
        }, {
            title: '会员状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                return <span>已删除</span>
            }
        }, {
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday',
            render: (text, record) => {
                if(record.birthday) {
                    return <span>{moment(record.birthday, "YYYY-MM-DD").format('MMM Do')}</span>
                }
            }
        }, {
            title: '会员积分',
            dataIndex: 'point',
            key: 'point',
        }, {
            title: '会员等级',
            dataIndex: 'rank',
            key: 'rank',
            render: (text, record) => {
                return <Rate disabled defaultValue={parseInt(record.rank)} />
            }
        }, {
            title: '最近一次消费时间',
            dataIndex: 'lastConsumptionTime',
            key: 'lastConsumptionTime',
        }, {
            title: '删除时间',
            dataIndex: 'deleteTime',
            key: 'deleteTime',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (
                    <a href="javascript:void(0)" onClick={() =>{this.handleChangeDescModalVisible(true, record.id)}}>恢复会员身份</a>
                )
            }
        }];
    }

    handleChangeDescModalVisible = (flag, memberId) => {
        if(flag) {
            this.memberId = memberId;
        }
        this.setState({changeDescModalVisible: !!flag});
    }

    handleDetailModalVisible = (flag, memberId) => {
        if(flag) {
            this.props.memberInfoActions.selectDeleteDetailById(memberId);
        }
        this.setState({detailModalVisible: !!flag});
    }

    componentDidMount() {
        const { memberList, searchFormData, pageSize } = this.props.memberDelete;
        if(memberList.length == 0) {
            const searchParams = this.getSearchParams(searchFormData);
            searchParams.pageSize = pageSize;
            searchParams.pageNum = 1;
            this.props.memberInfoActions.listDelMember(searchParams);
        }
    }

    getSearchParams = (searchData) => {
        const phone = searchData.phone.value;
        const searchParams = {phone};
        return searchParams;
    }

    handleSearch = (values) => {
        const { searchFormData } = this.props.memberDelete;
        const searchParams = this.getSearchParams(searchFormData);
        if(!searchParams) return;
        const { pageSize } = this.props.memberDelete;
        searchParams.pageSize = pageSize;
        searchParams.pageNum = 1;
        this.props.memberInfoActions.handleMemberDeleteSearch(values);
        this.props.memberInfoActions.listDelMember(searchParams);
    }

    getSearchParams2 = (searchData) => {
        const phone = searchData.phone;
        const searchParams = {phone};
        return searchParams;
    }
    
    onPageChange = (page, pageSize) => {
        const { searchCondition } = this.props.memberDelete;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = page;
        this.props.memberInfoActions.list(searchParams);
    }

    onShowSizeChange = (current, pageSize) => {
        const { searchCondition } = this.props.memberDelete;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = current;
        this.props.memberInfoActions.list(searchParams);
    }

    recoverById = () => {
        const { changeDescValue } = this.props.memberDelete;
        if(!changeDescValue) {
            message.error("请输入原因");
            return;
        }
        this.props.memberInfoActions.recoverById(this.memberId, changeDescValue).then(() => {
            message.success("已恢复至会员基础信息列表中");
            this.handleChangeDescModalVisible(false);
        });
    }

    render() {
        const { changeDescModalVisible, detailModalVisible } = this.state;
        const { loading, recoverLoading, memberList, searchFormData, pageSize, total, currentPage, changeDescValue, detailLoading, memberDetailData } = this.props.memberDelete;
        const { memberDeleteSearchFormFieldChangeValue, memberDeleteResetSearchFormFields, memberDeleteOnChangeDescValueChange } = this.props.memberInfoActions;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize,
            total,
            current: currentPage,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
        };
        return (
            <PageHeaderLayout
                title={"已删除的会员"}
                content={`已删除的会员有可能无法恢复,因为会员信息手机号码必须唯一。如果会员信息中已存在需要恢复会员的手机号码,将无法恢复。`}
            >   
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListOperator}>
                            <SearchForm {...searchFormData}
                                fieldChangeValue={memberDeleteSearchFormFieldChangeValue}
                                resetFields={memberDeleteResetSearchFormFields}
                                handleSearch={this.handleSearch}
                                loading={loading}
                            />
                        </div>
                        <Table rowKey={record => record.id}
                            columns={this.columns}
                            loading={loading}
                            dataSource={memberList}
                            pagination={paginationProps}
                            size={"middle"}
                        />
                    </div>
                </Card>
                <ChangeDescModal 
                    visible={changeDescModalVisible}
                    handleModalVisible={this.handleChangeDescModalVisible}
                    loading={recoverLoading}
                    handleSubmit={this.recoverById}
                    changeDescValue={changeDescValue}
                    onChangeDescValueChange={memberDeleteOnChangeDescValueChange}
                >
                </ChangeDescModal>
                <DetailModal
                    visible={detailModalVisible}
                    handleModalVisible={this.handleDetailModalVisible}
                    loading={detailLoading}
                    memberDetailData={memberDetailData}
                >
                </DetailModal>
            </PageHeaderLayout>
        )
    }

}

export default withRouter(connect((state) => {
    return {
        memberDelete: state.memberDelete,
    }
}, (dispatch) => {
    return {
        memberInfoActions: bindActionCreators(memberInfoActions, dispatch),
    }
})(MemberDeletePage));