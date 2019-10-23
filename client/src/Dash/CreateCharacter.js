import React, { useState } from 'react';
import Loading from '../components/Loading/Loading';
import SpritePreview from '../components/SpritePreview/SpritePreview';

import useGlobalState from '../App/state';

const Role = ({ role, handleClick }) => {
	const { _id, sprite, name } = role;
	return (
		<div className="role" data-id={_id} onClick={handleClick}>
			<SpritePreview className="role__sprite" sprite={sprite} />
			<p className="role__name">{name}</p>
		</div>
	);
};

const RoleList = ({ roles, loadingDash, handleClick }) => {
	const renderRoles = () => {
		if (loadingDash) return <Loading className="role-list__loading" />
		return (
			<>
				{roles && roles.map(role => <Role key={role.name} role={role} handleClick={handleClick} />)}
			</>
		);
	};

	return (
		<div className="role-list">
			{renderRoles()}
		</div>
	);
};

const CreateCharacter = () => {
	const [{ socket, roles, loadingDash }] = useGlobalState();

	const [error, setError] = useState(null);
	const [inputs, setInputs] = useState({ name: "", role: "" });

	const handleChange = e => setInputs({ ...inputs, [e.target.name]: e.target.value });
	const handleClick = e => {
		if (e.currentTarget.classList.contains("role--active")) {
			e.currentTarget.classList.remove("role--active");
			setInputs({ ...inputs, role: "" });
			return;
		}

		const activeRole = document.querySelector(".role--active");
		if (activeRole) activeRole.classList.remove("role--active");
		if (e.currentTarget.classList.contains("role")) e.currentTarget.classList.add("role--active");
		setInputs({ ...inputs, role: e.currentTarget.dataset.id });
	};
	const handleSubmit = e => {
		e.preventDefault();
		if (verifyInputs(inputs)) socket.emit('createCharacter', {name: inputs.name.trim(), role: inputs.role});
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

	return (
		<form className="create-char" onSubmit={handleSubmit}>
			<input className="create-char__input" type="text" name="name" placeholder="Name" value={inputs.name} onChange={handleChange} />
			<RoleList roles={roles} loadingDash={loadingDash} handleClick={handleClick} />
			{error && <p className="create-char__error">{error}</p>}
			<button className="create-char__submit">Create Character</button>
		</form>
	);
};

export default CreateCharacter;
