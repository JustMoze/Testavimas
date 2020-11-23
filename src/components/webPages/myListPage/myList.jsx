import React, { Fragment, useState, useEffect, useContext } from 'react';
import Navbar from '../../navbar/navbar';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import '../browsePage/style.scss';
import { Grid } from '@material-ui/core';
import Card from '../../../common/movie/card';
import Empty from '../../../common/emptyField/empty';
import UserContext from '../../../userContext';
import Loader from 'react-loader-spinner';
import { app } from '../../../utils/firebaseInit';
import { toast, ToastContainer } from 'react-toastify';
import { removeFavoriteMovie } from '../../../services/commentService';

const LoaderContainer = styled.div`
	svg {
		margin-left: 48%;
		width: 50px !important;
		height: 50px !important;
		margin-top: 15%;
	}
`;

function MyList(props) {
	const appUser = useContext(UserContext);
	const userFavMoviesRef = app.database().ref(`/favoriteMovies/${appUser.id}`);
	let [ showEmpty, setShowEmpty ] = useState(false);
	let [ favorites, setFavorites ] = useState([]);
	let [ userLoaded, setUserLoaded ] = useState(false);
	const allMovies = JSON.parse(localStorage.getItem('movies'));
	useEffect(
		() => {
			let moviesIdArr = [];
			userFavMoviesRef.on('value', (snap) => {
				snap.forEach((element) => {
					moviesIdArr.push(element.val());
				});
				let moviesArr = [];
				allMovies.forEach((movie) => {
					moviesIdArr.forEach((element) => {
						if (element.movieId === movie._id) {
							moviesArr.push(movie);
						}
					});
				});
				if (moviesArr.length === 0) {
					setShowEmpty(true);
				} else {
					setFavorites(moviesArr);
					setShowEmpty(false);
					setUserLoaded(true);
				}
			});
		},
		[ appUser ] 
	);
	function handleEmptyWindowClose() {
		setShowEmpty(false);
		props.history.push('/browse');
	}
	function handleMovieDetailsClick(id) {
		props.history.push(`/movie/${id}`);
	}
	function handleRemoveClick(movieId) {
		try {
			let newFavorites = [ ...favorites ];
			newFavorites = newFavorites.filter((movie) => {
				return movie._id !== movieId;
			});	
			removeFavoriteMovie(appUser.id, movieId);
			setFavorites(newFavorites);
			if (newFavorites.length === 0) {
				setShowEmpty(true);
			}
			toast.dark('Movie was removed from your list!');
		} catch (ex) {
			toast.error(ex);
		}
	}
	return (
		<Fragment>
			<Navbar logged={true} />
			<div className="browseBody" style={{ marginTop: '100px' }}>
				<ToastContainer />
				{userLoaded ? (
					<Fragment>
						{showEmpty ? (
							<Empty
								message="No movies were found by your search querry "
								handleClick={handleEmptyWindowClose}
							/>
						) : (
							<Grid container spacing={3}>
								{favorites.map((movie, index) => (
									<Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={4}>
										<Card
											onClickRemove={handleRemoveClick}
											id={movie._id}
											onClick={handleMovieDetailsClick}
											title={movie.title}
											subtitle={movie.title}
											tag={movie.genres[0].genreType ? movie.genres[0].genreType : 'undefinded'}
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
					<LoaderContainer>
						<Loader type="TailSpin" color="#e50914" height={100} width={100} />
					</LoaderContainer>
				)}
			</div>
		</Fragment>
	);
}
export default withRouter(MyList);
