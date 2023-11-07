const express = require('express'); //Requerir Express
const path = require('path'); //Requerir Path
const mainRouter = require('./routes/main'); //Requerir Rutas Main
const productRouter = require('./routes/productos'); //Requerir Rutas Products
const userRouter = require ('./routes/usuario'); //Requerir Rutas Users
const methodOverride = require('method-override'); //Requerir MethodOverride
const session = require('express-session'); //Requerir Session

const app = express(); //Ejecutar express
const publicPath = path.resolve(__dirname, '../public'); //Constante para archivos estáticos
app.use(express.static(publicPath)); //Archivos estáticos
app.use(methodOverride('_method')); //Usar methodOverride
app.use(express.urlencoded({ extended: false })); //Para las rutas POST, PUT y DELETE
app.use(express.json()); //JSON
//Iniciar session
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
}));

app.set('view engine', 'ejs'); //Para usar -->
app.set('views', './src/views'); // --> EJS


app.use('/', mainRouter); //Ruta menú
app.use('/products', productRouter); //Ruta productos
app.use('/user', userRouter); //Ruta usuarios


//Llamar al puerto 3000
app.listen(3000, () => {
    console.log('servidor corriendo en el puerto 3000');
});