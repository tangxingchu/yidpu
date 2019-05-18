import React, { createElement, PureComponent } from 'react';

import { Menu, Icon, Tag, Dropdown, Avatar, Popconfirm,} from 'antd';
import Debounce from 'lodash-decorators/debounce';
import moment from 'moment';

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
                <Menu.Item key="logout">
                    <Icon type="logout" />退出登录
                </Menu.Item>
            </Menu>
        );
        const onNoticeClear = () => {

        }
        
        const noticeData = this.getNoticeData();
        const messageData = this.getMessageData();


        return (
            <div className={styles.header}>
                <Icon
                    className={styles.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <div className={styles.right}>
                    {/* <NoticeIcon
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
                    </NoticeIcon> */}
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