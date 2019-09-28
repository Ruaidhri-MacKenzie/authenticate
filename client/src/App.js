import React from 'react';
import './App.scss';

import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';

const App = () => {
  return (
    <div className="App">
			<Header title="User Authentication" subtitle="Testing user authentication with React" />
			<Main />
			<Footer />
    </div>
  );
};

export default App;
