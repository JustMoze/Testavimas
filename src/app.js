import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import Browse from './components/webPages/browsePage/browse';
import Login from './components/webPages/loginPage/login';
import Register from './components/webPages/registerPage/register';
import Main from './components/webPages/mainPage/main';
import MyList from './components/webPages/myListPage/myList';
import MovieDetail from './components/webPages/movieDetailPage/movieDetail';
import { getUserId } from './services/authService';
import { getUser } from './services/userService';
import UserContext from './userContext';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './common/protectedRoute';

export default function App() {
	let [ user, setUser ] = useState({});
	let id = getUserId();
	useEffect(
		() => {
			async function saveUserData() {
				let { data } = await getUser(id);
				let userToSave = {
					id: data.uid,
					email: data.email,
					username: checkUsername(data)
				};
				setUser(userToSave);
			}
			saveUserData();
		},
		[ id ]
	);
	function checkUsername(data) {
		if ('displayName' in data) {
			return data.displayName;
		} else {
			return data.email;
		}
	}
	return (
		<BrowserRouter>
			<UserContext.Provider value={user}>
				<Switch>
					<ProtectedRoute redirectPath='/login' path="/movie/:id" component={MovieDetail} />
					<ProtectedRoute redirectPath='/login' path="/browse" component={Browse}  />
					<ProtectedRoute redirectPath='/login' path="/mylist" component={MyList} />
					<ProtectedRoute redirectPath='/browse' safeFromUser={true} path="/login" component={Login} />
					<ProtectedRoute redirectPath='/browse' safeFromUser={true} path="/register" component={Register} />
					<Route path="/" render={(props) => <Main {...props} />} />
					<Redirect to="/browse" />
				</Switch>
			</UserContext.Provider>
		</BrowserRouter>
	);
}
