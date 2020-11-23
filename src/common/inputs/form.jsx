import React, { Component } from 'react';
import Joi from 'joi-browser';
import styled from 'styled-components';
import Input from './input';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const Button = styled.button`
	margin-top: 30px;
	line-height: 42px !important;
	width: 100%;
	border-radius: 10px;
	background-color: #0e0e0e;
	color: #ffffff;
	outline: none;
	border: none;
	text-align: center;
	display: block !important;

	&:disabled {
		border: 1px solid #0e0e0e;
		background-color: #9a9b9c;
		color: #fffff;
	}
`;
const Directions = styled.div`
	padding-top: 15px;
	width: 100%;
	text-align: center;
	span {
		cursor: pointer;
		font-weight: bold;
		text-decoration: underline;
	}
`;
const ResetButton = styled.button`
margin: auto;
border: none;
width: 50%;
text-align: center;
line-height: 50px;
display: block;
border-radius: 15px;
background: none;
border: 1px solid #595959;
color: #f7f7f7;
&:hover {
	-webkit-box-shadow: 0px 0px 80px 7px rgba(59, 89, 152, 1);
  -moz-box-shadow: 0px 0px 80px 7px rgba(59, 89, 152, 1);
  box-shadow: 0px 0px 80px 7px rgba(59, 89, 152, 1);
}
&:focus {
	outline: none;
  border: 1px solid #595959;
}
svg {
	width: 25px !important;
	height: 25px !important;
	padding-bottom: 2% !important;
}
`;
export default class Form extends Component {
	state = {
		data: {},
		errors: {}
	};
	validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);

		if (!error) return null;

		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};
	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const subSchema = { [name]: this.schema[name] };

		const { error } = Joi.validate(obj, subSchema);
		return error ? error.details[0].message : null;
	};
	handleOnSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};
	handleChange = (e) => {
		// validate each input
		const { value, name } = e.currentTarget;
		const { currentTarget: input } = e;

		var passwordMismatchError = null;
		if (name === 'repeatPassword') {
			if (value !== this.state.data['password']) {
				passwordMismatchError = "Passwords don't match!";
			}
		}
		const currentErrors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage || passwordMismatchError) {
			if (errorMessage) {
				currentErrors[name] = errorMessage;
			} else currentErrors[name] = passwordMismatchError;
		} else delete currentErrors[name];

		const newdata = { ...this.state.data };
		newdata[name] = value;

		this.setState({ data: newdata, errors: currentErrors });
	};
	renderInput(name, label, type = 'text', spanLink = false, handleSpanClick, spanLabel) {
		const { data, errors } = this.state;
		return (
			<Input
				spanLink={spanLink}
				spanLabel={spanLabel}
				handleSpanClick={handleSpanClick}
				name={name}
				error={errors[name]}
				value={data[name]}
				label={label}
				type={type}
				onChange={this.handleChange}
			/>
		);
	}
	renderButton(label, showIcon=false, buttonLabel) {
		return (showIcon ? <ResetButton>
			{buttonLabel} <MailOutlineIcon />
		</ResetButton> : <Button disabled={this.validate()}>{label}</Button>);
	}
	renderPostDirections(label, spanLabel, onClickDirections) {
		return (
			<Directions onClick={onClickDirections}>
				{label} <span>{spanLabel}</span>
			</Directions>
		);
	}
}
