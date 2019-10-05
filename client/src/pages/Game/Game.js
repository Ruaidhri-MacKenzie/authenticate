import React from 'react';
import { Link } from 'react-router-dom';
import './Game.scss';

const Game = ({ user }) => {
	return (
		<main className="game">
			<h1>GAME</h1>
			<h3>{user.username}</h3>
			<Link to={'/dash'}>Dashboard</Link>
			<canvas className="game-window"></canvas>
		</main>
	);
};

export default Game;
