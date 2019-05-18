import React, { createElement, Fragment } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import config from './typeConfig';
import styles from './index.less';
import { rootRouter } from '../../common/config'

export default ({ className, linkElement = 'a', type, title, desc, img, actions, currentGrade, grade, ...rest }) => {
  const pageType = type in config ? type : '404';
  const clsString = classNames(styles.exception, className);
  return (
    <div className={clsString} {...rest}>
      <div className={styles.imgBlock}>
        <div
          className={styles.imgEle}
          style={{ backgroundImage: `url(${img || config[pageType].img})` }}
        />
      </div>
      <div className={styles.content}>
        <h1>{title || config[pageType].title}</h1>
        <div className={styles.desc}>
          {desc || config[pageType].desc}          
        </div>
        {
          currentGrade && grade ?
          <div className={styles.grade}>
            您现在等级[<span>{currentGrade}</span>]，该功能需要[<span>{grade}</span>]等级。{createElement(linkElement, {
              to: `${rootRouter}/user/profile`,
              href: `${rootRouter}/user/profile`,
            }, "等级详情")
            }            
          </div>          
          : <div className={styles.grade}>请联系主账号给您授权。</div>
        }        
        <div className={styles.actions}>
          {
            actions ||
            createElement(linkElement, {
              to: '/',
              href: '/',
            }, <Button type="primary">返回首页</Button>)
          }
        </div>
      </div>
    </div>
  );
};
