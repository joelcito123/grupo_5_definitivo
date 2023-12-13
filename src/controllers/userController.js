//const fs = require('fs');
//const path = require('path');
//const bcrypt = require('bcryptjs');
//const db = require("../database/models");

//Aqui comienzan mis cambios
const path = require('path');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require("../database/models");
const { Op } = require("sequelize");
const { log } = require('console');


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
        db.User.findAll({
            where: {
                email: { [Op.eq]: req.body.email }
            }
        })
            .then((userFound) => {
                //console.log("pasando por .then userfound");
                //console.log(userFound);
                if (userFound.length > 0) {

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
                    db.User.create({
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
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let usuarioALoguearse = req.body;
            db.User.findAll({
                where: {
                    email: {
                        [Op.eq]: usuarioALoguearse.email
                    },
                }
            })
                .then(usuario => {
                    if (usuarioALoguearse.email == usuario[0].dataValues.email && bcryptjs.compareSync(req.body.hashed_password, usuario[0].dataValues.hashed_password)) {
                        req.session.usuario = usuario[0].dataValues;
                        if (req.body.remember_user) {
                            res.cookie('emailUsuario', req.body.email, { maxAge: (1000 * 60) * 2 })
                        }
                        res.redirect('/products');
                    } else {
                        console.log('hay algo mal');
                    }
                })
                .catch(error => { console.log(error); })
        } else {
            res.render('login', {
                errors: errors.mapped(),
                oldData: req.body
            })
        }


    },
    profile: (req, res) => {
        console.log(req.cookies.emailUsuario);
        return res.render('userProfile', {
            usuario: req.session.usuario,
        });

    },

    logout: (req, res) => {
        res.clearCookie('emailUsuario')
        req.session.destroy();
        return res.redirect('/');
    },
    edit: (req, res) => {
        let id = req.params.id;
        db.User.findByPk(id)
            .then(usuario => {
                res.redirect("editar-usuario", { usuario });
            }).catch(error => {
                console.log(error);
            })
    },
    update: (req, res) => {
        let resultValidation = validationResult(req);
        if (resultValidation.isEmpty()) {
            db.User.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                profile_image: req.file.filename
            }, {
                where: {
                    id: req.params.id,
                }
            }).then(() => {
                return res.redirect('/user/login')
            })
                .catch(error => console.log(error));

        } else {
            let id = req.params.id;
        db.User.findByPk(id)
            .then(usuario => {
                res.render("editar-usuario", { usuario, errors: resultValidation.mapped(), oldData: req.body });
            }).catch(error => {
                console.log(error);
            })
        }

    },

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