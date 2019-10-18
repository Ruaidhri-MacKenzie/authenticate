import React from 'react';

const Character = ({ character, logIn }) => {
	const { sprite, name, role, level } = character;

	return (
		<button className="char" onClick={e => logIn(character)}>
			<div className="char__sprite">Sprite: {sprite}</div>
			<p className="char__name">{name}</p>
			<p className="char__role">{role}</p>
			<p className="char__level">Level {level}</p>
		</button>
	);
};

const NewCharacter = ({ handleClick }) => {
	return (
		<button name="create" className="new-char" onClick={handleClick}>
			<p className="new-char__text">New Character</p>
		</button>
	);
};

const CharacterList = ({ characters, handleClick, logIn }) => {
	return (
		<div className="char-list">
			{characters && characters.map(character => <Character key={character.name} character={character} logIn={logIn} />)}
			<NewCharacter handleClick={handleClick} />
		</div>
	);
};

export default CharacterList;
