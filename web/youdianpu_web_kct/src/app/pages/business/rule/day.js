import React, { Component } from 'react';
import { Card, Tooltip, Icon, Button, Tag, Popconfirm, Spin } from 'antd';
import numeral from 'numeral';

import styles from './index.less';

export default class Day extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { addGoodsDay, goodsDayList, configList, updateConfig, saveloading, weeks, goodsDayLoading, deleteGoodsDay } = this.props;
        const renderTooltip = (effectiveTime, expiredTime) => {
            if(effectiveTime && expiredTime) {
                return `有效期限:${effectiveTime}~${expiredTime}`;
            } else if (!effectiveTime && expiredTime) {
                return `有效期限:现在~${expiredTime}`;
            } else if (!expiredTime) {
                return `有效期限:永久有效`;
            }
        }
        const renderStyle = (goodsDay) => {
            if(goodsDay.goodsName) {
                if(goodsDay.expiredStatus == "1") {
                    return `${styles.weekItem} ${styles.itemExpired}`;
                } else if(goodsDay.goodsStatus == "0" && goodsDay.expiredStatus == "1") {
                    return `${styles.weekItem} ${styles.itemExpired} ${styles.weekItemSaleOff}`;
                } else if(goodsDay.goodsStatus == "0") {
                    return `${styles.weekItem} ${styles.weekItemSaleOff}`;
                } else {
                    return `${styles.weekItem}`;
                }
            } else {
                return `${styles.weekItem} ${styles.weekItemDsiabled}`;
            }
        }
        const renderItem = (week) => {
            const data = goodsDayList.find(goodsDay => goodsDay.week === week);
            if (!data) {
                return (
                    <div className={`${styles.weekItem} ${styles.nodata}`}>
                        暂无数据
                    </div>
                )
            }
            return goodsDayList.map(goodsDay => {
                if (goodsDay.week == week) {
                    return (
                        <Tooltip title={renderTooltip(goodsDay.effectiveTime, goodsDay.expiredTime)} key={goodsDay.id}>
                            <div className={renderStyle(goodsDay)}>                            
                                <div>
                                    <Popconfirm title="确定移除该特价商品吗？" okText="确定" cancelText="取消" onConfirm={() => { deleteGoodsDay(goodsDay.id) }}>
                                        <Icon type="close" className={styles.deleteDaysIcon} />
                                    </Popconfirm>
                                </div>
                                商品名称:<div className={styles.goodsName}>{goodsDay.goodsName}，</div>
                                原价:<div className={styles.oldPrice}>￥{numeral(goodsDay.oldPrice).format('0,0.00')}元，</div>
                                特价:<div className={styles.price}>￥{numeral(goodsDay.price).format('0,0.00')}元，</div>
                                (每桌限点{goodsDay.limitNum}{goodsDay.unitName})。
                                {
                                    goodsDay.goodsName && goodsDay.expiredStatus == "1" ? 
                                    <div className={styles.expired}>(该特价商品已失效)</div> : null
                                }
                            </div>
                        </Tooltip>
                    )
                }
            })
        }

        const extra = () => {
            const daysConfig = configList.find(item => item.configCode === "enabled-goods-day");
            if (daysConfig && daysConfig.configValue == "1") {
                return (
                    <Button loading={saveloading} onClick={() => { updateConfig("enabled-goods-day", "0") }}>禁用</Button>
                )
            } else {
                return (
                    <Button type="primary" loading={saveloading} onClick={() => { updateConfig("enabled-goods-day", "1") }}>启用</Button>
                )
            }
        }

        const renderTitle = () => {
            const daysConfig = configList.find(item => item.configCode === "enabled-goods-day");
            return (
                <div>每日特价商品
                    {daysConfig && daysConfig.configValue == "1" ? <Tag color="green">已启用</Tag> : <Tag >未启用</Tag>}
                </div>
            )
        };
        return (
            <Spin spinning={goodsDayLoading}>
                <Card title={renderTitle()}
                    extra={extra()}
                >
                    <div className={styles.days}>
                        <div className={styles.row}>
                            {
                                weeks.map(item => (
                                    <div className={styles.week} key={item.week}>
                                        <div className={styles.weekTitle}>
                                            <div className={styles.left}>{item.name}</div>
                                            <div className={styles.right}>
                                                <Tooltip title={"添加一个每日特价商品"}>
                                                    <Icon type={"plus"} className={styles.addDaysIcon} onClick={() => addGoodsDay(item.week)} />
                                                </Tooltip>
                                            </div>
                                        </div>
                                        {renderItem(item.week)}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </Card>
            </Spin>
        )
    }

}