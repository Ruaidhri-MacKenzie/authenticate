import React from 'react';

import useGlobalState from './state';

import Home from '../Home/Home';
import Auth from '../Auth/Auth';
import Dash from '../Dash/Dash';
import Game from '../Game/Game';

const Main = () => {
	const [{ user, player, showAuth }] = useGlobalState();

	if (user && player) return <Game />
	else if (user) return <Dash />
	else if (showAuth) return <Auth />
	else return <Home />
};

export default Main;
