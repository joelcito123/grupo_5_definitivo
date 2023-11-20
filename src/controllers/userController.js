//const fs = require('fs');
//const path = require('path');
//const bcrypt = require('bcryptjs');
//const db = require("../database/models");

//Aqui comienzan mis cambios
const path = require('path');
const bcryptjs = require('bcryptjs');
const {	validationResult } = require('express-validator');
const db = require('../database/models');
const { Op } = require("sequelize");

const Users = db.User;
const userController = {

    register: (req, res) => {
		return res.render('register');
	},

    processRegister: (req, res) => {
        
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
        Users.findAll({
            where: {
                email: { [Op.eq]: req.body.email }
            }
        })
        .then((userFound) => {
            //console.log("pasando por .then userfound");
            //console.log(userFound);
            if (userFound.length>0) {
                
                //console.log("dentro del if() userfound");
                 return res.render('register', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                });
            } else {
                Users.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    hashed_password: bcryptjs.hashSync(req.body.hashed_password, 10),
                    profile_image: req.file.filename,
                    email: req.body.email,
    
                })
                return res.redirect('/user/login');
            }
        })
	},
    //para Loguearse***********************************************************
    login: (req, res) => {
		return res.render('login');
	},
    loginProcess: (req, res) => {
        let error = validationResult(req);
        if(!error.isEmpty()){
            res.render('login')
        }
        Users.findAll({
            where: {
                email: {[Op.eq]: req.body.email}
            }
        })
        .then(user => {
            if (user.length>0) {
                const userF = user[0];
                console.log("if(userloginlengt ) si encontro un user");
                let isOkThePassword = bcryptjs.compareSync(req.body.hashed_password, userF.hashed_password);   
                if(isOkThePassword){
                    delete userF.hashed_password;
				    req.session.userLogged = userF;
                    if(req.body.remember_user) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60)*60 })
                    }
                    return res.redirect('/user/profile');
                } else {
                    return res.render('login', {
                        errors: {
                            email: {
                                msg: 'Las credenciales son inválidas'
                            }
                        }
                    });
                }
            } else {
                console.log("en el  else");
                return res.render('login', {
                    errors: {
                        email: {
                            msg: 'No se encuentra este email en nuestra base de datos'
                        }
                    }
                });
            }
        })
	},
    profile: (req, res) => {
		return res.render('userProfile', {
			user: req.session.userLogged
		});
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}

}

// Codigo anterior 
/*
const userControllerOLD = {
    login: (req, res) => {
        /* prueba de tablas
        db.User.findAll({
            include: ["orders"]
        }).then(users => {
            res.send(users);
        })
        //
        res.render('login')
    },
    register: (req ,res) => {
        res.render('register')
    },
    loged: (req, res) => {
        let users;
        if (usuarios == "") {
            users = [];
        } else {
            users = usuarios;
        };

        let usuarioALoguearse;
        
        for (let i = 0; i < users.length; i++) {
            if (req.body.email == users[i].email && bcrypt.compareSync(req.body.password, users[i].password)){
                res.redirect('/')
                usuarioALoguearse = users[i];
            }
        }

        req.session.usuarioLogueado = usuarioALoguearse;

        res.redirect('login');
    },
    registed: (req, res) => {
        
        let usuario = {
            id: new Date().getTime(),
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            image: req.file.filename,
        }
        usuarios.push(usuario);
        
        fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, ' '));

        res.redirect('login');
    },
    profile: (req, res) => {
        res.render('userProfile')
    },
	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
}*/

module.exports = userController;