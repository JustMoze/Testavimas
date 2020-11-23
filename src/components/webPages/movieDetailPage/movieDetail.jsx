import React, { useState, useEffect, Fragment, useContext } from 'react';
import Navbar from '../../navbar/navbar';
import './style.scss';
import Cover from '../../../common/details/detailsCover';
import DetailedInfo from '../../../common/details/detailedInfo';
import CommentField from '../../../common/details/commentsContainer';
import { getMovie } from '../../../services/movieService';
import Loader from 'react-loader-spinner';
import GliderTitle from '../../../common/glider/gliderTitle';
import Glider from '../../../common/glider/glider';
import UserContext from '../../../userContext';

export default function MovieDetail(props) {
	const appUser = useContext(UserContext);
	const [user, setUser]= useState({});
	const [ movie, setMovie ] = useState({});
	const { id } = props.match.params;
	const [ loading, setLoading ] = useState(true);
	useEffect(() => {
		window.scrollTo(0, 0)
		setUser(appUser);
		function getMovie() {
			let moviesInStorage = JSON.parse(localStorage.getItem('movies'));
			if (moviesInStorage) {
				let foundMovie = moviesInStorage.find((el) => el._id === id);
				setMovie(foundMovie);
				setLoading(false);
			} else {
				setMovie(getMovieFromApi(id));
				setLoading(false);
			}
		}
		getMovie();
	}, [id, appUser]);
	async function getMovieFromApi(id) {
		let { data: foundMovie } = await getMovie(id);
		return foundMovie;
	}
	return (	
		<Fragment>
			{loading ? (
				<div className='loader'>
					<Loader
						type="TailSpin"
						color="#e50914"
						height={200}
						width={200}
					/>
				</div>
			) : (
				<div className="body">
					<Navbar logged={true} />
					<Cover
						image={movie.coverImage}
						title={movie.title}
						genreList={movie.genres}
						rating={movie.rating}
					/>
					<DetailedInfo url={movie.trailerUrl} actors={movie.actors} underLineName="Actors" image={movie.coverImage} description={movie.description} director={movie.director} year={movie.year} boxOffice={movie.boxOffice} />
					<GliderTitle showReflixTitle={true}
						content='Related movies on'
						reflixTitle='Reflix' />
					<Glider related={true} movieId={movie._id} />
					{(Object.keys(user).length === 0 && user.constructor === Object) ? <Loader
						type="TailSpin"
						color="#e50914"
						height={100}
						width={100}
					/> :<CommentField movieId={movie._id} />}
				</div>
			)}
		</Fragment>
	);
}
