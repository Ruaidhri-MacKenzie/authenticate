import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.scss';

const AuthForm = ({ signUp }) => {
	const AuthFormName = (signUp) ? "Sign Up" : "Sign In";

	const [state, setState] = useState({username: "", password: "", email: ""});
	const { username, password, email } = state;

	const sendData = () => {
		// Validate inputs
		if (!username) {
			console.log("Username is required.");
			return;
		}
		if (!password) {
			console.log("Password is required.");
			return;
		}
		if (signUp && !email) {
			console.log("Email is required.");
			return;
		}

		// Send post request to sign up
		const route = (signUp) ? 'signup' : 'signin';
		const data = (signUp) ? {username, password, email} : {username, password};
		axios.post('/user/' + route, data);
	};

	const handleChange = e => setState({...state, [e.target.name]: e.target.value});
	const handleSubmit = e => {
		e.preventDefault();
		sendData();
	};

	const renderInput = (state, name, type) => {
		const capitalise = string => string[0].toUpperCase() + string.slice(1);
		
		return (
			<input
				className={"auth-form__input auth-form__" + name}
				name={name}
				type={type}
				placeholder={capitalise(name)}
				value={state}
				onChange={handleChange}
			/>
		);
	};
	
	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<h2 className="auth-form__title">{AuthFormName}</h2>
			{renderInput(username, "username", "text")}
			{renderInput(password, "password", "password")}
			{signUp && renderInput(email, "email", "email")}
			<button className="auth-form__submit">{AuthFormName}</button>
		</form>
	);
};

export default AuthForm;
