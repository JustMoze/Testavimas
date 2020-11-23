import React from 'react';
import './style.scss';
import logo from '../../assets/logo-long-white2.png'

export default function Footer() {
	return (
		<footer className="page-footer">
			<div className="footer-logo">
				<img src={logo} alt="Logo" />
			</div>
			<div style={{paddingBottom: '15px'}}>
				© 2020 Copyright:
				<a href="http://www.reactseals.com/"> REACTSEALS.COM</a>
			</div>
		</footer>
	);
}
