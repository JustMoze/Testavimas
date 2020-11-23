import React, { Fragment } from 'react';
import styled from 'styled-components';
import FacebookIcon from '@material-ui/icons/Facebook';

const FacebookBtn = styled.div`
	width: 50%;
	padding-right: 10px;
	button {
		display: flex;
		align-items: center;
		margin: auto;
		color: #ffffff;
		background-color: #3b5998;
		width: 170px;
		line-height: 60px;
		font-family: "Montserrat", sans-serif;
		border-radius: 15px !important;
		border: 0px;
		box-shadow: -5px 7px 10px rgba(0, 0, 0, 0.1);
		float: right;
		@media (max-width: 700px) {
			width: 100% !important;
		}
	}
	button:focus {
		outline: none;
	}
	div {
		margin: auto;
		height: 100%;
		display: flex;
		height: 60px;
		align-items: center;
	}
	svg {
		margin-right: 5%;
	}
`;
const GoogleBtn = styled.div`
	width: 50%;
	padding-left: 10px;
	button {
		display: flex;
		align-items: center;
		margin: auto;
		color: #000000;
		background-color: #ffffff;
		width: 170px;
		line-height: 60px;
		font-family: "Montserrat", sans-serif;
		border-radius: 15px;
		border: 0px;
		box-shadow: -5px 7px 10px rgba(0, 0, 0, 0.1);
		float: left;

		@media (max-width: 700px) {
			width: 100% !important;
		}
	}
	button:focus {
		outline: none;
	}
	div {
		margin: auto;
		height: 100%;
		display: flex;
		height: 60px;
		align-items: center;
	}
	@media (max-width: 700px) {
		button: {
			width: 100%;
		}
	}
	img {
		padding-right: 10px;
	}
`;

function Button({ facebook, onClick }) {
	return (
		<Fragment>
			{facebook ? (
				<FacebookBtn onClick={onClick}>
					<button>
						<div>
							<FacebookIcon />
							Facebook
						</div>
					</button>
				</FacebookBtn>
			) : (
				<GoogleBtn onClick={onClick}>
					<button>
						<img src="https://img.icons8.com/color/30/000000/google-logo.png" alt="Google" />
						Google
					</button>
				</GoogleBtn>
			)}
		</Fragment>
	);
}

export default Button;
