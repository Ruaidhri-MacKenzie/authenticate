const auth = {};

auth.checkAuth = (req, res, next) => (req.isAuthenticated()) ? next() : res.status(401).json(null);
auth.checkNoAuth = (req, res, next) => (!req.isAuthenticated()) ? next() : res.status(403).json(null);
auth.checkAdminAuth = (req, res, next) => (req.isAuthenticated() && req.user.admin) ? next() : res.status(401).json(null);

module.exports = auth;
