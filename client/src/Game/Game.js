import React, { useState, useEffect } from 'react';
import './Game.scss';

import GameMenu from './GameMenu';
import MapName from './MapName';
import StatusBox from './StatusBox';
import Profile from './Profile.js';
import Stats from './Stats';
import Inventory from './Inventory';
import Clans from './Clans';
import Logout from './Logout';
import Canvas from './Canvas';
import Chatbox from './Chatbox';

const Game = () => {
	const [menuView, setMenuView] = useState('inventory');
	useEffect(() => {
		let activeBtn = document.querySelector(".game-menu__btn--active");
		if (activeBtn) activeBtn.classList.remove("game-menu__btn--active");
		activeBtn = document.querySelector(".game-menu__" + menuView);
		if (activeBtn) activeBtn.classList.add("game-menu__btn--active");
	}, [menuView]);

	const renderMenuView = () => {
		if (menuView === 'profile') return <Profile />;
		else if (menuView === 'stats') return <Stats />;
		else if (menuView === 'inventory') return <Inventory />;
		else if (menuView === 'clans') return <Clans />;
		else if (menuView === 'logout') return <Logout setMenuView={setMenuView} />;
	}

	return (
		<main className="game">
			<Canvas />
			<MapName />
			<StatusBox />
			{renderMenuView()}
			<GameMenu setMenuView={setMenuView} />
			<Chatbox />
		</main>
	);
};

export default Game;
