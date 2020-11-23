import React from 'react';
import styled from 'styled-components';

const FiledTitle = styled.div`
	font-family: "Kanit", sans-serif;
	color: #595959;
	font-size: 2rem;
	font-weight: 700;
	margin: 15px 0px;
	@media (max-width: 950px) {
		padding: 0px 10px;
		margin: 0px;
	}
`;
export default function Title(props) {
	let { title, paddingLeft=null, color=null } = props;
	return <FiledTitle style={{paddingLeft: `${paddingLeft}%`, color: color}}>{title}</FiledTitle>;
}
