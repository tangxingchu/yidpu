import React, { Component, } from 'react';
import { Tabs } from 'antd';
import numeral from 'numeral';

import styles from './goodsTab.less';

const TabPane = Tabs.TabPane;

export default class GoodsTab extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { local_goodsCategory, local_goodsList, listExtra } = this.props;

        const renderItem = (goods) => {
            return (
                <div key={goods.id} className={(goods.disabled || goods.inventory === 0) ? styles.goodsDisabled : styles.goods}
                    onClick={() => {if(!goods.disabled && goods.inventory !== 0){listExtra(goods.id)}}}>
                    <div className={styles.goodsDay_wrap}>
                        {goods.dayName ? <div className={styles.goodsDay}>{goods.dayName}</div> : null}
                        {goods.discountName ? <div className={styles.goodsDiscount}>{goods.discountName}</div> : null}
                    </div>
                    <div className={styles.goods_name}>{goods.name}</div>
                    <div className={styles.goods_inventory}>(库存: {goods.inventory})</div>
                    <div className={goods.calPrice ? styles.goods_price_disabled : styles.goods_price}>
                        ￥{numeral(goods.price).format('0,0.00')}
                    </div>
                    {/* 又是特价商品、又有折扣的话以最低价为准 */}
                    {
                        goods.calPrice ? 
                        <div className={styles.new_price}>￥{numeral(goods.calPrice).format('0,0.00')}</div>
                        : null
                    }
                </div>
            )
        }
        return (
            <Tabs
                defaultActiveKey="0"
                tabPosition={'left'}
            >
                {
                    local_goodsCategory.map((category, index) => {
                        return (
                            <TabPane tab={category.category_name} key={index}>
                                <div className={styles.goods_container}>
                                    {
                                        local_goodsList.map(goods => {
                                            if (goods.category === category.id) {
                                                return renderItem(goods);
                                            }
                                        })
                                    }
                                </div>
                            </TabPane>
                        )
                    })
                }
            </Tabs>
        )
    }

}