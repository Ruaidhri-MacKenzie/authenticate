import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
	showAuth: false,
	user: null,
	socket: null,
	characters: null,
	roles: null,
	loadingDash: false,
	player: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'showAuth': return { ...state, showAuth: true };
		case 'hideAuth': return { ...state, showAuth: false };

		case 'signIn': return { ...state, socket: action.socket, user: action.user, loadingDash: true };
		case 'signOut': return { ...state, socket: null, user: null };
		
		case 'getDashInfo': return { ...state, characters: action.characters, roles: action.roles, loadingDash: false };
		
		case 'createCharacter': return { ...state, characters: [...state.characters, action.character] };
		case 'deleteCharacter': return { ...state, characters: state.characters.filter(character => character._id !== action.id) };
		
		case 'logIn': return { ...state, player: action.player };
		case 'logOut': return { ...state, player: null };

		default: return state;
	}
};

const Context = createContext();

export const ContextProvider = ({ children }) => {
	const contextReducer = useReducer(reducer, initialState);

	return (
		<Context.Provider value={contextReducer}>
			{children}
		</Context.Provider>
	);
};

export const useGlobalState = () => useContext(Context);
export default useGlobalState;
