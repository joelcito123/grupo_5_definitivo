const db = require("../database/models");
const { Op } = require("sequelize");

function buscarUsuarioCookie(req, res, next){
    const usuarioEmail = req.cookies.emailUsuario;
    
    if(usuarioEmail){
        db.User.findOne({
            where: {
                email: {
                    [Op.eq]: usuarioEmail
                }
            }
        })
        .then(usuario => {
            if (usuario) {
                req.session.usuario = usuario.dataValues;
            }
            next(); // Asegúrate de llamar a 'next()' después de la operación asíncrona
        })
        .catch(err => {
            console.error(err);
            next(); // Manejo de errores: llama a 'next()' en caso de error
        });
    } else {
        next(); // Llama a 'next()' si no hay correo electrónico en la cookie
    }
}

module.exports = buscarUsuarioCookie;