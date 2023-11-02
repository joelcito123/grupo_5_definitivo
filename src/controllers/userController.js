const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require("../database/models");

const usersFilePath = path.join(__dirname, '../data/usersData.json');
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const userController = {
    login: (req, res) => {
        /* prueba de tablas
        db.User.findAll({
            include: ["orders"]
        }).then(users => {
            res.send(users);
        })
        */
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
    }
}

module.exports = userController;