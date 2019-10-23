import React from 'react';
import './Home.scss';

import useGlobalState from '../App/state';

const Home = () => {
	const [state, dispatch] = useGlobalState();
	if (state) {}
	
	return (
		<main className="home">
			<h1 className="home__title">Home Page</h1>
			<button className="home__btn" onClick={e => dispatch({ type: 'showAuth' })}>Play Now</button>
		</main>
	);
};

export default Home;
