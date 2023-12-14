//const fs = require('fs');
//const path = require('path');
const db = require("../database/models");
const { forEach } = require("../middlewares/validateCreateProduct");


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
                if (eliminarOrden) {
                    res.redirect('/productCart')
                }
            })
            .catch(error => {
                console.log(error);
            })
    },
    cantidadProducto: (req, res) => {
        let cantidad = req.body.cantidadDelProducto;
        let idProducto = req.params.productoId;
        db.Product.findOne({
            where: {
                id: idProducto,
            }
        })
            .then(producto => {
                if (cantidad > 1) {
                    let usuario = req.session.usuario;
                    let idUsuario = usuario.id;
                    let arrayProducto = [producto];
                    for (let i = 0; i < arrayProducto.length + 1; i++) {
                        if (producto && usuario) {

                            db.Order.create({
                                user_id: idUsuario,
                                product_id: producto.id
                            })
                        }
                    }
                }
                res.redirect('/productCart')
            })
    },
    ordenarYa: (req, res) => {
        res.render('ordenLista')
    }
}

module.exports = controlador;