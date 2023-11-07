const fs = require('fs'); //Requerir File System
const path = require('path'); //Requerir Path
const db = require("../database/models"); //Requerir db (modelos)
const { error } = require('console'); //??

//variables y constantes JSON
const productsFilePath = path.join(__dirname, '../data/productsData.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//Controlador
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

    //Detalle del producto
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

    //Mostrar Editar
    edit: (req, res) => {
        let id = req.params.id;
        db.Product.findByPk(id)
            .then(productToEdit => {
                res.render("formulario-edicion-producto", {productToEdit});
            }).catch(error => {
                console.log(error);
            })            
    },

    //Devolver Editar
    update: (req, res) => {
        db.Product.update({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
        }, {
            where: {
                id: req.params.id,
            }
        }).then(()=> {
            return res.redirect('/products')})            
        .catch(error => res.send(error))
    },

    //Devolver Eliminar
    delete: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id,
            }
        }).then(()=> {
            return res.redirect('/products')})            
        .catch(error => res.send(error))
    }
}

module.exports = productController; //Exportar el controlador