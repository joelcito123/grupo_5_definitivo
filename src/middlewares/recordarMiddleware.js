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
            next();
        })
        .catch(err => {
            console.error(err);
            next();
        });
    } else {
        next();
    }
}

module.exports = buscarUsuarioCookie;