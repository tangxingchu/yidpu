import React, { Component, Fragment } from 'react';
import { Row, Col, Card, message, Input, Button, List, Avatar, Spin, Divider, Tag, Menu } from 'antd';
import { Switch, Route, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import memberRedemptionActions from '../../../actions/memberRedemption';
import Gift from './gift';
import AddGiftModal from './addGiftModal';
import PointCash from './pointCash';
import PointGift from './pointGift';
import RedemptionList from './redemptionList';
import styles from './index.less';

class MemberRedemptionPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            giftModalVisible: false,
        }
    }

    handleGiftModalVisible = (flag) => {
        this.setState({giftModalVisible: !!flag});
    }

    componentDidMount() {
        const path = this.props.match.path;
        const { routerPath, selectedKeys, giftList, currentPage, pageSize } = this.props.memberRedemption;
        if(routerPath) {
            this.props.history.push(routerPath);
        } else {
            this.props.history.push(`${path}/${selectedKeys[0]}`);
        }
        if(giftList.length == 0) {
            this.props.memberRedemptionActions.listGift(pageSize, currentPage);
        }
    }

    refresh = () => {
        const { pageSize } = this.props.memberRedemption;
        this.props.memberRedemptionActions.listGift(pageSize, 1)
    }

    onMenuSelect = ({ item, key, selectedKeys }) => {
        const path = this.props.match.path;
        this.props.memberRedemptionActions.changeRouter(`${path}/${key}`);
        this.props.memberRedemptionActions.onMenuSelect(selectedKeys);
    }

    handleSubmit = (values) => {
        if(values.id) {
            this.props.memberRedemptionActions.updateGift(values).then(() => {
                message.success("礼品修改成功");
                this.handleGiftModalVisible(false);
            });
        } else {
            this.props.memberRedemptionActions.saveGift(values).then(() => {
                message.success("礼品新增成功");
                this.handleGiftModalVisible(false);
                this.refresh();
            });
        }        
    }

    selectGiftById = (id) => {
        this.handleGiftModalVisible(true);
        this.props.memberRedemptionActions.selectGiftById(id);
    }

    deleteGiftById = (id) => {
        this.props.memberRedemptionActions.deleteGift(id).then(() => {
            message.success("礼品删除成功");
        });
    }

    redemptionGift = (giftId, changeDesc) => {
        changeDesc = changeDesc == null ? "" : changeDesc;
        const { pointFormData } = this.props.memberRedemption;
        const memberId = pointFormData.id.value;
        this.props.memberRedemptionActions.redemptionGift(memberId, giftId, changeDesc).then(() => {
            message.success("礼品兑换成功");
        });
    }

    redemptionCash = (point, changeDesc) => {
        changeDesc = changeDesc == null ? "" : changeDesc;
        const { pointFormData } = this.props.memberRedemption;
        const memberId = pointFormData.id.value;
        this.props.memberRedemptionActions.redemptionCash(memberId, point, changeDesc).then(() => {
            message.success("积分返现成功");
        });
    }

    render() {
        const { giftModalVisible } = this.state;
        const path = this.props.match.path;
        const { selectedKeys, phone, giftLoading, loading, saveGiftLoading, detailGiftLoading, giftList, pageSize, total, 
            currentPage, giftFormData, pointLoading, pointFormData, pointGiftFormData, redemptionLoading, pointCashFormData,
            selectPointCashLoading } = this.props.memberRedemption;
        const { onMenuSelect, onPhoneChange, listGift, giftFormFieldsChange, selectMemberPoint, onGiftSelect, selectPointCash,
            pointCashFormFieldsChange } = this.props.memberRedemptionActions;
        const { recordLoading, recordPageSize, recordTotal, recordCurrentPage, recordList, recordSearchForm, recordSearchCondition } = this.props.memberRedemption;
        const { listChangeHis, searchFormFieldChangeValue, resetSearchFormFields, handleSearch } = this.props.memberRedemptionActions;
        return (
            <PageHeaderLayout
                title={"会员积分兑换"}
                content={`会员积分兑换。可兑换实物小礼品和积分返现。积分返现可以自由设置兑换比例。`}
            >
                <Card bordered={false}>
                    
                    <div className={styles.content}>
                        <Menu style={{width: 120}} selectedKeys={selectedKeys} onSelect={this.onMenuSelect}>
                            <Menu.Item key={"1"}><Link to={`${path}/1`}>兑换礼品</Link></Menu.Item>
                            <Menu.Item key={"2"}><Link to={`${path}/2`}>积分返现</Link></Menu.Item>
                            <Menu.Item key={"3"}><Link to={`${path}/3`}>礼品设置</Link></Menu.Item>
                            <Menu.Item key={"4"}><Link to={`${path}/4`}>兑换记录</Link></Menu.Item>
                        </Menu>
                        <div style={{marginLeft: 16, flex: 1}}>
                            <Switch>
                                <Route
                                    path={`${path}/1`}
                                    exact={true}
                                    render={() => {
                                        return (
                                            <PointGift
                                                phone={phone}
                                                loading={pointLoading}
                                                pointFormData={pointFormData}
                                                selectMemberPoint={selectMemberPoint}
                                                onPhoneChange={onPhoneChange}
                                                giftList={giftList}
                                                pointGiftFormData={pointGiftFormData}
                                                giftLoading={giftLoading}
                                                redemptionGift={this.redemptionGift}
                                                redemptionLoading={redemptionLoading}
                                                onGiftSelect={onGiftSelect}
                                            />
                                        )
                                    }}
                                />
                                <Route
                                    path={`${path}/2`}
                                    exact={true}
                                    render={() => {
                                        return (
                                            <PointCash
                                                phone={phone}
                                                loading={pointLoading}
                                                pointFormData={pointFormData}
                                                selectMemberPoint={selectMemberPoint}
                                                onPhoneChange={onPhoneChange}
                                                pointCashFormData={pointCashFormData}
                                                redemptionCash={this.redemptionCash}
                                                redemptionLoading={redemptionLoading}
                                                selectPointCashLoading={selectPointCashLoading}
                                                selectPointCash={selectPointCash}
                                                pointCashFormFieldsChange={pointCashFormFieldsChange}
                                            />  
                                        )
                                    }}
                                />
                                <Route
                                    path={`${path}/3`}
                                    exact={true}
                                    render={() => {
                                        return (
                                            <Gift loading={giftLoading}
                                                giftList={giftList}
                                                pageSize={pageSize}
                                                total={total}
                                                currentPage={currentPage}
                                                listGift={listGift}
                                                handleModalVisible={this.handleGiftModalVisible}
                                                selectGiftById={this.selectGiftById}
                                                refresh={this.refresh}
                                                deleteGiftById={this.deleteGiftById}
                                            />
                                        )
                                    }}
                                />
                                <Route
                                    path={`${path}/4`}
                                    exact={true}
                                    render={() => {
                                        return (
                                            <RedemptionList
                                                loading={recordLoading}
                                                recordList={recordList}
                                                listRecord={listChangeHis}
                                                searchFormData={recordSearchForm}
                                                searchCondition={recordSearchCondition}
                                                pageSize={recordPageSize}
                                                total={recordTotal}
                                                currentPage={recordCurrentPage}
                                                handleSearch={handleSearch}
                                                searchFormFieldChangeValue={searchFormFieldChangeValue}
                                                resetSearchFormFields={resetSearchFormFields}
                                            />
                                        )
                                    }}
                                />
                            </Switch>
                        </div>
                    </div>
                </Card>
                <AddGiftModal
                    visible={giftModalVisible}
                    {...giftFormData}
                    confirmLoading={saveGiftLoading}
                    handleModalVisible={this.handleGiftModalVisible}
                    fieldChangeValue={giftFormFieldsChange}
                    handleSubmit={this.handleSubmit}
                    detailGiftLoading={detailGiftLoading}
                />
            </PageHeaderLayout>
        )
    }

}

export default withRouter(connect((state) => {
    return {
        memberRedemption: state.memberRedemption,
    }
}, (dispatch) => {
    return {
        memberRedemptionActions: bindActionCreators(memberRedemptionActions, dispatch),
    }
})(MemberRedemptionPage));