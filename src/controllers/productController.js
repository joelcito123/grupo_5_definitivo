const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {
    index: (req ,res) => {
        res.render('products', {
            products,
        });
    },
    detail: (req, res) => {
        const id = req.params.id;
        const product = products.find(p => p.id == id);

        res.render('productDetail', {
            product,
        });
    },
    create: (req, res) => {
        res.render('formulario-creacion-producto');
    },
    edit: (req, res) => {
        const id = req.params.id;
        const productToEdit = products.find(p => p.id == id);
        res.render('formulario-edicion-producto', {
            productToEdit,
        });
    }
}

module.exports = productController;