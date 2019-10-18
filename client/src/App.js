import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import './App.scss';

import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Dash from './pages/Dash/Dash';
import Game from './pages/Game/Game';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
	const [showLogin, setShowLogin] = useState(false);

	const [user, setUser] = useState(null);
	const [character, setCharacter] = useState(null);
	
	// Check if session cookie already exists
	useEffect(() => {
		axios.get('/auth')
		.then(response => {
			if (response) signIn(response.data);
		})
		.catch(err => console.log(err));
	}, []);

	const [socket, setSocket] = useState(null);
	useEffect(() => {
		if (socket) {
			socket.on('connect', () => {
				console.log("Connected to Socket IO");
			});
			
			socket.on('disconnect', () => {
				console.log("Disconnected from Socket IO");
			});
		}
	}, [socket]);

	const signIn = user => {
		setUser(user);
		setSocket(socketIOClient('http://localhost:2000'));
	};

	const signOut = () => {
		axios.post('/auth/signout')
		.then(response => {
			setUser(null);
			setCharacter(null);
			socket.disconnect();
			setSocket(null);
		})
		.catch(err => console.log(err));
	};

	const logIn = id => {
		// get character data from server
		setCharacter(true);
	}

	const logOut = () => {
		setCharacter(null);
	}

	const renderMain = () => {
		if (user && character) return <Game user={user} character={character} logOut={logOut} />
		else if (user) return <Dash user={user} signOut={signOut} logIn={logIn} />
		else if (showLogin) return <Auth setShowLogin={setShowLogin} signIn={signIn} />
		else return <Home setShowLogin={setShowLogin} />
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
