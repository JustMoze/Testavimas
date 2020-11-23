import StarRatings from 'react-star-ratings';
import React from 'react';
import './style.scss';

export default function Rating(props) {
	let { rating } = props;
	return <StarRatings rating={rating} starRatedColor="yellow" numberOfStars={5} />;
}
