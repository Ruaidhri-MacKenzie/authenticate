import React, { useState } from 'react';
import './App.scss';

import Header from './Header/Header';
import Auth from './Auth/Auth';
import Main from './Main/Main';
import Footer from './Footer/Footer';

const App = () => {
	const [token, setToken] = useState(null);

	const renderMain = () => {
		if (token) return <Main token={token} />
		else return <Auth setToken={setToken} />
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
