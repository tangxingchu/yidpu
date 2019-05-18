import React, { Component, Fragment } from 'react';
import { Modal, Steps, Button, message, Alert, DatePicker, Divider, InputNumber, Icon, Tooltip } from 'antd';
import moment from 'moment';
import numeral from 'numeral';

import Result from '../../../components/Result';
import GoodsTable from '../../../components/GoodsSelect/goodsTable';
import styles from './setting.less';

const Step = Steps.Step;

export default class DiscountsSetting extends Component {

    constructor(props) {
        super(props)
    }

    next() {
        if (this.props.goodsCheckedKeys.length === 0) {
            message.info("您至少需要选择一件商品");
        } else {
            this.props.next();
        }
    }

    prev() {
        this.props.prev();
    }

    render() {
        const { modalVisible, handleModalVisible, onTableChange, goodsCheckedKeys, goodsCheckedRows, goodsList, goodsDiscountList,
            current, saveGoodsDiscountLoading, saveGoodsDiscount, onEffectiveTimeChange, onExpiredTimeChange, onDiscountChange } = this.props;
        const steps = [{
            key: "1",
            title: '选择商品',
            content: <GoodsTable goodsList={goodsList}
                onTableChange={onTableChange}
                goodsCheckedKeys={goodsCheckedKeys}
                goodsFilterList={goodsDiscountList}
            />,
        }, {
            key: "2",
            title: '设定折扣',
            content: <SetDiscount selectedGoodsData={goodsCheckedRows}
                onEffectiveTimeChange={onEffectiveTimeChange}
                onExpiredTimeChange={onExpiredTimeChange}
                onDiscountChange={onDiscountChange}
            />,
        }, {
            key: "3",
            title: '完成',
            content: <Complete selectedGoodsData={goodsCheckedRows} />,
        }];
        const renderFooter = () => {
            const dynamicBtn = [];
            if (current > 0 && current < steps.length - 1) {
                dynamicBtn.push(<Button key="prev" style={{ marginLeft: 8 }} onClick={() => this.prev()}>上一步</Button>);
            }
            if (current < steps.length - 2) {
                dynamicBtn.push(<Button key="next" type="primary" onClick={() => this.next()}>下一步</Button>);
            }
            if (current === steps.length - 2) {
                dynamicBtn.push(<Button key="comfirm" type="primary" loading={saveGoodsDiscountLoading} onClick={() => saveGoodsDiscount()}>确定</Button>);
            }
            return [
                <Button key="back" onClick={() => handleModalVisible()}>关闭</Button>,
                ...dynamicBtn,
            ];
        }
        const extraTitle = (
            <div>
                配置折扣商品
                <span className={styles.tooltip}>(注意: 不能设置相同的商品)</span>
            </div>
        )
        return (
            <Modal
                title={extraTitle}
                visible={modalVisible}
                width={800}
                onCancel={() => { handleModalVisible() }}
                footer={renderFooter()}
            >
                <Steps current={current}>
                    {steps.map(item => <Step key={item.key} title={item.title} />)}
                </Steps >
                <div className={styles.stepsContent}>{steps[current].content}</div>
            </Modal>
        )
    }

}

class SetDiscount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            effectiveTime: moment(),
            expiredTime: null,
            expiredTimeOpen: false,
        };
    }

    disabledEffectiveTime = (effectiveTime) => {
        const expiredTime = this.state.expiredTime;
        if (!effectiveTime || !expiredTime) {
          return false;
        }
        return effectiveTime.valueOf() > expiredTime.valueOf();
    }

    disabledExpiredTime = (expiredTime) => {
        const effectiveTime = this.state.effectiveTime;
        if (!expiredTime || !effectiveTime) {
          return false;
        }
        return expiredTime.valueOf() <= effectiveTime.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
          [field]: value,
        });
    }
    
    onEffectiveTimeChange = (value, valueStr) => {
        this.props.onEffectiveTimeChange(value, valueStr);
        this.onChange('effectiveTime', value);
    }
    
    onExpiredTimeChange = (value, valueStr) => {
        this.props.onExpiredTimeChange(value, valueStr);
        this.onChange('expiredTime', value);
    }

    handleEffectiveOpenChange = (open) => {
        if (!open) {
          this.setState({ expiredTimeOpen: true });
        }
    }

    handleExpiredOpenChange = (open) => {
        this.setState({ expiredTimeOpen: open });
    }

    render() {
        const { selectedGoodsData } = this.props;
        const { onEffectiveTimeChange, onExpiredTimeChange, onDiscountChange } = this.props;
        const { effectiveTime, expiredTime, expiredTimeOpen } = this.state;
        return (
            <Fragment>
                <div className={styles.stepPrice}>
                    <Alert
                        showIcon
                        message="折扣商品设置好之后无法再修改折扣率,只能删除后重新添加。"
                        style={{ marginTop: 24 }}
                    />
                    <div className={styles.common}>
                        <div style={{ marginRight: 36 }}>生效日期
                            <Tooltip title={"不填表示立即生效"}><Icon type={"question"} /></Tooltip>
                            :<DatePicker value={effectiveTime}
                                disabledDate={this.disabledEffectiveTime}
                                onOpenChange={this.handleEffectiveOpenChange}
                                placeholder="生效日期"
                                onChange={this.onEffectiveTimeChange} 
                                format="YYYY-MM-DD" />
                        </div>
                        <div>失效日期
                            <Tooltip title={"不填表示永久有效"}><Icon type={"question"} /></Tooltip>:
                            <DatePicker placeholder="失效日期"
                                value={expiredTime}
                                disabledDate={this.disabledExpiredTime}
                                onOpenChange={this.handleExpiredOpenChange}
                                onChange={this.onExpiredTimeChange}
                                open={expiredTimeOpen}
                                format="YYYY-MM-DD" />
                        </div>
                    </div>
                </div>
                <Divider />
                <div className={styles.goodsItems}>
                    {
                        selectedGoodsData.map((goods, index) => {
                            return (
                                <div className={styles.goodsItem} key={goods.id}>
                                    {index + 1}、商品名称:<span className={styles.oldPrice}>{goods.name}</span>
                                    (原价:<span className={styles.oldPrice}>￥{numeral(goods.price).format('0,0.00')}</span>)
                                    折扣:<InputNumber defaultValue={9} onChange={(value) => onDiscountChange(goods.id, value)} size="large" />折。
                                    折扣后价格:<span className={styles.newPrice}>￥{numeral(goods.newPrice).format('0,0.00')}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </Fragment>
        );
    }

}

class Complete extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { selectedGoodsData } = this.props;
        const information = (
            <div className={styles.goods_container}>
                {
                    selectedGoodsData.map(goods => {
                        return (
                            <div key={goods.id} className={styles.goods}>
                                <div className={styles.goods_name}>{goods.name}</div>
                                <div className={styles.goods_price}>原价:￥{numeral(goods.price).format('0,0.00')}</div>
                                <div>折扣后价格:<span className={styles.goods_newprice}>￥{numeral(goods.newPrice).format('0,0.00')}</span></div>
                            </div>
                        )
                    })
                }
            </div>
        );
        return (
            <Result
                type="success"
                title="设置成功"
                description={"如果商品同时设置了特价与折扣,那么系统会已优惠后最低价格为准."}
                extra={information}
                className={styles.result}
            />
        )
    }

}