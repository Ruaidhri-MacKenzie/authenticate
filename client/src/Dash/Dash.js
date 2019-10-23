import React, { useState, useEffect } from 'react';
import './Dash.scss';
import axios from 'axios';

import CharacterList from './CharacterList';
import Options from './Options';
import CreateCharacter from './CreateCharacter';

import useGlobalState from '../App/state';

const Dash = () => {
	const [{ socket, user, characters }, dispatch] = useGlobalState();

	const [view, setView] = useState("characters");
	useEffect(() => {
		let activeBtn = document.querySelector(".dash-menu__btn--active");
		if (activeBtn) activeBtn.classList.remove("dash-menu__btn--active");
		activeBtn = document.querySelector(".dash-menu__" + view);
		if (activeBtn) activeBtn.classList.add("dash-menu__btn--active");
	}, [view]);

	useEffect(() => setView("characters"), [characters]);

	const signOut = () => {
		axios.post('/auth/signout')
		.then(response => {
			socket.disconnect();
			dispatch({ type: 'signOut' });
		})
		.catch(err => console.log(err));
	};

	const renderMain = () => {
		if (view === "characters") return <CharacterList setView={setView} />
		else if (view === "options") return <Options />
		else if (view === "create") return <CreateCharacter />
	};

	return (
		<main className="dash">
			<section className="dash-menu">
				<h1 className="dash-menu__title">Dashboard</h1>
				<h3 className="dash-menu__username">{user.username}</h3>

				<div className="dash-menu__display">
					{renderMain()}
				</div>

				<div className="dash-menu__btns">
					<button className="dash-menu__btn dash-menu__characters dash-menu__btn--active" onClick={e => setView("characters")}>Characters</button>
					<button className="dash-menu__btn dash-menu__options" onClick={e => setView("options")}>Options</button>
					<button className="dash-menu__btn" onClick={signOut}>Sign Out</button>
				</div>
			</section>
		</main>
	);
};

export default Dash;
