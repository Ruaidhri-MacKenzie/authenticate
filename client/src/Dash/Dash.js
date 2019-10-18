import React, { useState } from 'react';
import './Dash.scss';

import CharacterList from './CharacterList';
import Options from './Options';
import CreateCharacter from './CreateCharacter';

const Dash = ({ user, characters, signOut, logIn, createCharacter }) => {
	const [state, setState] = useState("characters");

	const handleClick = e => {
		const activeBtn = document.querySelector(".dash-menu__link--active");
		if (activeBtn) activeBtn.classList.remove("dash-menu__link--active");
		if (e.target.classList.contains(".dash-menu__link")) e.target.classList.add("dash-menu__link--active");

		setState(e.target.name);
	};

	const renderMain = () => {
		if (state === "characters") return <CharacterList characters={characters} handleClick={handleClick} logIn={logIn} />
		else if (state === "options") return <Options />
		else if (state === "create") return <CreateCharacter createCharacter={createCharacter} />
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
					<button name="characters" className="dash-menu__link dash-menu__link--active" onClick={handleClick}>Characters</button>
					<button name="options" className="dash-menu__link" onClick={handleClick}>Options</button>
					<button className="dash-menu__link" onClick={signOut}>Sign Out</button>
				</div>
			</section>
		</main>
	);
};

export default Dash;
