const fs = require('fs');
const path = require('path');

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
        res.send('logeado');
    },
    registed: (req, res) => {
        const nuevoUsuario = req.body;
        const usuarioConImagen = {
            ...nuevoUsuario,
            image: req.file.filename,
            id: new Date().getTime(),
        }

        usuarios.push(usuarioConImagen);
        
        fs.writeFileSync(usersFilePath, JSON.stringify(usuarios));

        res.send('registrado');
    }
}

module.exports = userController;