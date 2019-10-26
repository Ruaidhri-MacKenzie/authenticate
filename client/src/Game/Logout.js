import React from 'react';
import useGlobalState from '../App/state';

const Logout = ({ setMenuView }) => {
	const [{ socket, player }] = useGlobalState();
	const logOut = e => socket.emit('logOut', player._id);

	return (
		<div className="logout">
			<p className="logout__text">Are you sure you'd like to log out?</p>
			<p className="logout__text">Remember that your character will remain in game until their health fully regenerates.</p>
			<button className="logout__btn" onClick={logOut}>Yes, Log Out</button>
			<button className="logout__btn" onClick={e => setMenuView('inventory')}>Back to Game</button>
		</div>
	);
};

export default Logout;
