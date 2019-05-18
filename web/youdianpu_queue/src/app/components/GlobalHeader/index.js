import React, { PureComponent } from 'react';

import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Popover, Button } from 'antd';

import dotGreen from '../../common/dot-green.png';
import dotRed from '../../common/dot-red.png';
import { getSub } from '../../utils/authority';
import styles from './index.less';

export default class GlobalHeader extends PureComponent {

    constructor(props) {
        super(props);
    }

    

    render() {
        const { onMenuClick, socketConnectStatus, updateOperStatusLoading } = this.props;
        const menu = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
                <Menu.Item key="logout">
                    <Icon type="logout" />退出登录
                </Menu.Item>
            </Menu>
        );
        const disconnectContent = () => (
            <div style={{color: '#87d068'}}>
                <p>已连接店内点餐服务</p>
            </div>
        )

        const reconnectContent = () => (
            <div style={{color: '#ff4242'}}>
                <p>已断开店内点餐服务</p>
            </div>
        )
        return (
            <div className={styles.header}>
                <div className={styles.right}>
                    {
                        socketConnectStatus ? 
                        <Popover content={disconnectContent(socketConnectStatus)} title="连接状态" trigger="hover">
                            <span><img src={dotGreen}/></span>
                        </Popover>
                        : <Popover content={reconnectContent(socketConnectStatus)} title="连接状态" trigger="hover">
                            <span className={styles.connectStatus}><img src={dotRed}/></span>
                        </Popover>
                    }
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