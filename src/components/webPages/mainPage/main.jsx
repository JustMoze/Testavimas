import React, { Fragment } from 'react';
import Navbar from '../../navbar/navbar';
import './style.scss';
import Footer from '../../footer/footer';
import cinemaLogo from '../../../assets/cinema.png';
import loginLogo from '../../../assets/arrow.png';

export default function Main(props) {
    function handleLoginClick(){
        props.history.push('/login');
    }
    function handleBrowseClick(){
        props.history.push('/browse');
    }
	return (
		<Fragment>
			<Navbar logged={false} defaultNavbar={true} />
			<section id="content">
				<section id="titleSection">
					<h1>
						Welcome to <span>REFLIX</span>
					</h1>
				</section>
				<section id="options">
					<div id="browse">
						<div id="cinema" onClick={handleBrowseClick}>
							<img src={cinemaLogo} alt="" />
							<p>Browse</p>
						</div>
					</div>
					<div id="login" onClick={handleLoginClick}>
						<div id="arrow">
							<img src={loginLogo} alt="" />
							<p>Login</p>
						</div>
					</div>
				</section>
			</section>
			<Footer />
		</Fragment>
	);
}
