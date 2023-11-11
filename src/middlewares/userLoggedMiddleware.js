const db = require('../database/models');
const { Op } = require("sequelize");
//const User = require('../database/models/User');
const Users = db.User

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;
	let emailInCookie = req.cookies.userEmail;
	let userFromCookie = Users.findAll({
		where: {
			email: {[Op.eq]: emailInCookie}
		}
	})
	if (userFromCookie > 0) {
		req.session.userLogged = userFromCookie[0];
	}
	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}
	next();
}

module.exports = userLoggedMiddleware;