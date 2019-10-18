const characterController = require('../controllers/characterController');
const roleController = require('../controllers/roleController');
const npcController = require('../controllers/npcController');
const itemController = require('../controllers/itemController');
const tilemapController = require('../controllers/tilemapController');

const socketHandler = socket => {
	socket.on('disconnect', reason => console.log("Socket disconnected: " + reason));
	
	// Player commands
	socket.on('logIn', async id => {
		// Read from database, add to player list, start receiving updates
		socket.emit('logIn', true);
	});
	socket.on('logOut', async id => {
		// Remove from player list, stop receiving updates, save to database
		socket.emit('logOut', true);
	});

	socket.on('createCharacter', async data => {
		const { user, role } = data;
		const name = (data.name) ? data.name.trim() : "";
	
		if (!user) {
			console.log("UserId is required");
			return;
		}
		if (!name) {
			console.log("Name is required");
			return;
		}
		if (name.length > 25) {
			console.log("Name is too long");
			return;
		}
		if (name.length < 3) {
			console.log("Name is too short");
			return;
		}
		if (!role) {
			console.log("Role is required");
			return;
		}
	
		const existingName = await characterController.checkExistingName(name);
		if (existingName) {
			console.log("Name already exists");
			socket.emit('createCharacter', false);
			return;
		}
		const result = await characterController.create(data);
		socket.emit('createCharacter', result);
	});
	socket.on('deleteCharacter', async id => {
		const char = await characterController.read(id);
		if (socket.user._id === char.user) {
			const result = await char.delete();
			socket.emit('deleteCharacter', result);
		}
		else {
			console.log("Attempt to delete unowned character");
			socket.emit('deleteCharacter', false);
		}
	});

	// Admin commands
	socket.on('createRole', async data => {
		const name = (data.name) ? data.name.trim() : "";

		if (!name) {
			console.log("Name is required");
			socket.emit('createRole', false);
			return;
		}
		if (name.length > 25) {
			console.log("Name is too long");
			socket.emit('createRole', false);
			return;
		}
		if (name.length < 3) {
			console.log("Name is too short");
			socket.emit('createRole', false);
			return;
		}
		const existingName = await roleController.checkExistingName(name);
		if (existingName) {
			console.log("Name already exists");
			socket.emit('createRole', false);
			return;
		}

		const result = await roleController.create(data);
		socket.emit('createRole', result);
	});
	socket.on('updateRole', async data => {
		const name = (data.name) ? data.name.trim() : "";

		if (name) {
			if (name.length > 25) {
				console.log("Name is too long");
				socket.emit('updateRole', false);
				return;
			}
			if (name && name.length < 3) {
				console.log("Name is too short");
				socket.emit('updateRole', false);
				return;
			}
			const existingName = await roleController.checkExistingName(name);
			if (existingName) {
				console.log("Name already exists");
				socket.emit('updateRole', false);
				return;
			}
		}

		const result = await roleController.update(data);
		socket.emit('updateRole', result);
	});
	socket.on('deleteRole', async id => {
		const result = await roleController.delete(id);
		socket.emit('deleteRole', result);
	});

	socket.on('createNPC', async data => {
		const name = (data.name) ? data.name.trim() : "";

		if (!name) {
			console.log("Name is required");
			socket.emit('createNPC', false);
			return;
		}
		if (name.length > 25) {
			console.log("Name is too long");
			socket.emit('createNPC', false);
			return;
		}
		if (name.length < 3) {
			console.log("Name is too short");
			socket.emit('createNPC', false);
			return;
		}

		const result = await npcController.create(data);
		socket.emit('createNPC', result);
	});
	socket.on('updateNPC', async data => {
		const name = (data.name) ? data.name.trim() : "";

		if (name) {
			if (name.length > 25) {
				console.log("Name is too long");
				socket.emit('updateNPC', false);
				return;
			}
			if (name && name.length < 3) {
				console.log("Name is too short");
				socket.emit('updateNPC', false);
				return;
			}
		}

		const result = await npcController.update(data);
		socket.emit('updateNPC', result);
	});
	socket.on('deleteNPC', async id => {
		const result = await npcController.delete(id);
		socket.emit('deleteNPC', result);
	});

	socket.on('createItem', async data => {
		const name = (data.name) ? data.name.trim() : "";

		if (!name) {
			console.log("Name is required");
			socket.emit('createItem', false);
			return;
		}
		if (name.length > 25) {
			console.log("Name is too long");
			socket.emit('createItem', false);
			return;
		}
		if (name.length < 3) {
			console.log("Name is too short");
			socket.emit('createItem', false);
			return;
		}

		const result = await itemController.create(data);
		socket.emit('createItem', result);
	});
	socket.on('updateItem', async data => {
		const name = (data.name) ? data.name.trim() : "";

		if (name) {
			if (name.length > 25) {
				console.log("Name is too long");
				socket.emit('updateItem', false);
				return;
			}
			if (name && name.length < 3) {
				console.log("Name is too short");
				socket.emit('updateItem', false);
				return;
			}
		}

		const result = await itemController.update(data);
		socket.emit('updateItem', result);
	});
	socket.on('deleteItem', async id => {
		const result = await itemController.delete(id);
		socket.emit('deleteItem', result);
	});
	
	socket.on('createTilemap', async data => {
		const { index, name } = data;

		if (!index) {
			console.log("Index is required");
			socket.emit('createTilemap', false);
			return;
		}

		const existingIndex = await tilemapController.checkExistingIndex(index);
		if (existingIndex) {
			console.log("Index already exists");
			socket.emit('createTilemap', false);
			return;
		}

		if (name && name.length > 25) {
			console.log("Name is too long");
			socket.emit('createTilemap', false);
			return;
		}

		const result = await tilemapController.create(data);
		socket.emit('createTilemap', result);
	});
	socket.on('updateTilemap', async data => {
		const name = (data.name) ? data.name.trim() : "";

		if (name) {
			if (name.length > 25) {
				console.log("Name is too long");
				socket.emit('updateTilemap', false);
				return;
			}
			if (name && name.length < 3) {
				console.log("Name is too short");
				socket.emit('updateTilemap', false);
				return;
			}
		}

		const result = await itemController.update(data);
		socket.emit('updateTilemap', result);
	});
	socket.on('deleteTilemap', async id => {
		const result = await itemController.delete(id);
		socket.emit('deleteTilemap', result);
	});
};

module.exports = socketHandler;
