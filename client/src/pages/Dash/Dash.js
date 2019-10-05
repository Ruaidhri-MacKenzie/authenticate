import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import './Dash.scss';

import Characters from '../../components/Characters/Characters';
import Options from '../../components/Options/Options';

const Dash = ({ signOut, user }) => {
	const handleSubmit = e => e.preventDefault();

	return (
		<main className="dash">
			<form className="dash-menu" onSubmit={handleSubmit}>
				<h1 className="dash-menu__title">Dashboard</h1>
				<h3 className="dash-menu__username">{user.username}</h3>

				<Route exact path="/dash" render={() => <Characters characters={user.characters} />} />
				<Route exact path="/dash/options" render={() => <Options />} />

				<div className="dash-menu__btns">
					<NavLink exact className="dash-menu__link" activeClassName="dash-menu__link--active" to={'/dash'}>
						Characters
					</NavLink>
					<NavLink exact className="dash-menu__link" activeClassName="dash-menu__link--active" to={'/dash/options'}>
						Options
					</NavLink>
					<Link className="dash-menu__link" to={'/'} onClick={signOut}>Sign Out</Link>
				</div>
			</form>
		</main>
	);
};

export default Dash;
