import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Cardimage = styled.img`
	object-fit: cover;
	width: 100%;
	height: 100%;
	object-fit: cover;
	cursor: pointer;
	z-index: -1;
`;
const Gradient = styled.div`
	display: none;
	position: absolute;
	bottom: 0px;
	right: 0px;
	height: 350px;
	width: 100%;
	background: linear-gradient(to bottom, transparent 10%, black 80%);
`;

const Card = styled.div`
	position: relative;
	transition: transform 0.5s;
	transform: scale(0.9);

	i {
		cursor: pointer;
		-webkit-text-stroke-width: 2px;
		-webkit-text-stroke-color: #e50914;
	}

	:hover {
		transform: scale(1);
		background: linear-gradient(to bottom, transparent 0%, black 150%);
		opacity: 0.9;
		cursor: pointer;
	}
	:hover ${Gradient} {
		display: block;
	}
	:hover i {
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: #ffffff;
	}
	:hover h5 {
		color: #ffffff;
		font-size: 0.85rem;
	}
	:hover h2 {
		visibility: visible;
	}
	:hover h5 {
		visibility: visible;
	}
`;
const CardInfo = styled.div`
	margin-left: 2%;
	position: absolute;
	padding-left: 15px;
	bottom: 5px;
	z-index: 1;
	display: -webkit-box;
	padding: 5px;
	width: 80%;

	h2 {
		visibility: hidden;
		font-family: serif;
		color: #e50914;
		border-radius: 15px;
		-webkit-text-stroke-width: 0px;
		font-size: 1.5rem;
		width: 280px;
		line-height: 1.25em;
		height: 1em;
		margin-top: 2%;
	}
`;
const AddSection = styled.div`
	cursor: pointer;
	position: absolute;
	bottom: 15px;
	right: 15px;
	z-index: 1;

	i {
		cursor: pointer;
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: #ffffff;
	}
`;
const SecondaryDetails = styled.div`
	margin-top: 10%;
	width: 100%;
	text-align: center;
	h5 {
		visibility: hidden;
		color: $ffffff;
		font-size: 1rem;
		margin-bottom: 10px;
	}
`;
function GliderCard(props) {
	let { duration, id, image, title, onClick } = props;
	function handlePlayClick(id) {
		props.history.push(`/movie/${id}`);
	}
	return (
		<Fragment>
			<Card>
				<Cardimage src={image} />
				<CardInfo>
					<div>
						<div onClick={() => handlePlayClick(id)} className="play">
							<i className="far fa-play-circle fa-3x" />
						</div>
						<h2>{title}</h2>
						<SecondaryDetails>
							<h5>{duration}</h5>
						</SecondaryDetails>
					</div>
				</CardInfo>
				<AddSection onClick={() => onClick(id)}>
					<i className="fas fa-plus-circle fa-2x" />
				</AddSection>
				<Gradient />
			</Card>
		</Fragment>
	);
}

GliderCard.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	duration: PropTypes.string,
	id: PropTypes.string
};

export default withRouter(GliderCard);
