const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')

const usersFilePath = path.join(__dirname, '../data/usersData.json');
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const userController = {
    login: (req, res) => {
        res.render('login')
    },
    register: (req ,res) => {
        res.render('register')
    },
    loged: (req, res) => {
        let usuario;
        if (usuarios == "") {
            usuario = [];
        } else {
            usuario = usuarios;
        };
        
        for (let i = 0; i < usuarios.length; i++) {
            if (req.body.email == usuario[i].email && bcrypt.compareSync(req.body.password, usuario[i].password)){
                res.send('Te encontré');
            }
        }

        res.send('error');
    },
    registed: (req, res) => {
        const nuevoUsuario = req.body;
        const usuario = {
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            image: req.file.filename,
            id: new Date().getTime(),
        }

        usuarios.push(usuario);
        
        fs.writeFileSync(usersFilePath, JSON.stringify(usuarios));

        res.send('registrado');
    }
}

module.exports = userController;