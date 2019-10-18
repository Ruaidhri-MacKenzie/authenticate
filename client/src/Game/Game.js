import React from 'react';
import './Game.scss';

const Game = ({ player, logOut }) => {
	return (
		<main className="game">
			<h1>GAME</h1>
			<h3>{player.name}</h3>
			<button onClick={logOut}>Dashboard</button>
			<canvas className="game-window"></canvas>
		</main>
	);
};

export default Game;
