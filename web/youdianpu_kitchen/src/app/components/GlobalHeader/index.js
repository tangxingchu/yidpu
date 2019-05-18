import React, { PureComponent } from 'react';

import { Menu, Icon, Dropdown, Avatar, Button, InputNumber, Switch, Tooltip } from 'antd';

import { getSub } from '../../utils/authority';
import styles from './index.less';

export default class GlobalHeader extends PureComponent {

    constructor(props) {
        super(props);
    }   

    render() {
        const { onMenuClick, onRefresh, refreshLoading } = this.props;
        const menu = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
                <Menu.Item key="logout">
                    <Icon type="logout" />退出登录
                </Menu.Item>
            </Menu>
        );
        return (
            <div className={styles.header}>
                {/* <div className={styles.left}>
                    <Tooltip placement="bottomRight" title={"如果中途出现网络故障,消息未能成功接收,请手动刷新一次。"}>
                        <Button icon={"reload"} loading={refreshLoading} type={"primary"} onClick={() => {onRefresh()}}>刷新</Button>
                    </Tooltip>
                    是否启用自动刷新<Switch></Switch>刷新间隔<InputNumber defaultValue={5} min={5} max={60} style={{width: 60}}/>秒
                </div> */}
                <div className={styles.left}>
                    <Button icon={"swap"} loading={refreshLoading} type={"primary"} onClick={() => {onRefresh()}}>切换菜品分类视图</Button>
                </div>
                <div className={styles.right}>
                    <Dropdown overlay={menu}>
                        <span className={`${styles.action} ${styles.account}`}>
                            <Avatar size="small" className={styles.avatar} icon="user" />
                            <span className={styles.name}>{getSub()}</span>
                        </span>
                    </Dropdown>
                </div>
            </div>
        );
    }

}