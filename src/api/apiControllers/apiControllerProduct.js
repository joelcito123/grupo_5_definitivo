const path = require('path');
const db = require('../../database/models');
const { Op } = require("sequelize");
const sequelize = require("sequelize");

const productApiControllers = {
    list: (req, res) => {
        let detail = "/api/products/" + req.params.id
        db.Product.findAll()
            .then(productos => {
                let resultado = {
                    meta: {
                        status: 200,
                        total: productos.length,
                        url: '/api/products',
                        
                    },
                    data: productos,
                }
                res.json(resultado);
            })
    },
    detail: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: [{ association: "categories" }]
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
        
        // // db.Category.count({
        // //     include: [{ association: "products" }],
        // //     group: "category_id"
        // // })
        // //     .then(productos => {
                
        // //         res.json(productos);
        // //     })
        
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