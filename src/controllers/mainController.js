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
        res.render('productCart');
    },
    
}

module.exports = controlador;