import React, { Component, Fragment } from 'react';
import { Card, Modal, Radio, Icon, message } from 'antd';
import numeral from 'numeral';

import styles from './extraModal.less';

const RadioGroup = Radio.Group;

export default class ExtraModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            goodsExtraCodes: {},
        };
    }

    onHandler = () => {
        const { currentGoodsId, saveShoppingCard, goodsExtraMap } = this.props;
        const { goodsExtraCodes } = this.state;
        const extraList = goodsExtraMap[currentGoodsId] || [];
        const extraCodes = goodsExtraCodes[currentGoodsId];
        for (let i = 0; i < extraList.length; i++) {
            if(!extraCodes || !extraCodes[extraList[i].extraCode]) {
                message.info(`请选择附属属性[${extraList[i].extraName}]的具体项`)
                return;
            }
        }
        saveShoppingCard(currentGoodsId, extraCodes);
        this.props.handleModalVisible();
    }

    onRadioChange = (e, extraCode) => {
        const value = e.target.value;
        const { currentGoodsId } = this.props;
        const extraCodes = this.state.goodsExtraCodes[currentGoodsId] || {};
        extraCodes[extraCode] = value;
        const goodsExtraCodes = {...this.state.goodsExtraCodes, [currentGoodsId]: extraCodes};
        this.setState({goodsExtraCodes});
    }

    handleModalVisible = () => {
        this.props.handleModalVisible();
    }

    render() {
        const { modalVisible, goodsExtraMap, currentGoodsId, handleModalVisible } = this.props;
        const extraList = goodsExtraMap[currentGoodsId] || [];
        const extraCodes = this.state.goodsExtraCodes[currentGoodsId] || {};

        const renderPrice = (price) => {
            if (price > 0) {
                return <span>[￥: <span style={{ color: '#ff4d4f' }}>+{numeral(price).format('0,0.00')}</span>]</span>
            } else if (price < 0) {
                return <span>[￥: <span style={{ color: 'green' }}>-{numeral(price).format('0,0.00')}</span>]</span>
            } else {
                return <span>[￥: +{numeral(price).format('0,0.00')}]</span>
            }
        }

        return (
            <Modal
                visible={modalVisible}
                title={"勾选附属属性"}
                mask={false}
                onOk={this.onHandler}
                onCancel={() => this.handleModalVisible()}
            >
                <div className={styles.container}>
                    {
                        extraList.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <Card title={item.extraName}>
                                        <RadioGroup name={item.extraCode} className={styles.extraRow} value={extraCodes[item.extraCode]}
                                            onChange={(e) => {this.onRadioChange(e, item.extraCode)}}
                                        >
                                            {item.items.map((extraItem, itemIndex) => {
                                                return <div key={extraItem.id}>
                                                    <Radio value={extraItem.itemValue}>{extraItem.itemName}&nbsp;{renderPrice(extraItem.price)}</Radio>
                                                </div>
                                            })}
                                        </RadioGroup>
                                    </Card>
                                </Fragment>
                            )
                        })
                    }
                </div>
            </Modal>
        )
    }

}