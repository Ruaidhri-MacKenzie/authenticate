import React from 'react';
import './App.scss';

import { ContextProvider } from './state';
import SocketHandler from './sockets';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const App = () => {
  return (
    <div className="App">
			<ContextProvider>
				<SocketHandler>
					<Header title="User Authentication" subtitle="Testing user authentication with React" />
					<Main />
					<Footer />
				</SocketHandler>
			</ContextProvider>
    </div>
  );
};

export default App;
