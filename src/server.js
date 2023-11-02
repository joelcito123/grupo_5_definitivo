const express = require('express');
const path = require('path');
const mainRouter = require('./routes/main');
const productRouter = require('./routes/productos');
const userRouter = require ('./routes/usuario');
const methodOverride = require('method-override');
const session = require('express-session');

const app = express();
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
}));

app.set('view engine', 'ejs');
app.set('views', './src/views');


app.use('/', mainRouter); //Ruta menú
app.use('/products', productRouter); //Ruta productos
app.use('/user', userRouter); //Ruta usuarios



app.listen(3000, () => {
    console.log('servidor corriendo en el puerto 3000');
});