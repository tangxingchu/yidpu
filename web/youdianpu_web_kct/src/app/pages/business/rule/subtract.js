import React, { Component, Fragment } from 'react';
import { Card, Tooltip, Button, Tag, Spin, List, Icon, Popconfirm, Checkbox, Alert } from 'antd';
import numeral from 'numeral';

import { constraintType, subtractType, renderConstraint, renderSubtract } from './dataUtils';
import styles from './index.less';

export default class Subtract extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        const { addGoodsSubtract, configList, updateConfig, saveloading, goodsSubtractLoading, 
            deleteGoodsSubtract, goodsSubtractList, enabledGoodsSubtract } = this.props;
        const extra = () => {
            const couponConfig = configList.find(item => item.configCode === "enabled-goods-subtract");
            if (couponConfig && couponConfig.configValue == "1") {
                return (
                    <Button loading={saveloading} onClick={() => { updateConfig("enabled-goods-subtract", "0") }}>禁用</Button>
                )
            } else {
                return (
                    <Button type="primary" loading={saveloading} onClick={() => { updateConfig("enabled-goods-subtract", "1") }}>启用</Button>
                )
            }
        }

        const renderTitle = () => {
            const couponConfig = configList.find(item => item.configCode === "enabled-goods-subtract");
            return (
                <div>减免、折扣、赠现金优惠券
                    {couponConfig && couponConfig.configValue == "1" ? <Tag color="green">已启用</Tag> : <Tag>未启用</Tag>}
                </div>
            )
        };
        const renderTooltip = (effectiveTime, expiredTime, description) => {
            if(effectiveTime && expiredTime) {
                return `有效期限:${effectiveTime}~${expiredTime}${description ? '。备注:'+description : ''}`;
            } else if (!effectiveTime && expiredTime) {
                return `有效期限:现在~${expiredTime}${description ? '。备注:'+description : ''}`;
            } else if (!expiredTime) {
                return `有效期限:永久有效${description ? '。备注:'+description : ''}`;
            }
        }
        const renderDay = (goodsSubtract) => {
            const { effectiveTime, expiredTime } = goodsSubtract;
            if(effectiveTime && expiredTime) {
                return `${effectiveTime}~${expiredTime}的`;
            } else if (!effectiveTime && expiredTime) {
                return `现在~${expiredTime}的`;
            } else if (!expiredTime) {
                return `每天的`;
            }
        }

        const renderItem = (goodsSubtract) => {
            return (
                <Fragment>
                    <Checkbox checked={goodsSubtract.enabled=="1"} onChange={(e) => {enabledGoodsSubtract(e, goodsSubtract.id)}}/>约束条件:{renderConstraint(goodsSubtract.constraintType)}
                    {
                        goodsSubtract.constraintType == 1 ? <div className={styles.goodsName}>￥{numeral(goodsSubtract.consumePrice).format('0,0.00')}</div> 
                        : <div className={styles.goodsName}>{renderDay(goodsSubtract)}{goodsSubtract.constraintTimeStart}~{goodsSubtract.constraintTimeEnd}</div>
                    },
                    {renderSubtract(goodsSubtract.type)}:
                    {
                        goodsSubtract.type == 1 ?  <div className={styles.price}>￥{numeral(goodsSubtract.amount1).format('0,0.00')}</div>
                        : goodsSubtract.type == 2 ? <div className={styles.price}>{goodsSubtract.discount}折</div>
                        : <div className={styles.price}>￥{numeral(goodsSubtract.amount2).format('0,0.00')}</div>
                    }
                </Fragment>
            )
        }
        return (
            <Spin spinning={goodsSubtractLoading}>
                <Card title={renderTitle()}
                    extra={extra()}
                >
                    <Alert message="减免、折扣规则在生效时间~失效时间段只能存在其中的一种规则。现金券消费在收银的时候由您自行设定是否可同时享受现金券与(减免、折扣)。" showIcon type="info"/>
                    <Button type={"dashed"} style={{ width: "100%", marginTop: 16 }} icon={"plus"} onClick={() => { addGoodsSubtract() }}>添加</Button>
                    <List
                        itemLayout="horizontal"
                        dataSource={goodsSubtractList}
                        renderItem={goodsSubtract => (
                            <List.Item>
                                <Tooltip title={renderTooltip(goodsSubtract.effectiveTime, goodsSubtract.expiredTime, goodsSubtract.description)} key={goodsSubtract.id}>
                                    <div className={goodsSubtract.expiredStatus == "1" ? `${styles.discountItem} ${styles.itemExpired}`
                                        : styles.discountItem}>
                                        <div>
                                            <Popconfirm title="确定删除该优惠吗？" okText="确定" cancelText="取消" onConfirm={() => { deleteGoodsSubtract(goodsSubtract.id) }}>
                                                <Icon type="close" className={styles.deleteDaysIcon} />
                                            </Popconfirm>
                                        </div>
                                        {renderItem(goodsSubtract)}
                                    </div>
                                </Tooltip>
                            </List.Item>
                        )}
                    />
                </Card>
            </Spin>
        )
    }

}