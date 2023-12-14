const fs = require('fs'); //Requerir File System
const path = require('path'); //Requerir Path 
const db = require("../database/models"); //Requerir db (modelos)
const { error } = require('console');
const { validationResult } = require("express-validator"); //Requerir express-validator
const { Op } = require("sequelize"); //Requerir sequelize

//variables y constantes JSON
//const productsFilePath = path.join(__dirname, '../data/productsData.json');
//let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

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
                res.render("productDetail", {
                    product: product,
                    usuario: req.session.usuario,
                })
            }).catch(error => {
                console.log(error);
            })
    },

    //Buscar producto
    search: (req, res) => {
        db.Product.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: "%" + req.query.buscar + "%"
                        }
                    }
                ]
            }
        }).then(resultado => {
            let busqueda = req.query.buscar
            /*
            if(req.query.buscar == "") {
                let error = "Por favor buscar algo";
                res.render("buscar", {productos: resultado, errors: error})
            }*/
            res.render("buscar", { 
                productos: resultado,
                busqueda: busqueda 
            });
        }).catch(error => {
            console.log(error);
        })

    },

    //CRUD

    //Mostrar Crear
    create: (req, res) => {
        db.Category.findAll()
            .then(categories => {
                req.session.isAdmin = false;
                if (req.session.usuario && req.session.usuario.first_name == 'Daniel') {
                    req.session.isAdmin = true;
                    res.render("formulario-creacion-producto", { categories });
                } else {
                    res.redirect('/products')
                }

            }).catch(error => {
                console.log(error);
            })
    },

    //Deveolver Crear
    store: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.isEmpty()) {
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
        } else {
            db.Category.findAll()
                .then(categories => {
                    res.render("formulario-creacion-producto",
                        {
                            categories,
                            errors: resultValidation.mapped(),
                            oldData: req.body
                        });
                }).catch(error => {
                    console.log(error);
                })
        }


    },

    //Mostrar Editar
    edit: (req, res) => {
        let id = req.params.id;
        db.Product.findByPk(id)
            .then(productToEdit => {
                req.session.isAdmin = false;
                if (req.session.usuario && req.session.usuario.first_name == 'Daniel') {
                    req.session.isAdmin = true;
                    res.render("formulario-edicion-producto", { productToEdit });
                } else {
                    res.redirect('/products')
                }

            }).catch(error => {
                console.log(error);
            })
    },

    //Devolver Editar
    update: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.isEmpty()) {
            db.Product.update({
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                image: req.file.filename
            }, {
                where: {
                    id: req.params.id,
                }
            }).then(() => {
                return res.redirect('/products')
            })
                .catch(error => console.log(error));

        } else {
            let id = req.params.id
            db.Product.findByPk(id)
                .then(productToEdit => {
                    res.render("formulario-edicion-producto",
                        {
                            productToEdit,
                            errors: resultValidation.mapped(),
                            oldData: req.body
                        });
                }).catch(error => {
                    console.log(error);
                })

        }

    },

    //Devolver Eliminar
    delete: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id,
            }
        }).then(() => {
            return res.redirect('/products')
        })
            .catch(error => res.send(error))
    },

    agregarCarrito: (req, res) => {
        db.Product.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(producto => {
            let usuario = req.session.usuario;
            let idUsuario = usuario.id;
            if(producto && usuario){
                db.Order.create({
                    user_id: idUsuario,
                    product_id: producto.id
                })
            }
            res.redirect('/')
        })
    }
}

module.exports = productController; //Exportar el controlador