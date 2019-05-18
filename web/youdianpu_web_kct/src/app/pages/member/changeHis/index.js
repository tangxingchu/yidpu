import React, { Component, Fragment } from 'react';
import { Row, Col, Card, message, Input, Button, List, Avatar, Spin, Divider, Tag } from 'antd';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import memberChangeHisActions from '../../../actions/memberChangeHis';
import styles from './index.less';

class MemberChangeHisPage extends Component {
    constructor(props) {
        super(props)
    }

    listByPhone = (phone) => {
        if (phone == null || phone == "") {
            message.info("请输入会员手机号码查询");
            return;
        }
        const { pageSize, currentPage, searchPhone } = this.props.memberChangeHis;
        const searchParams = {phone, pageSize, pageNum: 1};
        this.props.memberChangeHisActions.handleSearch(phone);
        this.props.memberChangeHisActions.listChangeHis(searchParams, false);
    }

    onLoadMore = () => {
        const { pageSize, currentPage, searchPhone } = this.props.memberChangeHis;
        const searchParams = {phone: searchPhone, pageSize, pageNum: currentPage + 1};
        this.props.memberChangeHisActions.listChangeHis(searchParams, true);
    }

    render() {
        const { loading, phone, changeHisList, hasMore, searchPhone } = this.props.memberChangeHis;
        const { onChangeHisPhoneChange } = this.props.memberChangeHisActions;
        const loadMore =  searchPhone ? (
            <div style={{
                textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
            }}
            >
                {
                    hasMore ?
                    loading ? <Spin/> :
                    <a onClick={this.onLoadMore} >加载更多</a>
                    : <span>没有更多数据了</span>
                }
            </div>
        ) : null;
        const renderItemTitle = (item) => {
            if(item.changeType == 3) {//解冻
                return <span>{item.changeTime}-<span style={{color: '#87d068'}}>{item.changeTypeName}</span></span>
            } else if(item.changeType == 2) {//冻结
                return <span>{item.changeTime}-<span style={{color: '#ff4242'}}>{item.changeTypeName}</span></span>
            } else {//修改手机号码
                return <span>{item.changeTime}-<span>{item.changeTypeName}</span></span>
            }
        }
        const renderContent = (item) => {
            return (
                <img />
            )
        }
        return (
            <PageHeaderLayout
                title={"会员基本信息变更历史记录"}
                content={`会员基本信息变更历史包括会员冻结、会员解冻、会员手机号码变更、暂时删除会员、恢复已删除会员、积分返现、兑换礼品`}
            >
                <Card bordered={false}>
                    <div className={styles.search}>
                        <Input placeholder="请输入会员手机号码" maxLength={20} value={phone} style={{ width: 200, marginRight: 8 }}
                            onChange={e => { onChangeHisPhoneChange(e.target.value) }}
                            onPressEnter={() => this.listByPhone(phone)}
                        />
                        <Button type="primary" loading={loading} onClick={() => this.listByPhone(phone)}>查询</Button>
                    </div>
                    <List
                        className="demo-loadmore-list"
                        loading={loading}
                        itemLayout="vertical"
                        loadMore={loadMore}
                        dataSource={changeHisList}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={renderItemTitle(item)}
                                    description={`备注信息: ${item.changeDesc}, 操作员: ${item.operationStaff}`}
                                />
                                { item.changeType == 1 ? renderContent(item) : null}
                            </List.Item>
                        )}
                    />
                </Card>
            </PageHeaderLayout>
        )
    }

}

export default withRouter(connect((state) => {
    return {
        memberChangeHis: state.memberChangeHis,
    }
}, (dispatch) => {
    return {
        memberChangeHisActions: bindActionCreators(memberChangeHisActions, dispatch),
    }
})(MemberChangeHisPage));