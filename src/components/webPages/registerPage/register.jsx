import React, { Fragment } from 'react';
import Navbar from '../../navbar/navbar';
import Joi from 'joi-browser';
import { ToastContainer, toast } from 'react-toastify';
import { Grid } from '@material-ui/core';
import { registerUser } from '../../../services/userService';
import { saveUserId } from '../../../services/authService';
import Form from '../../../common/inputs/form';
import './style.scss';

class Register extends Form {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				username: '',
				email: '',
				phoneNumber: '',
				password: '',
				repeatPassword: ''
			},
			errors: {},
		};
	}
	schema = {
		username: Joi.string().min(8).max(50).required().label('Username'),
		email: Joi.string().max(255).required().email().label('Email'),
		phoneNumber: Joi.string().min(8).max(16).required().label('Phone number'),
		password: Joi.string().min(8).max(516).required().label('Password'),
		repeatPassword: Joi.string().min(8).max(516).required().label('Repeat password')
	};
	doSubmit = async () => {
		try {
			const { username, email, phoneNumber, password } = this.state.data;
			var userData = {
				displayName: username,
				email: email,
				phoneNumber: phoneNumber,
				password: password
			};
			let { data: { uid } } = await registerUser(userData);
			if (uid) {
				localStorage.setItem('newUser', JSON.stringify(true));
				saveUserId(uid);
				this.props.history.push('/browse');
			}
		} catch (ex) {
			toast.error(ex);
		}
	};
	render() {
		return (
			<Fragment>
				<Navbar logged={false} />
				<div style={{ marginTop: '100px' }}>
					<ToastContainer />

					<Grid container spacing={1}>
						<Grid item xs={1} sm={1} md={2} lg={4} />
						<Grid item xs={10} sm={10} md={8} lg={4} className="col">
							<h1>
								Sign up to <span>Reflix</span>
							</h1>
							<form onSubmit={this.handleOnSubmit}>
								{this.renderInput('username', 'Username:')}
								{this.renderInput('email', 'Email:')}
								{this.renderInput('phoneNumber', 'Phone number:')}
								{this.renderInput('password', 'Password:', 'password')}
								{this.renderInput('repeatPassword', 'Repeat Password:', 'password')}
								{this.renderButton('Register')}
							</form>
						</Grid>
					</Grid>
				</div>
			</Fragment>
		);
	}
}
export default Register;
