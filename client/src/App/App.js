import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import './App.scss';

import Home from '../Home/Home';
import Auth from '../Auth/Auth';
import Dash from '../Dash/Dash';
import Game from '../Game/Game';

import Header from './Header';
import Footer from './Footer';

const App = () => {
	const [socket, setSocket] = useState(null);
	const [user, setUser] = useState(null);
	const [player, setPlayer] = useState(null);
	const [characters, setCharacters] = useState(null);
	const [showAuth, setShowAuth] = useState(false);

	// Check if session cookie already exists
	useEffect(() => {
		axios.get('/auth')
		.then(response => {
			if (response) signIn(response.data);
		})
		.catch(err => console.log(err));
	}, []);

	// Connect to socket server if signed in
	useEffect(() => {
		if (socket) {
			socket.on('connect', () => console.log("Connected to Game Server"));
			socket.on('disconnect', () => console.log("Disconnected from Game Server"));

			socket.on('getCharacters', characters => setCharacters(characters));
			socket.on('logIn', player => {
				if (player) setPlayer(player);
			});
			socket.on('logOut', success => {
				if (success) setPlayer(null);
			});
		}
	}, [socket]);

	// Get characters once signed in
	useEffect(() => {
		if (user && socket) socket.emit('getCharacters');
	}, [user, socket]);

	const signIn = user => {
		setUser(user);
		setSocket(socketIOClient('http://localhost:2000'));
	};

	const signOut = () => {
		axios.post('/auth/signout')
		.then(response => {
			setUser(null);
			setPlayer(null);
			socket.disconnect();
			setSocket(null);
		})
		.catch(err => console.log(err));
	};

	const createCharacter = ({ name, role }) => socket.emit('createCharacter', {userId: user._id, name: name.trim(), role});
	const logIn = id => socket.emit('logIn', id);
	const logOut = id => socket.emit('logOut', id);

	const renderMain = () => {
		if (user && player) return <Game username={user.username} player={player} logOut={logOut} />
		else if (user) return <Dash user={user} characters={characters} signOut={signOut} logIn={logIn} createCharacter={createCharacter} />
		else if (showAuth) return <Auth setShowAuth={setShowAuth} signIn={signIn} />
		else return <Home setShowAuth={setShowAuth} />
	};

  return (
    <div className="App">
			<Header title="User Authentication" subtitle="Testing user authentication with React" />
			{renderMain()}
			<Footer />
    </div>
  );
};

export default App;
