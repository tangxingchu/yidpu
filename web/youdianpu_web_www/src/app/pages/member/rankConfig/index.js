import React, { Component, Fragment } from 'react';
import { Row, Col, Card, message, Button, InputNumber, Form, Rate, Alert, Spin } from 'antd';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import memberInfoActions from '../../../actions/memberInfo';
import styles from './index.less';

class MemberRankConfig extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { rankConfigList } = this.props.memberRankConfig;
        if(rankConfigList.length == 0) {
            this.props.memberInfoActions.listRankConfig();
        }
    }

    render() {
        const { loading, updateLoading, rankConfigList } = this.props.memberRankConfig;
        const { updateRankConfig, listRankConfig } = this.props.memberInfoActions;
        return (
            <PageHeaderLayout
                title={"会员等级对应积分配置"}
                content={`配置会员消费满多少积分自动提升会员等级。系统已为您默认了会员消费达到一定积分自动提升会员等级,您可以根据您实际情况调整。
                    注意：已达到相应等级的会员不会因为您修改积分而调整相应等级。`}
            >   
                <Card bordered={false}>
                    <Spin spinning={loading}>
                        <WrappedRankConfigForm updateRankConfig={updateRankConfig} 
                            updateLoading={updateLoading}
                            listRankConfig={listRankConfig}
                            rankConfigList={rankConfigList}>
                            loading={loading}
                        </WrappedRankConfigForm>
                    </Spin>
                </Card>
            </PageHeaderLayout>
        )
    }

}

class RankConfigForm extends Component {


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.updateRankConfig(values).then(() => {
                    message.success("成功修改会员等级配置");
                });
            }
        });
    }

    renderLabel = (value) => {
        return (
            <span>
                <Rate value={value} disabled/>{value}星会员
            </span>
        )
    }

    render() {
        const {form, rankConfigList, updateLoading, loading, listRankConfig} = this.props;
        return (
            <Fragment>
                <div>
                    <Button icon="reload" loading={loading} onClick={() => listRankConfig()}>
                        刷新
                    </Button>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    {
                        rankConfigList.map(item => {
                            return (
                                <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label={this.renderLabel(item.memberRank)} key={item.id}>
                                    {form.getFieldDecorator(`rank${item.memberRank}`, {
                                        initialValue: item.memberPoint
                                    })(
                                        <InputNumber step={100} min={0} style={{width: 280, marginRight: 4}}/>
                                    )}
                                    <span>积分</span>
                                </Form.Item>
                            )
                        })
                    }
                    <Form.Item wrapperCol={{ span: 24, offset: 10 }}>
                        <Button type="primary" htmlType="submit" loading={updateLoading}>确认修改</Button>
                    </Form.Item>
                </Form>
            </Fragment>
        )
    }

}

const WrappedRankConfigForm = Form.create()(RankConfigForm);

export default withRouter(connect((state) => {
    return {
        memberRankConfig: state.memberRankConfig,
    }
}, (dispatch) => {
    return {
        memberInfoActions: bindActionCreators(memberInfoActions, dispatch),
    }
})(MemberRankConfig));