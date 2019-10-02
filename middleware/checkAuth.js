const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../keys');

module.exports = (req, res, next) => {
	try {
		const decoded = jwt.verify(req.headers.authorization.split(" ")[1], JWT_KEY);
		req.userData = decoded;
		next();
	}
	catch(err) {
		res.status(401).json({ err: "Auth failed."});
	}
};
