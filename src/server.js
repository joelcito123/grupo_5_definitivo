const express = require('express');
const path = require('path');
const mainRouter = require('./routes/main');
const productRouter = require('./routes/productos');
const userRouter = require ('./routes/usuario')

const app = express();
const publicPath = path.resolve(__dirname, '../public');

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static(publicPath));

app.use('/', mainRouter)
app.get('/login', userRouter);
app.use('/productCart', mainRouter);
app.get('/productDetail', productRouter);
app.get('/register', userRouter);



app.listen(3000, () => {
    console.log('servidor corriendo en el puerto 3000');
});