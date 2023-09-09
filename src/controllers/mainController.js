const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controlador = {
    index: (req, res) => {
        res.render('home', {
            products,
        });
    },
    carrito: (req, res) => {
        res.render('productCart')
    }
}

module.exports = controlador;