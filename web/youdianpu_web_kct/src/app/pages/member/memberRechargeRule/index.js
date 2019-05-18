import React, { Component, Fragment } from 'react';
import { Row, Col, Card, message, Button, InputNumber, Form, Rate, Alert, Spin } from 'antd';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import memberInfoActions from '../../../actions/memberInfo';
import RechargeRuleList from './rechargeRuleList';
import RechargeRuleForm from './rechargeRuleForm';
import styles from './index.less';

class MemberRechargeRule extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { rechargeRuleList, routerPath } = this.props.memberRechargeRule;
        if(rechargeRuleList.length == 0) {
            this.props.memberInfoActions.listRechargeConfig();
        }
        if(routerPath) {
            this.props.history.push(routerPath);
        }
    }

    reload = () => {
        this.props.memberInfoActions.listRechargeConfig();
    }

    goBack = (flag) => {
        const path = this.props.match.path;
        this.props.memberInfoActions.rechargeRuleChangeRouter(`${path}`);
        this.props.history.goBack();
        if(flag) {
            this.props.memberInfoActions.listRechargeConfig();
        }        
    }

    handleAdd = () => {
        const path = this.props.match.path;
        this.props.memberInfoActions.rechargeRuleChangeRouter(`${path}/add`);
        this.props.memberInfoActions.resetRechargeRuleFormFields();
    }

    handleSubmit = (values) => {
        const effectiveTime = values.effectiveTime.format('YYYY-MM-DD');
        const expiredTime = values.expiredTime ? values.expiredTime.format('YYYY-MM-DD') : null;
        values.effectiveTime = effectiveTime;
        values.expiredTime = expiredTime;
        if(values.id) {
            this.props.memberInfoActions.updateRechargeRule(values).then(() => {
                this.goBack(true);
                message.success("会员充值优惠信息修改成功");
            });
        } else {
            this.props.memberInfoActions.saveRechargeRule(values).then(() => {
                this.goBack(true);
                message.success("会员充值优惠信息新增成功");
            });
        }
    }

    deleteRechargeRule = (id) => {
        this.props.memberInfoActions.deleteRechargeRule(id).then(() => {
            message.success("充值活动删除成功");
        });
    }

    handleEdit = (id) => {
        const path = this.props.match.path;
        this.props.memberInfoActions.rechargeRuleChangeRouter(`${path}/add`);
        this.props.memberInfoActions.selectRechargeRuleById(id);
    }

    render() {
        const path = this.props.match.path;
        const { loading, rechargeRuleList, saveLoading, detailLoading, rechargeRuleFormData } = this.props.memberRechargeRule;
        const { currMerchantInfo } = this.props.homePage;
        const { logoPath } = currMerchantInfo;
        const { rechargeRuleFieldChangeValue, resetRechargeRuleFormFields } = this.props.memberInfoActions;
        return (
            <PageHeaderLayout
                title={"会员充值活动配置"}
                content={`配置会员充值满多少送多少规则。`}
            >
                <Card bordered={false}>
                    <Switch>
                        <Route
                            path={`${path}`}
                            exact={true}
                            render={() => {
                                return (
                                    <RechargeRuleList loading={loading}
                                        rechargeRuleList={rechargeRuleList}
                                        handleAdd={this.handleAdd}
                                        logoPath={logoPath}
                                        path={path}
                                        reload={this.reload}
                                        deleteRechargeRule={this.deleteRechargeRule}
                                        handleEdit={this.handleEdit}
                                    >
                                    </RechargeRuleList>
                                )
                            }}
                        />
                        <Route
                            path={`${path}/add`}
                            exact={true}
                            render={() => {
                                return (
                                    <RechargeRuleForm {...rechargeRuleFormData}
                                        detailLoading={detailLoading}
                                        saveLoading={saveLoading}
                                        fieldChangeValue={rechargeRuleFieldChangeValue}
                                        goBack={this.goBack}
                                        handleSubmit={this.handleSubmit}
                                    >
                                    </RechargeRuleForm>
                                )
                            }}
                        />
                    </Switch>
                </Card>
            </PageHeaderLayout>
        )
    }
}

export default withRouter(connect((state) => {
    return {
        homePage: state.homePage,
        memberRechargeRule: state.memberRechargeRule,
    }
}, (dispatch) => {
    return {
        memberInfoActions: bindActionCreators(memberInfoActions, dispatch),
    }
})(MemberRechargeRule));