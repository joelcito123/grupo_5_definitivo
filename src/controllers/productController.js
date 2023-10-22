const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

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

        res.redirect("/products");
    },
    update: (req, res) => {
        const id = req.params.id;
		products.forEach((product) => {
			if(product.id == id){
				product.name = req.body.name,
                product.price = req.body.price,
                product.discount = req.body.discount,
                product.category = req.body.category,
                product.description = req.body.description
			}
		});
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
        res.redirect("/products");
    },
    delete: (req, res) => {
        let id = req.params.id;
        products = products.filter(producto => producto.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
        res.redirect("/products");
    }
}

module.exports = productController;