const fs = require('fs');
const path = require('path');
const db = require("../database/models");
const { error } = require('console');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {

    //Listado de todos los productos
    index: (req, res) => {
        db.Product.findAll({
            order: [
                ["id", "ASC"]
            ]
        }).then(products => {
            res.render('products', { products })
        }).catch(error => {
            console.log(error);
        })
    },
    detail: (req, res) => {
        const id = req.params.id;
        db.Product.findByPk(id)
            .then(product => {
                res.render("productDetail", { product: product })
            }).catch(error => {
                console.log(error);
            })
    },

    //CRUD

    //Mostrar Crear
    create: (req, res) => {
        db.Category.findAll()
            .then(categories => {
                res.render("formulario-creacion-producto", { categories });
            }).catch(error => {
                console.log(error);
            })
    },

    //Deveolver Crear
    store: (req, res, next) => {
        db.Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.file.filename,
        }).then(() => {
            res.redirect("/products");
        }).catch((error) => {
            res.send(error)
        });
    },

    edit: (req, res) => {
        const id = req.params.id;
        const productToEdit = products.find(p => p.id == id);

        res.render('formulario-edicion-producto', {
            productToEdit,
        });
    },

    update: (req, res) => {
        // const id = req.params.id;
        // products.forEach((product) => {
        // 	if(product.id == id){
        // 		product.name = req.body.name,
        //         product.price = req.body.price,
        //         product.discount = req.body.discount,
        //         product.category = req.body.category,
        //         product.description = req.body.description
        // 	}
        // });
        // fs.writeFileSync(productsFilePath, JSON.stringify(products));
        db.Product.update({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
        }, {
            where: {
                id: req.params.id,
            }
        });

        res.render("/products");
    },

    delete: (req, res) => {
        // let id = req.params.id;
        // products = products.filter(producto => producto.id != id);
        // fs.writeFileSync(productsFilePath, JSON.stringify(products));
        db.Product.destroy({
            where: {
                id: req.params.id,
            }
        })
        res.redirect("/products");
    }
}

module.exports = productController;