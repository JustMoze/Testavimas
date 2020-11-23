import React from 'react';
import styled from 'styled-components';

export default function Line(props) {
	let { color } = props;
	const Underline = styled.div`
		width: 100%;
		border-bottom: 2px solid ${color};
	`;
	return <Underline />;
}
