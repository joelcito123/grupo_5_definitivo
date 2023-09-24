const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {
    index: (req, res) => {
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
    },
    store: (req, res) => {
        const productToCreate = req.body;
        const imageProduct = {
            ...productToCreate,
            image: req.file.filename,
            id: new Date().getTime(),
        };
        products.push(imageProduct);

        fs.writeFileSync(productsFilePath, JSON.stringify(products))

        res.send('Creaste un nuevo producto');
    },
    update: (req, res) => {
        const id = req.params.id;
        const productToEdit = products.find(producto => producto.id == id);

        const producta = req.body;
        products.push(producta)
        products.pop(productToEdit);
        const datosJson = JSON.stringify(products);

        fs.writeFileSync(productsFilePath, datosJson);
        res.send('producto editado');
    },
    delete: (req, res) => {
        const id = +req.params.id;
        const productToDelete = products.filter(producto => producto.id !== id);

        fs.writeFileSync(productsFilePath, JSON.stringify(productToDelete));
        res.send('Eliminé el producto');
    }
}

module.exports = productController;