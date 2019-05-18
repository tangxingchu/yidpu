import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export default ({ className, links, copyright, goHome }) => {
	const clsString = classNames(styles.globalFooter, className);
	return (
		<div className={clsString}>
			{links && (
				<div className={styles.links}>
					{links.map(link => (
						<a key={link.key} target={link.blankTarget ? '_blank' : '_self'} href={link.href}>
							{link.title}
						</a>
					))}
				</div>
			)}
			{copyright && <div className={styles.copyright}><a href="javascript:void(0)" onClick={() => {goHome()}}>{copyright}</a></div>}
		</div>
	);
};
