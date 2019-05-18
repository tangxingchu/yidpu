import React, { createElement, PureComponent, Fragment } from 'react';

import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip, Popconfirm, Popover, Button } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import { shell } from "electron";
import moment from 'moment';

import dotGreen from '../../common/dot-green.png';
import dotRed from '../../common/dot-red.png';
import { getSub, getGrade } from '../../utils/authority';
import NoticeIcon from '../NoticeIcon';
import styles from './index.less';
import grade1 from '../../common/grade-1.png';
import grade2 from '../../common/grade-2.png';
import grade3 from '../../common/grade-3.png';
import grade4 from '../../common/grade-4.png';

export default class GlobalHeader extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.triggerResizeEvent.cancel();
    }

    showNoticeDetail = (notice) => {
        shell.openExternal(notice.noticeDetailLink);
    }

    getNoticeData() {
        const { notices = [], } = this.props;
        if (notices.length === 0) {
            return [];
        }
        const newNotices = notices.map(notice => {
            const newNotice = {id: notice.id, title: notice.noticeTitle, description: notice.noticeContent, status: notice.status,
                noticeTime: notice.noticeTime };
            if(notice.noticeDetailLink) {
                newNotice.extra = createElement('a', {href: "javascript: void(0)", onClick: () => {this.showNoticeDetail(notice)}}, "详情")
            }
            if (newNotice.noticeTime) {
                newNotice.datetime = moment(notice.noticeTime).fromNow();
            }
            // transform id to item key
            if (newNotice.id) {
                newNotice.key = newNotice.id;
            }
            newNotice.avatar = "notification";
            if (newNotice.status != null) {
                if(newNotice.status == "0") {
                    newNotice.extra = (
                        <Tag color={'#1890ff'} style={{ marginRight: 0 }}>
                            未读
                        </Tag>
                    );
                }/*  else {
                    newNotice.extra = (
                        <Tag style={{ marginRight: 0 }}>
                            已读
                        </Tag>
                    );
                } */
            }
            return newNotice;
        });
        return newNotices;
    }

    getMessageData() {
        const { messages = [], } = this.props;
        if (messages.length === 0) {
            return [];
        }
        const newMessages = messages.map(message => {
            const newMessage = {id: message.id, title: message.messageTitle, description: message.messageContent, status: message.messageStatus,
                messageTime: message.messageTime };
            if (newMessage.messageTime) {
                newMessage.datetime = moment(message.messageTime).fromNow();
            }
            // transform id to item key
            if (newMessage.id) {
                newMessage.key = newMessage.id;
            }
            newMessage.avatar = "message";
            if (newMessage.status != null) {
                if(newMessage.status == "0") {
                    newMessage.extra = (
                        <Tag color={'#1890ff'} style={{ marginRight: 0 }}>
                            未读
                        </Tag>
                    );
                } else {
                    newMessage.extra = (
                        <Popconfirm title={"确定删除该消息吗?"} okText={"确定"} cancelText={"取消"} onConfirm={() => this.props.deleteMessage(newMessage.id)}>
                            <Icon type="delete" />
                        </Popconfirm>
                    );
                }
            }
            return newMessage;
        });
        return newMessages;
    }

    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
        this.triggerResizeEvent();
    };

    /* eslint-disable*/
    @Debounce(600)
    triggerResizeEvent() {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }

    render() {
        const { collapsed, onMenuClick, notifyCount, notifyMsgLoading, onPopupVisibleChange, socketConnectStatus, 
            disconnectYdipuSocket, reconnectYdipuSocket, updateOperStatusLoading, merchantName } = this.props;
        const menu = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
                <Menu.Item key="user">
                    <Icon type="user" />商家中心
                </Menu.Item>
                <Menu.Item key="setting">
                    <Icon type="setting"/>基础设置
                </Menu.Item>
                <Menu.Item key="myOrder">
                    <Icon type="book"/>我的订单
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="modifyPWD">
                    <Icon type="lock"/>修改密码
                </Menu.Item>
                <Menu.Item key="changeAccount">
                    <Tooltip title="交接班">
                        <Icon type="swap" />切换账号
                    </Tooltip>
                </Menu.Item>
                <Menu.Item key="logout">
                    <Icon type="logout" />退出登录
                </Menu.Item>
            </Menu>
        );
        const onNoticeClear = () => {

        }
        
        const noticeData = this.getNoticeData();
        const messageData = this.getMessageData();

        const disconnectContent = () => (
            <div>
                <p>已连接一点谱餐饮服务,营业中...</p>
                <Button type="danger" loading={updateOperStatusLoading} onClick={()=>{disconnectYdipuSocket()}}>断开连接(歇业)</Button>
            </div>
        )

        const reconnectContent = () => (
            <div>
                <p>已断开一点谱餐饮服务,歇业中...</p>
                <Button type="primary" loading={updateOperStatusLoading} onClick={()=>{reconnectYdipuSocket()}}>重新连接(营业)</Button>
            </div>
        )

        const attention = () => (
            <div style={{width: 600}}>
                <p>1、店内的WIFI点餐服务是由本机启动的，点餐机版与服务员版APP下单都是围绕本机展开业务，所以建议您本机设置一个固定的IP地址，并且在window防火墙开放1688端口。
                    另外请将本电脑休眠时间设置为从不休眠。
                </p>
                <p>2、本机的时间请保证是正确的北京时间</p>
                <p>3、后厨热敏打印机(WIFI接口或网口接口)，每天请提前接通电源优先暂用店内IP地址，避免IP冲突问题。
                    请每天营业前在[系统管理]->[打印机设置]->[后厨用餐单打印设置]测试是否能够打印。后厨打印机提示缺纸后请不要关闭打印机电源，
                    请直接更换打印纸，更换完打印纸之后后续打印任务会自动打印，避免漏单、错单的情况发生。
                </p>
                <p>5、服务员手机APP版或者点餐机版如果提示链接店内WIFI点餐服务失败，请在确认店内WIFI服务已启动的情况下，重新打开服务员版APP或点餐机版。</p>
            </div>
        )

        return (
            <div className={styles.header}>
                <Icon
                    className={styles.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <div className={styles.right}>
                    <Popover content={attention()} title="注意事项" trigger="hover">
                        <span>[注意事项]</span>
                    </Popover>
                    {
                        socketConnectStatus ? 
                        <Popover content={disconnectContent(socketConnectStatus)} title="连接状态" trigger="hover">
                            <span><img src={dotGreen}/></span>
                        </Popover>
                        : <Popover content={reconnectContent(socketConnectStatus)} title="连接状态" trigger="hover">
                            <span className={styles.connectStatus}><img src={dotRed}/></span>
                        </Popover>
                    }                    
                    <Tooltip title="刷新权限">
                        <a href="javascript:void(0)" className={styles.action} onClick={() => {this.props.refreshPrivilege()}}>
                            <Icon type="retweet" />
                        </a>
                    </Tooltip>
                    <NoticeIcon
                        className={styles.action}
                        count={notifyCount}
                        onItemClick={(item, tabProps) => {
                            //console.log(item, tabProps); // eslint-disable-line
                            if(item.avatar == "message" && item.status == "0") {
                                this.props.updateMessageStatus(item.id);
                            } else if(item.avatar == "notification" && item.status == "0") {
                                this.props.updateNoticeStatus(item.id);
                                //弹出提示
                            }
                        }}
                        onClear={onNoticeClear}
                        onPopupVisibleChange={onPopupVisibleChange}
                        loading={notifyMsgLoading}
                        popupAlign={{ offset: [20, -16] }}
                    >
                        <NoticeIcon.Tab
                            list={noticeData}
                            title="通知"
                            emptyText="暂无通知"
                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                        />
                        <NoticeIcon.Tab
                            list={messageData}
                            title="消息"
                            emptyText="暂无消息"
                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                        />
                    </NoticeIcon>
                    <Dropdown overlay={menu}>
                        <span className={`${styles.action} ${styles.account}`}>
                            {
                                getGrade() == 1 ?
                                <Avatar size="small" className={styles.avatar} src={grade1} />
                                :
                                getGrade() == 2 ?
                                <Avatar size="small" className={styles.avatar} src={grade2} />
                                :
                                getGrade() == 3 ?
                                <Avatar size="small" className={styles.avatar} src={grade3} />
                                :
                                <Avatar size="small" className={styles.avatar} src={grade4} />
                            }                            
                            <span className={styles.name}>{getSub().indexOf(':') > -1 ? getSub().split(":")[1] : getSub()}</span>
                        </span>
                    </Dropdown>
                </div>
            </div>
        );
    }

}