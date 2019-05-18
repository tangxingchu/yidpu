import React, { Component, Fragment } from 'react';
import { Radio, DatePicker, Button } from 'antd';
import moment from 'moment';
import numeral from 'numeral';

import styles from './index.less';

export default class CardExtra extends Component {

    constructor(props) {
        super(props);
        
    }

    disabledDate = (current) => {
        return current && current >= moment().startOf('day');
    }

    render() {
        const { dateValue, dateDisabled, reportTypeValue, loading } = this.props;
        const { onDateChange, onReportTypeChange, onRefresh } = this.props;
        return (
            <div className={styles.salesCardExtra}>
                <div className={styles.salesTypeRadio}>
                    <Button loading={loading} onClick={onRefresh}>刷新</Button>
                    <DatePicker.RangePicker
                        disabledDate={this.disabledDate}
                        value={dateValue}
                        format="YYYY-MM-DD"
                        onChange={onDateChange}
                        disabled={dateDisabled}
                        style={{marginRight: 16, marginLeft: 16}}
                    />
                    <Radio.Group value={reportTypeValue} onChange={onReportTypeChange} buttonStyle="solid">
                        <Radio.Button value="1">日报</Radio.Button>
                        <Radio.Button value="2">周报</Radio.Button>
                        <Radio.Button value="3">月报</Radio.Button>
                        <Radio.Button value="4">季报</Radio.Button>
                        <Radio.Button value="5">年报</Radio.Button>
                    </Radio.Group>
                </div>
            </div>
        )
    }

}