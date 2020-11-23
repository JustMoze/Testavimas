import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import MoreTwoToneIcon from '@material-ui/icons/MoreTwoTone';
import './style.scss';
import PosterInfo from './posterInfo';
import Line from '../line';
import VideoPlayer from '../videoPlayer';
import Title from './containerTitle';
import DetailsModal from './detailsModal';
const ImageContainer = styled.div`
	position: absolute;
	top: -207px;
	height: 60%;
	right: 30px;
	width: 80%;
	img {
		width: 100%;
		height: 100%;
		background-size: cover;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
		border: 1px solid white;
	}

	@media (max-width: 1000px) {
		position: relative;
		margin-left: 20px;
		height: 300px;
		top: 0;
		right: 0;
		float: right;
		margin-top: 10px;
	}
	@media (max-width: 950px) {
		width: 95%;
		margin-right: 2.5% !important;
		height: 300px;
		margin-top: 10px;
	}
`;
const UnderImageSection = styled.div`
	position: relative;
	border-bottom: 1px solid #f7f7f7;
`;
const UnderLineText = styled.div`
	font-size: 1.25rem;
	color: #f7f7f7;
	p {
		color: #f7f7f7;
		font-size: 1rem;
		text-align: justify;
		text-justify: inter-word;
	}
`;
const DescriptionSection = styled.div`
	color: #595959;
	position: relative;
	text-align: justify;
	padding-right: 30px;
	div {
		text-align: end;
	}
	p {
		font-size: 1.25rem;
		text-align: justify;
		text-justify: inter-word;
	}
	svg {
		width: 40px !important;
		height: 40px !important;
		cursor: pointer;
	}
	svg:hover {
		color: #e50914;
	}
	@media (max-width: 950px) {
		padding: 10px;
	}
`;
const PlayerContainer = styled.div`
	margin-right: 2%;
	margin-bottom: 5%;
	@media (max-width: 950px) {
		margin: 1%;
	}
`;

export default function DetailedInfo(props) {
	const [ openModal, setOpenModal ] = useState(false);

	function handleModalOpen() {
		setOpenModal(true);
	}
	function handleModalClose() {
		setOpenModal(false);
	}
	let { image, actors, description, director, year, boxOffice, underLineName, url } = props;
	let detailsArr = [
		{
			name: 'Director:',
			result: director
		},
		{ name: 'Year:', result: year },
		{ name: 'Box office:', result: boxOffice }
	];

	let stringOfActors = '';
	actors.forEach((actor) => {
		stringOfActors += `${actor.fullName}, `;
	});
	stringOfActors = stringOfActors.slice(0, stringOfActors.length - 2);

	return (
		<Grid container spacing={3} className="secondRow">
			{openModal && (
				<DetailsModal open={openModal} handleClose={handleModalClose} description={description} image={image} />
			)}
			<Grid item xs={12} sm={4} md={4} lg={4} xl={4} className="firstCol">
				<ImageContainer>
					<img src={image} alt="Postal" />
					<UnderImageSection>
						{detailsArr.map((el) => <PosterInfo name={el.name} result={el.result} key={el.name} />)}
						<Line color="#ffffff" />
						<UnderLineText>
							{underLineName}
							<p>{stringOfActors}</p>
						</UnderLineText>
					</UnderImageSection>
				</ImageContainer>
			</Grid>
			<Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
				<Title title="Description" />
				<DescriptionSection>
					<p>{`${description.slice(0, 150)}...`}</p>
					<div>
						<MoreTwoToneIcon onClick={handleModalOpen} />
					</div>
				</DescriptionSection>
				<Title title="Trailer" />
				<PlayerContainer>
					<VideoPlayer image={image} url={url} />
				</PlayerContainer>
			</Grid>
		</Grid>
	);
}
