const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');

const app = express();

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
}));
app.use(cookies());

app.use(userLoggedMiddleware);

app.use(express.static('./public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Template de ejs

app.set('view engine', 'ejs');
app.set('views', './src/views');

//Rutas
const mainRouter = require('./routes/main');
const productRouter = require('./routes/productos');
const userRouter = require ('./routes/usuario');

app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/products', productRouter);

// Error 404
app.use((req, res, next) => {
    res.status(404).render('no-encontrado');
})

app.listen(3000, () => {
    console.log('servidor corriendo en el puerto 3000');
});