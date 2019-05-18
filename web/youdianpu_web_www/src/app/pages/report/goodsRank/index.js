import React, { Component } from 'react';
import { Card, Spin, List, Radio, Button} from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';

import reportActions from '../../../actions/report';
import todayOverviewActions from '../../../actions/todayOverview';
import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import { getToken } from '../../../utils/authority'
import styles from '../todayOverview/index.less';
import gold from '../todayOverview/gold.png';
import silver from '../todayOverview/silver.png';
import copper from '../todayOverview/copper.png';

class GoodsRunk extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // ipcRenderer.on('loadGoodsDefaultImage-reply',  (event, arg) => {
        //     const {goodsId, base64} = arg;
        //     this.props.todayOverviewActions.dispatch_goodsImage(goodsId, base64);
        // });
        this.init();
    }

    init = (reload) => {
        const { goodsRankType, goodsRankMap } = this.props.report;
        if(!goodsRankMap[goodsRankType] || reload) {
            this.props.reportActions.selectGoodsRank(goodsRankType).then(salesRank => {
                salesRank.forEach(item => {
                    const { goods_id } = item;
                    // ipcRenderer.send('loadGoodsDefaultImage', {goodsId: goods_id, token: getToken()});
                });
            });
        }
    }

    componentWillUnmount() {
        // ipcRenderer.removeAllListeners("loadGoodsDefaultImage-reply");
    }

    onGoodsRankTypeChange = (e) => {
        const { value } = e.target;
        this.props.reportActions.onGoodsRankTypeChange(value);
        const { goodsRankMap } = this.props.report;
        if(!goodsRankMap[value]) {
            this.props.reportActions.selectGoodsRank(value);
        }
    }

    render() {
        const { goodsRankLoading, goodsRankMap, goodsRankType } = this.props.report;
        const { goodsImages } = this.props.todayOverview;
        const renderDescription = (item) => {
            if(item.total_num) {
                return (
                    <span>累计已销售出<span className={styles.salesNum}>{item.total_num}</span>{item.goods_unit_name}，
                        累计销售额：<span className={styles.salesNum}>￥{numeral(item.total_price).format("0,0.00")}</span>
                    </span>
                )
            } else {
                return (
                    <span></span>
                )
            }
        }
        const renderRank = (item) => {
            if(item.rank) {
                if(item.rank == "1") {
                    return <div className={styles.top}><img src={gold}/></div>
                } else if(item.rank == "2") {
                    return <span className={styles.top}><img src={silver}/></span>
                } if(item.rank == "3") {
                    return <span className={styles.top}><img src={copper}/></span>
                } else {
                    return <span className={styles.top_other}>{item.rank}</span>
                }
            } else {
                return '未上榜';
            }
        }
        return (
            <PageHeaderLayout title={"销量排行榜"}
                content="商品销量排行榜可以协助您设定精准的营销策略">
                <Card bordered={false} title={<Button onClick={() => this.init(true)}>刷新</Button>} extra={
                    <Radio.Group value={goodsRankType} onChange={this.onGoodsRankTypeChange} buttonStyle="solid" disabled={goodsRankLoading}>
                        <Radio.Button value="1">按销量数量</Radio.Button>
                        <Radio.Button value="2">按销售额</Radio.Button>
                    </Radio.Group>
                }>
                    <Spin spinning={goodsRankLoading}>
                        <div className={styles.salesRank}>
                            <List
                                itemLayout="horizontal"
                                dataSource={goodsRankMap[goodsRankType]}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<img src={goodsImages[item.goods_id]} style={{width: 64, height: 64, borderRadius: 32}}/>}
                                            title={item.goods_name}
                                            description={renderDescription(item)}
                                        />
                                        <div>{renderRank(item)}</div>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Spin>
                </Card>
            </PageHeaderLayout>
        )
    }

}

export default connect((state) => {
	return {
        report: state.report,
        todayOverview: state.todayOverview,
	}
}, (dispatch) => {
	return {
        reportActions: bindActionCreators(reportActions, dispatch),
        todayOverviewActions: bindActionCreators(todayOverviewActions, dispatch),
	}
})(GoodsRunk);