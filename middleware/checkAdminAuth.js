module.exports = (req, res, next) => {
	if(req.isAuthenticated()) {
		// Check if user is an admin
		return next();
	}
	else {
		res.redirect('/auth');
	}
};
