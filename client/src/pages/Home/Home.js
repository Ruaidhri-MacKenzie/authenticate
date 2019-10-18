import React from 'react';
import './Home.scss';

const Home = ({ setShowLogin }) => {
	return (
		<main className="home">
			<h1>Home Page</h1>
			<button onClick={e => setShowLogin(true)}>Sign Up/Sign In</button>
		</main>
	);
};

export default Home;
