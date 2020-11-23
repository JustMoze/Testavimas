import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import Rating from './starRating';

const RatingSection = styled.div`
	display: flex;
	p {
		color: #ffffff;
		line-height: 35px;
		text-align: start;
		font-size: 1.25rem;
		margin-bottom: 0px;
		font-style: italic;
	}
`;
const Duration = styled.div`
	-webkit-text-stroke-width: 1px;
	-webkit-text-stroke-color: #0e0e0e;
	font-style: normal;
	padding-left: 3%;
	width: 50%;
	font-weight: 600;
`;
const GenreList = styled.ul`
	color: #ffffff;
	padding-top: 10px;
	list-style-type: none;
	display: contents;
	li {
		display: inline-block;
		margin: 15px 15px 0px 0px;
		padding: 2px 10px;
		border: 1px solid #ffffff;
		border-radius: 15px;
		cursor: pointer;
		width: 90px;
		text-align: center;
	}
	li:hover {
		background-color: #e50914;
		color: #0e0e0e;
	}
`;

function Cover({ image, title, genreList, rating }) {
	const CoverSection = styled.section`
		margin-top: 80px;
		position: relative;
		height: 500px;
		background-image: linear-gradient(to bottom, transparent 0%, black 80%), url('${image}');
		background-size: cover;

		@media (max-width: 700px) {
			background-image: linear-gradient(to bottom, transparent 0%, black 40%), url('${image}');
			background-size: contain;
		}
	`;
	function configureRating(rating){
		return rating / 2;
	}
	return (
		<CoverSection>
			<Grid container spacing={3} className="coverRow">
				<Grid item xs={false} sm={4} md={4} lg={4} xl={4} />
				<Grid item xs={12} sm={8} md={8} lg={8} xl={8} className="detailsClumn">
					<h1>{title}</h1>
					<RatingSection>
						<Grid container spacing={3} style={{ margin: '0px !important' }}>
							<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
								<Rating rating={configureRating(rating)} />
							</Grid>
							<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
								<p>(Movie rating: {rating})</p>
							</Grid>
						</Grid>
					</RatingSection>
					<h5>
						Duration <Duration>2h 15min</Duration>{' '}
					</h5>
					<GenreList>{genreList.map((genre, index) => <li key={index}>{genre.genreType}</li>)}</GenreList>
				</Grid>
			</Grid>
		</CoverSection>
	);
}
export default Cover;
