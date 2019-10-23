import React from 'react';
import Loading from '../components/Loading/Loading';
import SpritePreview from '../components/SpritePreview/SpritePreview';
import useGlobalState from '../App/state';

const Character = ({ socket, character }) => {
	const { _id, sprite, name, role, level } = character;
	
	const logIn = e => socket.emit('logIn', _id);
	const deleteCharacter = e => {
		e.stopPropagation();
		if (window.confirm("Are you sure you want to delete " + name + "?")) {
			socket.emit('deleteCharacter', _id);
		}
	};
	
	return (
		<div className="char" onClick={logIn}>
			<button className="char__delete" onClick={deleteCharacter}>x</button>
			<div className="char__sprite"></div>
			<SpritePreview className="char__sprite" sprite={sprite || role.sprite} />
			<p className="char__name">{name}</p>
			<p className="char__role">{role.name}</p>
			<p className="char__level">Level {level}</p>
		</div>
	);
};

const NewCharacter = ({ setView }) => {
	return (
		<div className="new-char" onClick={e => setView("create")}>
			<p className="new-char__text">New Character</p>
		</div>
	);
};

const CharacterList = ({ setView }) => {
	const [{ socket, characters, loadingDash }] = useGlobalState();

	return (
		<div className="char-list">
		{loadingDash && <Loading className="char-list__loading" />}
		{characters && characters.map(character => <Character key={character.name} socket={socket} character={character} />)}
		{(!characters || (characters && characters.length < 3)) && <NewCharacter setView={setView} />}
		</div>
	);
};

export default CharacterList;
