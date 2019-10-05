import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';

import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Dash from './pages/Dash/Dash';
import Game from './pages/Game/Game';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
	const [user, setUser] = useState(null);
	const AuthRoute = ({ render, ...rest }) => <Route {...rest} render={(user) ? render : () => <Redirect to="/auth" />} />
	const NoAuthRoute = ({ render, ...rest }) => <Route {...rest} render={(!user) ? render : () => <Redirect to="/dash" />} />

  return (
    <div className="App">
			<Header title="User Authentication" subtitle="Testing user authentication with React" />
			<Router>
				<Switch>
					<Route exact path='/' component={Home} />
					<NoAuthRoute exact path='/auth' render={() => <Auth setUser={setUser} />} />
					<AuthRoute path='/dash' render={() => <Dash user={user} setUser={setUser} />} />
					<AuthRoute path='/game' render={() => <Game user={user} />} />
				</Switch>
			</Router>
			<Footer />
    </div>
  );
};

export default App;

// {(user) ? <Redirect from='*' to='/dash' /> : <Redirect from='*' to='/' /> }