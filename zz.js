const express = require('express');
const path = require('path');
const session = require('express-session');
const cookies = require('cookie-parser');

const app = express();

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
//const adminMiddleware = require('./middlewares/adminMiddleware');

app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));

app.use(cookies());

app.use(userLoggedMiddleware);
//app.use(adminMiddleware);

app.use(express.urlencoded({ extended: false }));

app.use(express.static('./public'));

// Template Engine
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

// Routers
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userrRoutes');
const productsRoutes = require('./routes/productsRoutes');
//const orderRoutes = require('./routes/orderRoutes');


app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/products', productsRoutes)
app.listen(3000, () => console.log('Servidor levantado en el puerto 3000'));