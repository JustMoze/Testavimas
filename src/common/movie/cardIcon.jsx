import React from 'react';
import './style.scss';

export default function CardIcon(props) {
	const {id, iconName, ...rest} = props;
	return (
		<div id={id} {...rest}>
			<i className={iconName} />
		</div>
	);
}