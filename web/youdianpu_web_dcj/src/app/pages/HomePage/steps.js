import React, { Fragment, Component } from 'react';
import { Steps, Button } from 'antd';

import MerchantInfo from './merchantInfo';
import Result from '../../components/Result';

const Step = Steps.Step;

export default class InitSteps extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { current, formData, fieldChangeValue, merchantLogoOnChange, yyzzOnChange, merchantLogoList, yyzzList, photoList, photoOnChange, handleCommit, saveLoading, currMerchantInfo,
            refresh, logout, useFree, useFreeLoading, auditHisLoading, auditHisList, listAuditHis, getYYZZImageBlob, removeImage,
            defaultImageChange} = this.props;
        const steps = [{
            title: '完善信息',
            content: <MerchantInfo {...formData} fieldChangeValue={fieldChangeValue}
                merchantLogoOnChange={merchantLogoOnChange}
                yyzzOnChange={yyzzOnChange}
                merchantLogoList={merchantLogoList}
                yyzzList={yyzzList}
                photoList={photoList}
                photoOnChange={photoOnChange}
                handleCommit={handleCommit}
                saveLoading={saveLoading}
                auditHisLoading={auditHisLoading}
                auditHisList={auditHisList}
                listAuditHis={listAuditHis}
                getYYZZImageBlob={getYYZZImageBlob}
                currMerchantInfo={currMerchantInfo}
                removeImage={removeImage}
                defaultImageChange={defaultImageChange}
            />,
          }, {
            title: '审核通过',
            content: <CheckPage refresh={refresh} logout={logout}/>,
          }, {
            title: '开始试用',
            content: <Result type="success"
                        style={{marginTop: 24}}
                        title="审核通过"
                        description={"您的店铺资料已审核通过，从现在开始您可以享受35天的免费试用."}
                        actions={<Button type="primary" onClick={() => {useFree()}} loading={useFreeLoading}>开始试用</Button>}/>,
        }];
        return (
            <div style={{padding: 24}}>
                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
            </div>
        )
    }

}

const CheckPage = ({refresh, logout}) => {
    return (
        <Result type="clock"
            style={{marginTop: 24}}
            title="等待审核"
            description={"我们已收到您的提交,将会在一个自然日内审核您提交的内容，审核通过后我们会短信通知您。请您耐心等待..."}
            actions={
                [<Button key="reload" icon="reload" onClick={() => {refresh()}}>获取最新审核进度</Button>,
                <Button key="logout" type="danger" style={{marginLeft: 16}} icon="logout" onClick={() => {logout()}}>我知道了-退出系统</Button>,]
            }/>
    )
}

