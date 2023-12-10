const express = require('express'); //Requerir express
const path = require('path'); //Requerir Path
const methodOverride = require('method-override'); //Requerir method-override
const session = require('express-session'); //Requerir express-sessión
const cookies = require('cookie-parser'); //Requerir cookie-parser

const app = express(); //Función express

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

//Apis
const apiProductsRouter = require("./api/apiRoutes/apiProductRoutes");
const apiUsersRouter = require("./api/apiRoutes/apiUsersRoutes");

app.use("/api", apiProductsRouter);
app.use("/api", apiUsersRouter);
// Error 404
app.use((req, res, next) => {
    res.status(404).render('no-encontrado');
})

app.listen(3000, () => {
    console.log('servidor corriendo en el puerto 3000');
});