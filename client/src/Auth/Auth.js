import React, { useState, useEffect, useCallback } from 'react';
import './Auth.scss';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

import TabBar from './TabBar';
import Loading from '../components/Loading/Loading';
import useGlobalState from '../App/state';
import config from '../App/config';

const Auth = () => {
	const [state, dispatch] = useGlobalState();
	if (state) {}

	const signIn = useCallback(user => {
		const socket = socketIOClient(config.SERVER_URI);
		dispatch({ type: 'signIn', user, socket });
	}, [dispatch]);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const createError = message => {
		setError(message);
		// setTimeout(() => setError(null), 1500);
	};

	const [inputs, setInputs] = useState({username: "", password: "", email: ""});
	const { username, password, email } = inputs;

	const [isSignUp, setIsSignUp] = useState(false);
	const toggleSignUp = () => setIsSignUp(!isSignUp);
	const AuthFormName = (isSignUp) ? "Sign Up" : "Sign In";

	// Check if session cookie already exists
	useEffect(() => {
		axios.get('/auth')
		.then(response => {
			if (response) signIn(response.data);
		})
		.catch(err => console.log(err));
	}, [signIn]);

	const validateInputs = ({ username, password, email }) => {
		if (!username) {
			createError("Username is required");
			return false;
		}
		else if (username.length > 25) {
			createError("Username is too long");
			return false;
		}
		else if (username.length < 3) {
			createError("Username is too short");
			return false;
		}
		else if (!password) {
			createError("Password is required");
			return false;
		}
		else if (password.length < 3) {
			createError("Password is too short");
			return false;
		}
		else if (isSignUp && !email) {
			createError("Email is required");
			return false;
		}
		else {
			return true;
		}
	};

	const sendData = ({ username, password, email}) => {
		username = username.trim();
		if (!validateInputs({ username, password, email })) return;

		const route = (isSignUp) ? 'signup' : 'signin';
		const data = (isSignUp) ? {username, password, email} : {username, password};
		setLoading(true);
		axios.post('/auth/' + route, data)
		.then(response => {
			setLoading(false);
			signIn(response.data);
		})
		.catch(err => {
			setLoading(false);
			createError(err.response.data.message);
		});
	};

	const handleChange = e => setInputs({...inputs, [e.target.name]: e.target.value});
	const handleSubmit = e => {
		e.preventDefault();
		sendData({ username, password, email });
	};

	const renderInput = (input, name, type) => {
		const capitalise = string => string[0].toUpperCase() + string.slice(1);
		
		return (
			<input
				className={"auth-form__input auth-form__" + name}
				name={name}
				type={type}
				placeholder={capitalise(name)}
				value={input}
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
				{isSignUp && renderInput(email, "email", "email")}
				{error && <p className="auth-form__error">{error}</p>}
				<button className="auth-form__submit">{AuthFormName}</button>
				<div className="auth-form__back" onClick={e => dispatch({ type: 'hideAuth' })}>Back</div>
				{loading && <Loading className="auth-form__loading" />}
			</form>
		</main>
	);
};

export default Auth;
