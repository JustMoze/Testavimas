import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import Carousel from 'react-elastic-carousel';
import PropTypes from 'prop-types';
import GliderCard from './gliderCard';
import { getMoviesByGenre, getPopularMovies, getRelatedMovies } from '../../services/movieService';
import './style.scss';

const breakPoints = [
	{ width: 1, itemsToShow: 1 },
	{ width: 550, itemsToShow: 2 },
	{ width: 768, itemsToShow: 3 },
	{ width: 1200, itemsToShow: 4 }
];

export default function Glider(props) {
	let { genre = '', related = false, movieId, onClick } = props;
	let [ gliderMovies, setGliderMovies ] = useState([]);
	let [ moviesLoaded, setMoviesLoaded ] = useState(false);
	useEffect(
		() => {
			async function getGliderMovies() {
				if (genre === 'popular') {
					let { data: movies } = await getPopularMovies();
					setGliderMovies(movies);
				} else if (related) {
					let { data: movies } = await getRelatedMovies(movieId);
					setGliderMovies(movies);
				} else {
					let { data: movies } = await getMoviesByGenre(genre);
					setGliderMovies(movies);
				}
				setMoviesLoaded(true);
			}
			getGliderMovies();
		},
		[ genre, related, movieId ]
	);
	return (
		<div className="carousel">
			{!moviesLoaded ? (
				<Loader type="TailSpin" color="#00BFFF" height={200} width={200} />
			) : (
				<Carousel breakPoints={breakPoints} className="carouselContent">
					{gliderMovies.map((movie, key) => (
						<GliderCard
							onClick={onClick}
							key={key}
							image={movie.coverImage}
							title={movie.title}
							duration={movie.duration}
							id={movie._id}
						/>
					))}
				</Carousel>
			)}
		</div>
	);
}

Glider.propTypes = {
	genre: PropTypes.string
};
