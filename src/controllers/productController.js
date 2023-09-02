const productController = {
    detalle: (req, res) => {
        res.render('productDetail')
    },
    edicion: (req, res) => {
        res.render('formulario-edicion-producto');
    },
    creacion: (req, res) => {
        res.render('formulario-creacion-producto');
    },
}

module.exports = productController;