import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from '../../navbar/navbar';
import Joi from 'joi-browser';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { Grid } from '@material-ui/core';
import Form from '../../../common/inputs/form';
import Button from '../../../common/inputs/button';
import '../registerPage/style.scss';
import { app } from '../../../utils/firebaseInit';
import ResetPassword from './passwordReset';
import { saveUserId } from '../../../services/authService';
import * as firebase from "firebase";

const ButtonsContainer = styled.div`
	display: flex;
	margin: 15px 0px 25px;
`;
class Login extends Form {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				email: '',
				password: ''
			},
			showReset: false,
			errors: {}
		};
	}
	schema = {
		email: Joi.string().email().required().label('Email address'),
		password: Joi.string().min(8).max(516).required().label('Password')
	};
	doSubmit = async () => {
		try {
			const { email, password } = this.state.data;
			app
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then((result) => {
					let { user } = result;
					localStorage.setItem('newUser', JSON.stringify(true));
					saveUserId(user.uid);
					this.props.history.push('/browse');
				})
				.catch((err) => {
					const { message: errorMessage } = err;
					toast.error(errorMessage);
				});
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.email = ex.response.data;
				toast.error(ex.response.data);
				console.log(ex);
				this.setState({ errors });
			}
		}
	};
	handleSpanClick = () => {
		this.setState({ showReset: true });
	};
	handleDirectionClick = () => {
		this.props.history.push('/register');
	};
	handleFacebookClick = () => {
		app.auth().useDeviceLanguage();
		var facebookProvider = new firebase.auth.FacebookAuthProvider();
		app
			.auth()
			.signInWithPopup(facebookProvider)
			.then((result) => {
				const { user } = result;
				if (user) {
					localStorage.setItem('newUser', JSON.stringify(true));
					saveUserId(user.uid);
					this.props.history.push('/browse');
				}
			})
			.catch((err) => {
				const { message: errorMessage } = err;
				toast.error(errorMessage);
			});
	};
	handleGoogleClick = () => {
		app.auth().useDeviceLanguage();
		var provider = new firebase.auth.GoogleAuthProvider();
		app
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				const { user } = result;
				if (user) {
					localStorage.setItem('newUser', JSON.stringify(true));
					saveUserId(user.uid);
					this.props.history.push('/browse');
				}
			})
			.catch((err) => {
				const { message: errorMessage } = err;
				toast.error(errorMessage);
			});
	};
	handleRestetBackClick = () => {
		console.log('back was clicked');
		this.setState({showReset: false});
	} 
	render() {
		const { showReset } = this.state;
		return (
			<Fragment>
				<Navbar logged={false} />
				<div style={{ marginTop: '100px' }}>
					{showReset ? (
						<ResetPassword onClick={this.handleRestetBackClick} />
					) : (
						<Fragment>
							<ToastContainer />
							<section style={{ position: 'relative' }}>
								<Grid container spacing={1}>
									<Grid item xs={1} sm={1} md={2} lg={4} />
									<Grid item xs={10} sm={10} md={8} lg={4} className="col">
										<h1>Sign in with</h1>
										<ButtonsContainer>
											<Button facebook={true} onClick={this.handleFacebookClick} />
											<Button facebook={false} onClick={this.handleGoogleClick} />
										</ButtonsContainer>
										<form onSubmit={this.handleOnSubmit}>
											{this.renderInput('email', 'Email:')}
											{this.renderInput(
												'password',
												'Password:',
												'password',
												true,
												this.handleSpanClick,
												'Forgot?'
											)}
											{this.renderButton('Login')}
											{this.renderPostDirections(
												"Don't have an account?",
												'Click here!',
												this.handleDirectionClick
											)}
										</form>
									</Grid>
								</Grid>
							</section>
						</Fragment>
					)}
				</div>
			</Fragment>
		);
	}
}
export default withRouter(Login);
