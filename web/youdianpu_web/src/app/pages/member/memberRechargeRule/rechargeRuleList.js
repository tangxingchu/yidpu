import React, { Component, Fragment } from 'react';
import { Card, Table, Button, Popconfirm, Divider, List, Spin, Avatar } from 'antd';
import { Link , Redirect } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

import { staticHost } from '../../../common/config';
import styles from './index.less';

export default class RechargeRuleList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { path, loading, rechargeRuleList, logoPath, handleAdd, reload, deleteRechargeRule, handleEdit} = this.props;
        const renderDescription = (item) => {
            return (
                <div key={item.id}>
                    <span style={{marginRight: 4}}>生效日期:{item.effectiveTime}</span>
                    <span>失效日期:{item.expiredTime}</span>
                    <span style={{marginRight: 4}}>
                        {
                            item.expired == "1" ? "(已失效)" :
                            item.effectived == "1"  ? "(生效中)" : "(未生效)"
                        }
                    </span>
                </div>
            )
        }
        return (
            <Spin spinning={loading}>
                <div className={styles.tableList}>
                    <div className={styles.tableListOperator}>
                        <Link to={`${path}/add`} onClick={() => {handleAdd()}}>
                            <Button icon="plus" type="primary">
                                新增充值活动
                            </Button>                            
                        </Link>
                        <Button icon="reload" loading={loading} onClick={() => reload()}>
                            刷新
                        </Button>
                    </div>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            pageSize: 5,
                        }}
                        dataSource={rechargeRuleList}
                        renderItem={item => (
                            <List.Item
                                key={item.id}
                                actions={[
                                    <Link to={`${path}/add`} onClick={() => handleEdit(item.id)}>编辑</Link>,
                                    <Popconfirm title="确定删除该充值活动吗?" onConfirm={() => deleteRechargeRule(item.id)}>
                                        <a>删除</a>
                                    </Popconfirm>
                                ]}
                                className={item.expired == "1" ? styles.expired : null}
                            >
                                <List.Item.Meta
                                    className={item.expired == "1" ? styles.expired : null}
                                    avatar={<Avatar src={`${staticHost}/${logoPath}`} />}
                                    title={`${item.title}-充值满￥${numeral(item.rechargeAmount).format("0,0")} 送￥${numeral(item.givePrice).format("0,0")}`}
                                    description={renderDescription(item)}
                                />
                                {item.description}
                            </List.Item>
                        )}
                    />
                </div>
            </Spin>
        )
    }

}