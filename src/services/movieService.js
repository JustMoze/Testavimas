import http from './httpService';
import config from '../config.json';

const moviesAPI = config.apiEndpoint + 'movies';

export function getAllMovies() {
	return http.get(`${moviesAPI}`);
}
export function getPopularMovies() {
	return http.get(`${moviesAPI}/type/populars`);
}
export function getMovie(id) {
	return http.get(`${moviesAPI}/${id}`);
}
export function getMoviesByGenre(genre) {
	return http.get(`${moviesAPI}/genre/${genre}`);
}
export function getRelatedMovies(movieID) {
	return http.get(`${moviesAPI}/${movieID}/similar`);
}