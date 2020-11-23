import React, { Fragment, useState, useEffect, useContext } from 'react';
import Loader from 'react-loader-spinner';
import Grid from '@material-ui/core/Grid';
import Navbar from '../../navbar/navbar';
import Search from '../../search/search';
import Card from '../../../common/movie/card';
import Empty from '../../../common/emptyField/empty';
import { categoryArr } from '../../../utils/data';
import GliderPage from '../../../common/glider/gliderPage';
import { getAllMovies } from '../../../services/movieService';
import {isNewUser} from '../../../services/authService';
import { ToastContainer, toast } from 'react-toastify';
import './style.scss';
import UserContext from '../../../userContext';
import { saveUsersFavMovie } from '../../../services/commentService';

export default function Browse(props) {
	const appUser = useContext(UserContext);
	const [ showEmpty, setShowEmpty ] = useState(false);
	const [ searchQuery, setSearchQuery ] = useState('');
	const [ movies, setMovies ] = useState([]);
	const [ moviesLoaded, setMoviesLoaded ] = useState(false);
	const [filteredMovies, setFilteredMovies] = useState([]);
	useEffect(
		() => {
			async function saveAllMoviesLocalStorage() {
				if (!JSON.parse(localStorage.getItem('movies'))) {
					let { data: allMovies } = await getAllMovies();
					localStorage.setItem('movies', JSON.stringify(allMovies));
					setMovies(allMovies);
				} else {
					let allMovies = JSON.parse(localStorage.getItem('movies'));
					setMovies(allMovies);
				}
				setMoviesLoaded(true);
			}
			saveAllMoviesLocalStorage();
			if(isNewUser() !== null){
				toast.success('Welcome to Reflix!');
			}
		},
		[ moviesLoaded ]
	);
	function handleEmptyWindowClose() {
		setShowEmpty(false);
	}
	const tryFn = (fn, fallback) => {
		try {
			return fn();
		} catch (error) {
			return fallback;
		}
	};
	function findBySearchProperty(searchQuery, movie) {
		const actors = tryFn(() => movie.actors, []);
		const director = tryFn(() => movie.director, '');
		const boxOffice = tryFn(() => movie.boxOffice, '');
		const year = tryFn(() => movie.year, '');
		const title = tryFn(() => movie.title, '');
		if (actors !== null && actorsByQuery(actors, searchQuery)) {
			return true;
		} else if (director !== null && director.toLowerCase().includes(searchQuery)) {
			return true;
		} else if (title.toLowerCase().includes(searchQuery)) {
			return true;
		} else if (year !== null && year.includes(searchQuery)) {
			return true;
		} else if (boxOffice !== null && boxOffice.toLowerCase().includes(searchQuery)) {
			return true;
		} else {
			return false;
		}
	}
	function actorsByQuery(actorsArr, query) {
		let result = false;
		for (let i = 0; i < actorsArr.length; i++) {
			if (actorsArr[i].fullName.toLowerCase().includes(query)) {
				result = true;
			}
		}
		if (result) return true;
		else return false;
	}
	function handleSearchInput(e) {
		setSearchQuery(e.target.value);
		let moviesByQuery = movies.filter(movie => {
			return findBySearchProperty(e.target.value.toLowerCase(), movie);
		});
		if(moviesByQuery.length !== 0){
			setShowEmpty(false);
			setFilteredMovies(moviesByQuery);
		} else {
			setFilteredMovies([]);
			setShowEmpty(true);
		}
	}
	function handleMovieDetailsClick(id) {
		console.log('movie id', id);
		props.history.push(`/movie/${id}`);
	}
	function handleMovieAddClick(id){
		try {
			saveUsersFavMovie(appUser.id, id);
			toast.success('Movie was added to your list!');
		} catch (ex) {
			toast.error(ex);
		}
	}
	return (
		<Fragment>
			<Navbar logged={true} />
			<Search handleInputChange={handleSearchInput} />
			<ToastContainer />
			<div className="browseBody">
				{searchQuery !== '' ? (
					<Fragment>
						{moviesLoaded ? (
							<Fragment>
								{showEmpty ? (
									<Empty
										message="No movies were found by your search querry "
										handleClick={handleEmptyWindowClose}
									/>
								) : (
									<Grid container spacing={3}>
										{filteredMovies.map((movie, index) => (
											<Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={4}>
												<Card
													id={movie._id}
													onClick={handleMovieDetailsClick}
													title={movie.title}
													subtitle={movie.title}
													tag="movie"
													centerIconName="fas fa-play-circle"
													bottomIconName="fas fa-heart"
													removeIconName={true}
													bgPhoto={movie.coverImage}
												/>
											</Grid>
										))}
									</Grid>
								)}
							</Fragment>
						) : (
							<Loader type="TailSpin" color="#e50914" height={100} width={100} />
						)}
					</Fragment>
				) : (
					<GliderPage onClick={handleMovieAddClick} categoryArr={categoryArr} />
				)}
			</div>
		</Fragment>
	);
}
