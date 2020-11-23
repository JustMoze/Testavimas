import React, { useEffect, useState, Fragment, useContext } from 'react';
import NavbarLink from '../../common/navbar/navbarLink';
import NavList from '../../common/navbar/navList';
import { withRouter } from 'react-router-dom';
import './style.scss';
import $ from 'jquery';
import UserContext from '../../userContext';
import { getUserAccountName } from '../../utils/stringFunctions';
import Loader from 'react-loader-spinner';
import { logoutUser } from '../../services/authService';
import { getUser } from '../../services/userService';

function Navbar(props) {
	const appUser = useContext(UserContext);
	const [ user, setUser ] = useState({});
	const [ usernameLoader, setUsernameLoader ] = useState(true);
	const { logged, defaultNavbar = false } = props;
	const [ showNavOptions, setShowNavOptions ] = useState(false);
	const [ homeActive, setHomeActive ] = useState(true);
	const [ registerActive, setRegisterActive ] = useState(false);
	const [ loginActive, setLoginActive ] = useState(false);
	useEffect(
		() => {
			async function getUserData() {
				console.log(appUser);
				let { data: userData } = await getUser(appUser.id);
				setUser(userData);
				if (Object.keys(user).length === 0 && user.constructor === Object) {
					setUsernameLoader(false);
				}
			}
			getUserData();
		},
		[ appUser ]
	);
	function handleHomeClick() {
		props.history.push('/browse');
	}
	function handleLoginClick() {
		props.history.push('/login');
	}
	function handleRegsiterClick() {
		props.history.push('/register');
	}
	function handleLogout() {
		logoutUser();
	}
	function handleFavoritesClick() {
		props.history.push('/mylist');
	}
	function handleOptionsModal(res) {
		setShowNavOptions(res);
		setHomeActive(!res);
	}
	function mouseEnter(name) {
		switch (name) {
			case 'Home':
				setHomeActive(true);
				setShowNavOptions(false);
				break;
			case 'Regsiter':
				setRegisterActive(true);
				break;
			case 'Login':
				setLoginActive(true);
				break;
			default:
				break;
		}
	}
	function mouseLeave(name) {
		switch (name) {
			case 'Home':
				setHomeActive(false);
				setShowNavOptions(false);
				break;
			case 'Regsiter':
				setRegisterActive(false);
				break;
			case 'Login':
				setLoginActive(false);
				break;
			default:
				break;
		}
	}
	function handleLogoClick() {
		props.history.push('/browse');
	}
	useEffect(() => {
		$(window).on('scroll', () => {
			if ($(window).scrollTop()) {
				$('nav').addClass('black');
				$('nav ul ul').addClass('navulul');
			} else {
				$('nav').removeClass('black');
				$('nav ul ul').removeClass('navulul');
			}
		});
	}, []);
	return (
		<nav>
			<div className="logo" onClick={handleLogoClick}>
				<p>REFLIX</p>
			</div>
			{defaultNavbar ? null : (
				<Fragment>
					{logged ? (
						<ul>
							<NavbarLink
								mouseEnter={mouseEnter}
								mouseLeave={mouseLeave}
								isActive={homeActive}
								name="Home"
								handleLinkClick={handleHomeClick}
							/>
							{usernameLoader ? (
								<Loader type="TailSpin" color="#e50914" height={100} width={100} />
							) : (
								<li>
									<Fragment>
										<div
											onMouseEnter={() => {
												setHomeActive(false);
												setShowNavOptions(true);
											}}
										>
											{getUserAccountName(appUser.username)}
										</div>
										{showNavOptions ? (
											<NavList
												mouseEnter={mouseEnter}
												mouseLeave={mouseLeave}
												showOptions={handleOptionsModal}
												favName="My List"
												isActiveFav={false}
												isActiveLogout={false}
												logoutName="Logout"
												handleLogoutClick={handleLogout}
												handleMyListClick={handleFavoritesClick}
											/>
										) : null}
									</Fragment>
								</li>
							)}
						</ul>
					) : (
						<ul>
							<NavbarLink
								mouseEnter={mouseEnter}
								mouseLeave={mouseLeave}
								isActive={homeActive}
								name="Home"
								handleLinkClick={handleHomeClick}
							/>
							<NavbarLink
								mouseEnter={mouseEnter}
								mouseLeave={mouseLeave}
								isActive={loginActive}
								name="Login"
								handleLinkClick={handleLoginClick}
							/>
							<NavbarLink
								mouseEnter={mouseEnter}
								mouseLeave={mouseLeave}
								isActive={registerActive}
								name="Register"
								handleLinkClick={handleRegsiterClick}
							/>
						</ul>
					)}
				</Fragment>
			)}
		</nav>
	);
}
export default withRouter(Navbar);
