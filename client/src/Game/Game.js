import React from 'react';
import './Game.scss';

import useGlobalState from '../App/state';

const Game = () => {
	const [{ socket, player }] = useGlobalState();

	return (
		<main className="game">
			<h1>GAME</h1>
			<h3>{player.name}</h3>
			<button onClick={e => socket.emit('logOut', player._id)}>Log Out</button>
			<canvas className="game-window"></canvas>
		</main>
	);
};

export default Game;
