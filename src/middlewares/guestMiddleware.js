function guestMiddleware(req, res, next) {
	if (req.session.usuario === undefined) {
		next();
	} else {
		return res.redirect('/user/profile');
	}
}

module.exports = guestMiddleware;