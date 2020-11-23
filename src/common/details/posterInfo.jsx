import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import './style.scss';

const RightSide = styled.div`
	text-align: end;
	padding: 5px 0px;
	font-size: 1.25rem;
`;
const LeftSide = styled.div`
	padding: 5px 0px;
	font-size: 1.25rem;
`;

const PosterInfo = ({ name, result }) => (
	<Grid container spacing={1} className='posterInfo'>
		<Grid item xs>
			<LeftSide>{name}</LeftSide>
		</Grid>
		<Grid item xs>
			<RightSide>{result}</RightSide>
		</Grid>
	</Grid>
);

export default PosterInfo;
