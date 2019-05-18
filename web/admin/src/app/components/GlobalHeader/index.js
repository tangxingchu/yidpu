import React, { PureComponent } from 'react';

import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip } from 'antd';
import Debounce from 'lodash-decorators/debounce';

import styles from './index.less';

export default class GlobalHeader extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.triggerResizeEvent.cancel();
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
        const { collapsed } = this.props;
        return (
            <div className={styles.header}>
                <Icon
                    className={styles.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <div className={styles.right}>
                    <span className={`${styles.action} ${styles.account}`}>
                        <Avatar size="small" className={styles.avatar} />
                    </span>
                </div>
            </div>
        );
    }

}