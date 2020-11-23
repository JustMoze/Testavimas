import React from 'react';
import logo from '../../assets/logo-long-white2.png';
import "./styles.scss";

export default function Search(props) {
	let { handleInputChange } = props;
	return (
		<section className="searchSection">
			<img src={logo} alt="Logo" className='img' 	/>
			<form className="search" action="">
				<input type="search" onChange={handleInputChange} id="search" placeholder="Search here..." required />
				<button type="submit" className="active" id="searchButton">
					Search
				</button>
			</form>
		</section>
	);
}
