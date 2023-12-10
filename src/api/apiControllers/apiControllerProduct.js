const path = require('path');
const db = require('../../database/models');

const productApiControllers = {
    list: (req, res) => {
        /*
        db.Product.findAll({
            include: [{association : "categories"}],,
            
        })
            .then(productos => {
                let resultado = {
                    meta: {
                        status : 200,
                        total: productos.length,
                        url: '/api/products'
                    },
                    data: productos,
                }
                    res.json(resultado);
            })
        */
        db.Product.count({
            include: [{association : "categories"}],
            group: "categories.name"
        }).then(productos => {
            res.json(productos);
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
                        url: "api/products/:id",
                    },
                    data: producto,
                }
                    res.json(resultado);
            })
    },
    categorias: (req, res) => {
        db.Category.findAll()
        .then(categorias => {
            let resultado = {
                meta: {
                    status: 200,
                    total: categorias.length,
                    url: 'api/categories'
                },
                data: categorias
            }
            res.json(resultado)
        })
    },
}

module.exports = productApiControllers;