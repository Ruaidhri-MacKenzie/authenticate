import React, { useState } from 'react';
import axios from 'axios';
import './Auth.scss';

import TabBar from '../../components/TabBar/TabBar';
import Loading from '../../components/Loading/Loading';

const Auth = ({ setUser }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const createError = message => {
		setError(message);
		setTimeout(() => setError(null), 1500);
	};

	const [signUp, setSignUp] = useState(true);
	const toggleSignUp = () => setSignUp(!signUp);
	const AuthFormName = (signUp) ? "Sign Up" : "Sign In";

	const [state, setState] = useState({username: "", password: "", email: ""});
	const { username, password, email } = state;

	const sendData = () => {
		// Validate inputs
		if (!username) {
			createError("Username is required");
			return;
		}
		if (!password) {
			createError("Password is required");
			return;
		}
		if (signUp && !email) {
			createError("Email is required");
			return;
		}

		// Send post request to sign up
		const route = (signUp) ? 'signup' : 'signin';
		const data = (signUp) ? {username, password, email} : {username, password};
		setLoading(true);
		axios.post('http://localhost:2000/auth/' + route, data)
		.then(response => {
			console.log(response);
			setLoading(false);
			setUser(response.data);
		})
		.catch(err => {
			console.log(err);
			setLoading(false);
			createError((err.response) ? err.response.data.message : "Error");
		});
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
		<main className="auth">
			<form className="auth-form" onSubmit={handleSubmit}>
				<TabBar toggleSignUp={toggleSignUp} />
				<h2 className="auth-form__title">{AuthFormName}</h2>
				{renderInput(username, "username", "text")}
				{renderInput(password, "password", "password")}
				{signUp && renderInput(email, "email", "email")}
				{error && <p className="auth-form__fail">{error}</p>}
				<button className="auth-form__submit">{AuthFormName}</button>
				{loading && <Loading />}
			</form>
		</main>
	);
};

export default Auth;
