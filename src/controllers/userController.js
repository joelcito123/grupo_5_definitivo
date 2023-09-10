const userController = {
    login: (req, res) => {
        res.render('login')
    },
    register: (req ,res) => {
        res.render('register')
    },
    loged: (req, res) => {
        res.send('Test');
    },
    registed: (req, res) => {
        res.send('Otro test');
    }
}

module.exports = userController;