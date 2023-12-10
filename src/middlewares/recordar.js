function recordar(req, res, next){
    next();

    if(req.cookies.recordar != undefined && req.session.usuario == undefined){
        let usuarioALoguearse = req.body;
        db.User.findAll({
            where: {
                email: {
                    [Op.eq]: usuarioALoguearse.email
                },
            }
        })
        .then(usuario => {
            if(usuario[0].dataValues.email == req.cookies.recordar){
                req.session.usuario = usuario[0].dataValues;
            } else {
                console.log('hay algo mal');
            }
        })
        .catch(error => {console.log(error);})
    }
}

module.exports = recordar;