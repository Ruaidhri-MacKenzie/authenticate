import React, { useState } from 'react';
import './Dash.scss';

import Characters from '../../components/Characters/Characters';
import Options from '../../components/Options/Options';
import CreateCharacter from '../../components/CreateCharacter/CreateCharacter';

const Dash = ({ signOut, user, logIn }) => {
	const [state, setState] = useState("characters");
	const handleClick = e => setState(e.target.name);

	const renderMain = () => {
		if (state === "characters") {
			return <Characters characters={user.characters} handleClick={handleClick} logIn={logIn} />
		}
		else if (state === "options") {
			return <Options />
		}
		else if (state === "create") {
			return <CreateCharacter />
		}
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
