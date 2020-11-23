import React from 'react';
import NavbarLink from './navbarLink';

export default function NavList(props) {
	const {
		handleMyListClick,
		handleLogoutClick,
		favName,
		isActiveFav,
		isActiveLogout,
		logoutName,
		showOptions,
		mouseEnter,
		mouseLeave
	} = props;
	return (
		<ul onMouseLeave={() => showOptions(false)} onMouseEnter={() => showOptions(true)}>
			<NavbarLink
				mouseEnter={mouseEnter}
				mouseLeave={mouseLeave}
				isActive={isActiveFav}
				name={favName}
				handleLinkClick={handleMyListClick}
			/>
			<NavbarLink
				mouseEnter={mouseEnter}
				mouseLeave={mouseLeave}
				isActive={isActiveLogout}
				name={logoutName}
				handleLinkClick={handleLogoutClick}
			/>
		</ul>
	);
}
