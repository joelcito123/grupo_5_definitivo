const express = require('express');
const path = require('path');
const mainRouter = require('./routes/main');
const productRouter = require('./routes/productos');
const userRouter = require ('./routes/usuario');

const app = express();
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.set('view engine', 'ejs');
app.set('views', './src/views');


app.use('/', mainRouter);
app.use('/products', productRouter);
app.use('/usuario', userRouter);



app.listen(3001, () => {
    console.log('servidor corriendo en el puerto 3000');
});