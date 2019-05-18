import React, { Component, Fragment } from 'react';
import { Card, Button, Tag, Spin, Popconfirm, Icon } from 'antd';
import numeral from 'numeral';

import styles from './index.less';

export default class Coupon extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { goodsCouponList, configList, updateConfig, saveloading, goodsCouponLoading, addGoodsCoupon, deleteGoodsCoupon } = this.props;
        const extra = () => {
            const subtractConfig = configList.find(item => item.configCode === "enabled-goods-coupon");
            if (subtractConfig && subtractConfig.configValue == "1") {
                return (
                    <Button loading={saveloading} onClick={() => { updateConfig("enabled-goods-coupon", "0") }}>禁用</Button>
                )
            } else {
                return (
                    <Button type="primary" loading={saveloading} onClick={() => { updateConfig("enabled-goods-coupon", "1") }}>启用</Button>
                )
            }
        }

        const renderTitle = () => {
            const subtractConfig = configList.find(item => item.configCode === "enabled-goods-coupon");
            return (
                <div>电子优惠券
                    {subtractConfig && subtractConfig.configValue == "1" ? <Tag color="green">已启用</Tag> : <Tag>未启用</Tag>}
                </div>
            )
        };
        return (
            <Spin spinning={goodsCouponLoading}>
                <Card title={renderTitle()}
                    extra={extra()}
                >
                    <Button type={"dashed"} style={{ width: "100%" }} icon={"plus"} onClick={() => { addGoodsCoupon() }}>添加</Button>
                    {
                        goodsCouponList.map(goodsCoupon => {
                            return (
                                <div key={goodsCoupon.id} className={styles.couponItem}>
                                    <div>
                                        <Popconfirm title="确定删除该电子优惠券吗？" okText="确定" cancelText="取消" onConfirm={() => { deleteGoodsCoupon(goodsCoupon.id) }}>
                                            <Icon type="close" className={styles.deleteDaysIcon} />
                                        </Popconfirm>
                                    </div>
                                    <div className={styles.wrapper}>
                                        <div className={styles.content}>
                                            <div className={styles.title}>
                                                电子优惠券{goodsCoupon.expiredStatus == "1" ? <span className={styles.expired}>(已失效)</span> : null}
                                            </div>
                                            <div className={styles.time}>
                                                有效期至: {goodsCoupon.expiredTime == null ? "永久有效" : goodsCoupon.expiredTime}
                                            </div>
                                        </div>
                                        <div className={styles.split_line}></div>
                                        <div className={styles.tip}>
                                            <div className={styles.money}>
                                                ￥{numeral(goodsCoupon.amount).format('0,0.00')}
                                            </div>
                                            <div className={styles.pay_line}>
                                                满{numeral(goodsCoupon.consumePrice).format('0,0.00')}元减
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.couponCount}>总共:{goodsCoupon.count}张。 </div>
                                </div>
                            )
                        })
                    }
                </Card>
            </Spin>
        )
    }

}