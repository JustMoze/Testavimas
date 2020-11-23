import React from 'react';
import styled from 'styled-components';
import Form from '../../../common/inputs/form';
import Joi from 'joi-browser';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Grid } from '@material-ui/core';
import BackgroundCover from '../../../assets/movies.jpg';
import '../registerPage/style.scss';
import { app } from '../../../utils/firebaseInit';

const ResetSection = styled.section`
	position: absolute;
	height: auto;
	width: 70%;
	margin-left: auto;
	margin-right: auto;
	margin: auto;
	left: 0;
	right: 0;
`;
const BackSection = styled.div`
	cursor: pointer;
	position: absolute;
	top: -15%;
	left: 0%;
`;
class ResetPassword extends Form {
	state = {
		data: {
			email: ''
		},
		errors: {}
	};

	schema = {
		email: Joi.string().email().required().label('Email address')
	};
	doSubmit = async () => {
		//call server
		try {
			const { email } = this.state.data;
			var actionCodeSettings = {
				url: 'http://localhost:3000/login',
				handleCodeInApp: false
			};
			app
				.auth()
				.sendPasswordResetEmail(email, actionCodeSettings)
				.then(() => {
					toast.success('Email was sent to you. Please check and verify');
				})
				.catch((err) => {
					const { message: errorMessage } = err;
					toast.error(errorMessage);
				});
		} catch (ex) {
			toast.error(ex.response.data);
		}
	};
	render() {
		return (
			<ResetSection>
				<ToastContainer />
				<Grid
					container
					spacing={1}
					className="resetRow"
					style={{
						backgroundImage: `linear-gradient(to right, transparent 0%, black 80%), url(${BackgroundCover})`
					}}
				>
					<Grid item xs={false} sm={false} md={6} lg={6} style={{ position: 'relative', padding: '10px' }}>
						<BackSection onClick={this.handleRestetBackClick}>
							<ArrowBackIcon />
						</BackSection>
					</Grid>
					<Grid item xs={12} sm={12} md={6} lg={6} className="reset-container">
						<h2>Forgot the Password?</h2>
						<div className="resetInfo">
							Please enter your email address. You will recieve a link to create a new password via email.
						</div>
						<form onSubmit={this.handleOnSubmit}>
							{this.renderInput('email', 'Email:')}
							{this.renderButton('ResetPassword', true, 'Reset password')}
						</form>
					</Grid>
				</Grid>
			</ResetSection>
		);
	}
}
export default withRouter(ResetPassword);
