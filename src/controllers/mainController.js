const controlador = {
    index: (req, res) => {
        res.render('home');
    },
    carrito: (req, res) => {
        res.render('productCart')
    }
}

module.exports = controlador;