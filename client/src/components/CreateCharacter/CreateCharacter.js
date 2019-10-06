import React, { useState } from 'react';
import './CreateCharacter.scss';

const CreateCharacter = ({ user, socket }) => {
	const [error, setError] = useState(null);

	const [inputs, setInputs] = useState({ name: "", role: "" });
	const { name, role } = inputs;
	
	const handleChange = e => setInputs({ ...inputs, [e.target.name]: e.target.value });
	const handleSubmit = e => {
		e.preventDefault();
		if (!verifyInputs({name, role})) return;
		sendData({name, role});
	};
	
	const verifyInputs = ({ name, role }) => {
		name = name.trim();
		if (!name) {
			setError("Name is required");
			return false;
		}
		else if (name.length > 25) {
			setError("Name is too long");
			return false;
		}
		else if (name.length < 3) {
			setError("Name is too short");
			return false;
		}
		else if (!role) {
			setError("Role is required");
			return false;
		}
		else {
			return true;
		}
	};

	const sendData = ({ name, role }) => {
		name = name.trim();
		socket.emit('createCharacter', {userId: user._id, name, role});
	};

	return (
		<form className="create-char" onSubmit={handleSubmit}>
			<input className="create-char__input" type="text" name="name" placeholder="Name" value={name} onChange={handleChange} />
			<input className="create-char__input" type="text" name="role" placeholder="Role" value={role} onChange={handleChange} />
			{error && <p className="create-char__error">{error}</p>}
			<button className="create-char__submit">Submit</button>
		</form>
	);
};

export default CreateCharacter;
