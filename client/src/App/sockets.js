import React, { useEffect, useCallback } from 'react';
import useGlobalState from './state';

const SocketHandler = (props) => {
	const [{ socket }, dispatch] = useGlobalState();

	const socketHandler = useCallback(socket => {
		socket.on('connect', () => console.log("Connected to Game Server"));
		socket.on('disconnect', () => console.log("Disconnected from Game Server"));

		socket.on('getDashInfo', ({ characters, roles }) => {
			if (characters && roles) dispatch({ type: 'getDashInfo', characters, roles });
		});
		socket.on('createCharacter', character => {
			if (character) dispatch({ type: 'createCharacter', character });
		});
		socket.on('deleteCharacter', id => {
			if (id) dispatch({ type: 'deleteCharacter', id });
		});
		socket.on('logIn', player => {
			if (player) dispatch({ type: 'logIn', player });
		});
		socket.on('logOut', success => {
			if (success) dispatch({ type: 'logOut' });
		});
	}, []);

	// Connect to socket server if signed in
	useEffect(() => {
		if (socket) socketHandler(socket);
	}, [socket]);

	return (
		<>
			{props.children}
		</>
	);
};

export default SocketHandler;
