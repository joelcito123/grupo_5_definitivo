function userLoggedMiddleware(req, res, next) {
	res.locals.estaLogueado = false;

	if (req.session.usuario) {
		res.locals.estaLogueado = true;
		res.locals.usuario = req.session.usuario;
	}

	
	next();
}

module.exports = userLoggedMiddleware;