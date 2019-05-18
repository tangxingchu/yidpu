import React, { Fragment, Component } from 'react';
import { Card, Tooltip, Icon, Button, Tag, List, Spin, Popconfirm } from 'antd';
import numeral from 'numeral';

import styles from './index.less';

export default class Discount extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { goodsDiscountList, configList, updateConfig, saveloading, goodsDiscountLoading, addGoodsDiscount, deleteGoodsDiscount } = this.props;
        const extra = () => {
            const discountConfig = configList.find(item => item.configCode === "enabled-goods-discount");
            if (discountConfig && discountConfig.configValue == "1") {
                return (
                    <Button loading={saveloading} onClick={() => { updateConfig("enabled-goods-discount", "0") }}>禁用</Button>
                )
            } else {
                return (
                    <Button type="primary" loading={saveloading} onClick={() => { updateConfig("enabled-goods-discount", "1") }}>启用</Button>
                )
            }
        }

        const renderTitle = () => {
            const discountConfig = configList.find(item => item.configCode === "enabled-goods-discount");
            return (
                <div>商品折扣
                    {discountConfig && discountConfig.configValue == "1" ? <Tag color="green">已启用</Tag> : <Tag>未启用</Tag>}
                </div>
            )
        };
        const renderStyle = (goodsDiscount) => {
            if(goodsDiscount.goodsName) {
                if(goodsDiscount.expiredStatus == "1") {
                    return `${styles.discountItem} ${styles.itemExpired}`;
                } else if(goodsDiscount.goodsStatus == "0" && goodsDiscount.expiredStatus == "1") {
                    return `${styles.discountItem} ${styles.itemExpired} ${styles.discountItemSaleOff}`;
                } else if(goodsDiscount.goodsStatus == "0") {
                    return `${styles.discountItem} ${styles.discountItemSaleOff}`;
                } else {
                    return `${styles.discountItem}`;
                }
            } else {
                return `${styles.discountItem} ${styles.discountItemDsiabled}`;
            }
        }
        const renderTooltip = (effectiveTime, expiredTime) => {
            if(effectiveTime && expiredTime) {
                return `有效期限:${effectiveTime}~${expiredTime}`;
            } else if (!effectiveTime && expiredTime) {
                return `有效期限:现在~${expiredTime}`;
            } else if (!expiredTime) {
                return `有效期限:永久有效`;
            }
        }
        return (
            <Spin spinning={goodsDiscountLoading}>
                <Card title={renderTitle()}
                    extra={extra()}
                >
                    <Button type={"dashed"} style={{ width: "100%" }} icon={"plus"} onClick={() => { addGoodsDiscount() }}>添加</Button>
                    <List
                        itemLayout="horizontal"
                        dataSource={goodsDiscountList}
                        renderItem={goodsDiscount => (
                            <List.Item>
                                <Tooltip title={renderTooltip(goodsDiscount.effectiveTime, goodsDiscount.expiredTime)} key={goodsDiscount.id}>
                                    <div className={renderStyle(goodsDiscount)}>
                                        <div>
                                            <Popconfirm title="确定移除该折扣商品吗？" okText="确定" cancelText="取消" onConfirm={() => { deleteGoodsDiscount(goodsDiscount.id) }}>
                                                <Icon type="close" className={styles.deleteDaysIcon} />
                                            </Popconfirm>
                                        </div>
                                        商品名称:<div className={styles.goodsName}>{goodsDiscount.goodsName}，</div>
                                        原价:<div className={styles.oldPrice}>￥{numeral(goodsDiscount.oldPrice).format('0,0.00')}元，</div>
                                        折扣:<div>{goodsDiscount.discountValue}折，</div>
                                        现价:<div className={styles.price}>￥{numeral(goodsDiscount.price).format('0,0.00')}元。</div>
                                        {
                                            goodsDiscount.goodsName && goodsDiscount.expiredStatus == "1" ?
                                                <div className={styles.expired}>(该商品折扣已失效)</div> : null
                                        }
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