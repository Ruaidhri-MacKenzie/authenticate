import React, { useState } from 'react';
import './Main.scss';

import AuthForm from '../AuthForm/AuthForm';
import TabBar from '../TabBar/TabBar';

const Main = () => {
	const [signUp, setSignUp] = useState(true);
	const toggleSignUp = () => setSignUp(!signUp);
	
	return (
		<main className="main">
			<TabBar toggleSignUp={toggleSignUp} />
			<AuthForm signUp={signUp} />
		</main>
	);
};

export default Main;
