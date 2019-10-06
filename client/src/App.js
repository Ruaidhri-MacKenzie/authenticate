import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import './App.scss';

import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Dash from './pages/Dash/Dash';
import Game from './pages/Game/Game';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const AuthRoute = ({ auth, render, ...rest }) => <Route {...rest} render={(auth) ? render : () => <Redirect to="/auth" />} />
const NoAuthRoute = ({ auth, render, ...rest }) => <Route {...rest} render={(!auth) ? render : () => <Redirect to="/dash" />} />

const App = () => {
	const [user, setUser] = useState(null);
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
		axios.post('http://localhost:2000/auth/signout');
		socket.disconnect();
		setUser(null);
		setSocket(null);
	};

  return (
    <div className="App">
			<Header title="User Authentication" subtitle="Testing user authentication with React" />
			<Router>
				<Switch>
					<Route exact path='/' component={Home} />
					<NoAuthRoute exact path='/auth' auth={!!user} render={() => <Auth signIn={signIn} />} />
					<AuthRoute path='/dash' auth={!!user} render={() => <Dash signOut={signOut} user={user} />} />
					<AuthRoute path='/game' auth={!!user} render={() => <Game user={user} />} />
				</Switch>
			</Router>
			<Footer />
    </div>
  );
};

export default App;
