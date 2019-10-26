import React from 'react';
import useGlobalState from '../App/state';

const GameMenu = ({ setMenuView }) => {
	const [{ player }] = useGlobalState();

	return (
		<section className="game-menu">
			<button className="game-menu__btn game-menu__profile" onClick={e => setMenuView('profile')}>{player.name}</button>
			<button className="game-menu__btn game-menu__stats" onClick={e => setMenuView('stats')}>Stats</button>
			<button className="game-menu__btn game-menu__inventory game-menu__btn--active" onClick={e => setMenuView('inventory')}>Inventory</button>
			<button className="game-menu__btn game-menu__clans" onClick={e => setMenuView('clans')}>Clans</button>
			<button className="game-menu__btn game-menu__logout" onClick={e => setMenuView('logout')}>Log Out</button>
		</section>
	);
};

export default GameMenu;
