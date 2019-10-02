import React, { useState } from 'react';
import './Auth.scss';

import AuthForm from '../AuthForm/AuthForm';
import TabBar from '../TabBar/TabBar';

const Auth = ({ setToken }) => {
	const [signUp, setSignUp] = useState(true);
	const toggleSignUp = () => setSignUp(!signUp);
	
	return (
		<main className="auth">
			<TabBar toggleSignUp={toggleSignUp} />
			<AuthForm signUp={signUp} setToken={setToken} />
		</main>
	);
};

export default Auth;
