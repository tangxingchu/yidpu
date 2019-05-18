import React, { Component, Fragment } from 'react';
import { Row, Col, Card, message, Button } from 'antd';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import memberInfoActions from '../../../actions/memberInfo';
import MemberList from './memberList';
import MemberInfoForm from './memberInfoForm';
import MemberDetailForm from './memberDetailForm';
import ChangeDescModal from './changeDescModal';
import styles from './index.less';

class MemberInfoPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            changeDescModalVisible: false,
        }
    }

    handleChangeDescModalVisible = (flag, memberId, optionType) => {
        if(flag) {
            this.optionType = optionType;//是解冻还是冻结
            this.memberId = memberId;
        }
        this.setState({changeDescModalVisible: !!flag});
    }

    componentDidMount() {
        const { memberList, searchFormData, pageSize, routerPath } = this.props.memberInfo;
        if(memberList.length == 0) {
            const searchParams = this.getSearchParams(searchFormData);
            searchParams.pageSize = pageSize;
            searchParams.pageNum = 1;
            this.props.memberInfoActions.list(searchParams);
        }
        if(routerPath) {
            this.props.history.push(routerPath);
        }
    }

    handleSubmit = (values, flag) => {
        //修改
        values.registerTime = values.registerTime.format('YYYY-MM-DD');
        values.birthday = values.birthday ? values.birthday.format('YYYY-MM-DD') : null;
        if(values.id) {
            this.props.memberInfoActions.update(values).then(() => {
                this.goBack(false);
                this.props.memberInfoActions.resetMemberInfoFormFields();
                message.success("会员信息修改成功");
            });
        } else {
            this.props.memberInfoActions.save(values).then(() => {
                if(flag) {
                    this.goBack(true);
                }
                message.success("会员信息新增成功");
                this.props.memberInfoActions.resetMemberInfoFormFields();
            });
        }        
    }

    goBack = (flag) => {
        const path = this.props.match.path;
        this.props.history.goBack();
        if(flag) {
            this.reload();
        }
        this.props.memberInfoActions.memberInfoChangeRouter(`${path}`);
    }

    getSearchParams = (searchData) => {
        const phone = searchData.phone.value;
        const register = searchData.register.value;
        const referrerName = searchData.referrerName.value;
        const searchParams = {phone, register, referrerName};
        return searchParams;
    }

    handleSearch = (values, sorterField, sorterOrder) => {
        const { searchFormData } = this.props.memberInfo;
        const searchParams = this.getSearchParams(searchFormData);
        if(!searchParams) return;
        const { pageSize } = this.props.memberInfo;
        searchParams.pageSize = pageSize;
        searchParams.pageNum = 1;
        if(sorterField && sorterOrder) {
            if(sorterOrder == 'ascend') {
                searchParams.sorts = `${sorterField} asc`;
            } else {
                searchParams.sorts = `${sorterField} desc`;
            }
        }
        if(values) {
            this.props.memberInfoActions.handleSearch(values);
        }
        this.props.memberInfoActions.list(searchParams);
    }

    getSearchParams2 = (searchData) => {
        const phone = searchData.phone;
        const register = searchData.register;
        const referrerName = searchData.referrerName;
        const searchParams = {phone, register, referrerName};
        return searchParams;
    }

    reload = () => {
        const { searchCondition, currentPage, pageSize } = this.props.memberInfo;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = currentPage;
        this.props.memberInfoActions.list(searchParams);
    }

    onPageChange = (page, pageSize) => {
        const { searchCondition } = this.props.memberInfo;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = page;
        this.props.memberInfoActions.list(searchParams);
    }

    onShowSizeChange = (current, pageSize) => {
        const { searchCondition } = this.props.memberInfo;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = current;
        this.props.memberInfoActions.list(searchParams);
    }

    selectById = (id) => {
        const path = this.props.match.path;
        this.props.memberInfoActions.memberInfoChangeRouter(`${path}/add`);
        this.props.memberInfoActions.selectById(id);
    }

    //解冻会员信息
    unfreeze = (id, changeDesc) => {
        this.props.memberInfoActions.unfreeze(id, changeDesc).then(() => {
            message.success("已解冻会员信息");
            this.handleChangeDescModalVisible(false);
        });
    }

    //冻结会员信息
    freeze = (id, changeDesc) => {
        this.props.memberInfoActions.freeze(id, changeDesc).then(() => {
            message.success("已冻结会员信息");
            this.handleChangeDescModalVisible(false);
        });
    }

    //查询会员明细
    selectDetailById = (id) => {
        const path = this.props.match.path;
        this.props.memberInfoActions.memberInfoChangeRouter(`${path}/detail`);
        this.props.memberInfoActions.selectDetailById(id);
    }

    handleAddMemberInfo = () => {
        const path = this.props.match.path;
        this.props.memberInfoActions.memberInfoChangeRouter(`${path}/add`);
        this.props.memberInfoActions.resetMemberInfoFormFields();
    }

    deleteById = (id, changeDesc) => {
        this.props.memberInfoActions.deleteById(id, changeDesc).then(() => {
            message.success("暂时删除成功,以后您可以在已删除会员功能中恢复");
            this.handleChangeDescModalVisible(false);
        });
    }

    freezeOrUnFreeze = () => {
        const { changeDescValue } = this.props.memberInfo;
        if(!changeDescValue) {
            message.error("请输入原因");
            return;
        }
        if(this.optionType == 0) {//解冻
            this.unfreeze(this.memberId, changeDescValue);
        } else if(this.optionType == 1) {
            this.freeze(this.memberId, changeDescValue);
        } else if(this.optionType == 2) {
            this.deleteById(this.memberId, changeDescValue);
        }        
    }

    render() {
        const { changeDescModalVisible } = this.state;
        const path = this.props.match.path;
        const { history } = this.props;
        const { loading, saveLoading, memberList, memberInfoData, searchFormData, memberDetailData, detailLoading, pageSize, total,
            currentPage, freezeLoading, changeDescValue } = this.props.memberInfo;
        const { memberInfoFieldChangeValue, resetMemberInfoFormFields, searchFormFieldChangeValue, resetSearchFormFields, 
            onChangeDescValueChange } = this.props.memberInfoActions;
            
        return (
            <PageHeaderLayout
                title={"会员基础信息管理"}
                content={`录入线下采集的会员基本信息,如果需要开发微信公众号采集线上会员信息可以与我们客服联系,我们为您定制开发微信公众号`}
            >   
                <Card bordered={false}>
                    <Switch>
                        <Route
                            path={`${path}`}
                            exact={true}
                            render={() => {
                                return (
                                    <MemberList loading={loading}
                                        memberList={memberList}
                                        path={path}
                                        searchFormData={searchFormData}
                                        searchFormFieldChangeValue={searchFormFieldChangeValue}
                                        resetSearchFormFields={resetSearchFormFields}
                                        handleAddMemberInfo={this.handleAddMemberInfo}
                                        handleSearch={this.handleSearch}
                                        pageSize={pageSize}
                                        total={total}
                                        currentPage={currentPage}
                                        onPageChange={this.onPageChange}
                                        onShowSizeChange={this.onShowSizeChange}
                                        selectById={this.selectById}
                                        handleChangeDescModalVisible={this.handleChangeDescModalVisible}
                                        selectDetailById={this.selectDetailById}
                                    />
                                )
                            }}
                        />
                        <Route
                            path={`${path}/add`}
                            exact={true}
                            render={() => {
                                return (
                                    <MemberInfoForm {...memberInfoData} 
                                        detailLoading={detailLoading}
                                        fieldChangeValue={memberInfoFieldChangeValue}
                                        resetForm={resetMemberInfoFormFields}
                                        goBack={this.goBack}
                                        handleSubmit={this.handleSubmit}
                                        saveLoading={saveLoading}
                                    />
                                )
                            }}
                        />
                        <Route
                            path={`${path}/detail`}
                            exact={true}
                            render={() => {
                                return (
                                    <MemberDetailForm {...memberDetailData} 
                                        detailLoading={detailLoading}
                                        history={history}
                                    >
                                        <Button onClick={() => this.goBack(false)}>返回</Button>
                                    </MemberDetailForm>
                                )
                            }}
                        />
                    </Switch>
                </Card>
                <ChangeDescModal 
                    visible={changeDescModalVisible}
                    handleModalVisible={this.handleChangeDescModalVisible}
                    loading={freezeLoading}
                    handleSubmit={this.freezeOrUnFreeze}
                    changeDescValue={changeDescValue}
                    onChangeDescValueChange={onChangeDescValueChange}
                >
                </ChangeDescModal>
            </PageHeaderLayout>
        )
    }

}

export default withRouter(connect((state) => {
    return {
        memberInfo: state.memberInfo,
    }
}, (dispatch) => {
    return {
        memberInfoActions: bindActionCreators(memberInfoActions, dispatch),
    }
})(MemberInfoPage));