import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import './Dash.scss';

import Characters from '../../components/Characters/Characters';
import Options from '../../components/Options/Options';
import CreateCharacter from '../../components/CreateCharacter/CreateCharacter';

const Dash = ({ signOut, user }) => {
	return (
		<main className="dash">
			<section className="dash-menu">
				<h1 className="dash-menu__title">Dashboard</h1>
				<h3 className="dash-menu__username">{user.username}</h3>

				<div className="dash-menu__display">
					<Route exact path="/dash" render={() => <Characters characters={user.characters} />} />
					<Route exact path="/dash/options" render={() => <Options />} />
					<Route exact path="/dash/character" render={() => <CreateCharacter />} />
				</div>

				<div className="dash-menu__btns">
					<NavLink exact className="dash-menu__link" activeClassName="dash-menu__link--active" to={'/dash'}>
						Characters
					</NavLink>
					<NavLink exact className="dash-menu__link" activeClassName="dash-menu__link--active" to={'/dash/options'}>
						Options
					</NavLink>
					<Link className="dash-menu__link" to={'/'} onClick={signOut}>Sign Out</Link>
				</div>
			</section>
		</main>
	);
};

export default Dash;
