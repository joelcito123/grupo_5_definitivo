const path = require('path');
const db = require('../../database/models');

const productApiControllers = {
    list: (req, res) => {
        db.Product.findAll({
            include: [{association : "categories"}]
        })
            .then(productos => {
                let resultado = {
                    meta: {
                        status : 200,
                        total: productos.length,
                        url: 'api/products'
                    },
                    data: productos
                }
                    res.json(resultado);
            })
    },
    detail: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: [{association : "categories"}]
        })
            .then(producto => {
                let resultado = {
                    meta: {
                        status: 200,
                        total: producto.length,
                        url: "api/products/:id"
                    },
                    data: producto
                }
                    res.json(resultado);
            })
    }
}

module.exports = productApiControllers;