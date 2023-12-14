//const fs = require('fs');
//const path = require('path');
const db = require("../database/models");


//const productsFilePath = path.join(__dirname, '../data/productsData.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controlador = {
    index: (req, res) => {
        db.Product.findAll({
            order: [
                ["id", "ASC"]
            ]
        }).then(products => {
            res.render('home', { products })
        }).catch(error => {
            console.log(error);
        })
    },
    carrito: (req, res) => {
        let usuario = req.session.usuario;
        let usuarioId = usuario.id
        db.User.findOne({
            where: {
                id: usuarioId
            }
        })
            .then(usuarioEncontrado => {
                if (usuarioEncontrado) {
                    db.Order.findAll({
                        include: [{ association: "productos" }],
                        where: {
                            user_id: usuarioEncontrado.id,
                        },

                    })
                        .then(ordenDelUsuario => {
                            res.render('productCart', { orden: ordenDelUsuario });
                        })
                }
            })
            .catch(error => {
                console.log(error);
            })
    },
    quienesSomos: (req, res) => {
        res.render('quienesSomos')
    },
    eliminarDelCarrito: (req, res) => {
        let ordenId = req.params.id;

        db.Order.destroy({
            where: {
                id: ordenId
            }
        })
        .then(eliminarOrden => {
            if (eliminarOrden){
                res.redirect('/productCart')
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
}


module.exports = controlador;