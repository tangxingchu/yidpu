import React, { Component, Fragment } from 'react';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';

export default class Goods extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PageHeaderLayout
                title="菜品管理"
                content="菜品管理是对各类菜品的名称、描述、价格已经库存管理。能方便食客在移动设备快速下单。"
            >
                <div>标准列表</div>
            </PageHeaderLayout>
        );
    }

}

