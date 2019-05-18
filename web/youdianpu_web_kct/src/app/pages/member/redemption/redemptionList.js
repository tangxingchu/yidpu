import React, { Component, Fragment } from 'react';
import { Table, } from 'antd';
import moment from 'moment';

import SearchForm from './searchForm';
import styles from './index.less';

export default class RedemptionListPage extends Component {

    constructor(props) {
        super(props)
        this.columns = [{
            title: '会员姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '手机号码',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '兑换类型',
            dataIndex: 'changeTypeName',
            key: 'changeTypeName',
        }, {
            title: '备注',
            dataIndex: 'changeDesc',
            key: 'changeDesc',
        },];
    }

    componentDidMount() {
        const { recordList, searchFormData, pageSize } = this.props;
        if(recordList.length == 0) {
            const searchParams = this.getSearchParams(searchFormData);
            searchParams.pageSize = pageSize;
            searchParams.pageNum = 1;
            this.props.listRecord(searchParams);
        }
    }

    getSearchParams = (searchData) => {
        const phone = searchData.phone.value;
        const searchParams = {phone};
        return searchParams;
    }

    handleSearch = (values) => {
        const { searchFormData, pageSize } = this.props;
        const searchParams = this.getSearchParams(searchFormData);
        if(!searchParams) return;
        searchParams.pageSize = pageSize;
        searchParams.pageNum = 1;
        this.props.handleSearch(values);
        this.props.listRecord(searchParams);
    }

    getSearchParams2 = (searchData) => {
        const phone = searchData.phone;
        const searchParams = {phone};
        return searchParams;
    }
    
    onPageChange = (page, pageSize) => {
        const { searchCondition } = this.props;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = page;
        this.props.listRecord(searchParams);
    }

    onShowSizeChange = (current, pageSize) => {
        const { searchCondition } = this.props;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = current;
        this.props.listRecord(searchParams);
    }

    render() {
        const { loading, recordList, searchFormData, pageSize, total, currentPage } = this.props;
        const { searchFormFieldChangeValue, resetSearchFormFields } = this.props;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize,
            total,
            current: currentPage,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
        };
        return (
            <div className={styles.tableList}>
                <div className={styles.tableListOperator}>
                    <SearchForm {...searchFormData}
                        fieldChangeValue={searchFormFieldChangeValue}
                        resetFields={resetSearchFormFields}
                        handleSearch={this.handleSearch}
                        loading={loading}
                    />
                </div>
                <Table rowKey={record => record.id}
                    columns={this.columns}
                    loading={loading}
                    dataSource={recordList}
                    pagination={paginationProps}
                />
            </div>
        )
    }

}