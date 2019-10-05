import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
	return (
		<main className="home">
			<h1>Home Page</h1>
			<Link to="/auth">Sign Up/Sign In</Link>			
		</main>
	);
};

export default Home;
