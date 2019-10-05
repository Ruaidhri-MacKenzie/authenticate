import React from 'react';
import { Link } from 'react-router-dom';

import './Characters.scss';

const Character = ({ character }) => {
	const { sprite, name, role, level } = character;

	return (
		<Link className="char__link" to={"/game/" + name}>
			<div className="char">
				<div className="char__sprite">Sprite: {sprite}</div>
				<p className="char__name">{name}</p>
				<p className="char__role">{role}</p>
				<p className="char__level">Level {level}</p>
			</div>
		</Link>
	);
};
const Characters = ({ characters }) => {
	return (
		<div className="chars">
			{characters.map(character => <Character key={character.name} character={character} />)}
		</div>
	);
};

export default Characters;