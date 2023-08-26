const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.resolve(__dirname, '../public');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render(path.join(__dirname, './views/home'));
});
app.get('/login', (req, res) => {
    res.render(path.join(__dirname, './views/login'));
});
app.get('/productCart', (req, res) => {
    res.render(path.join(__dirname, './views/productCart'));
});
app.get('/productDetail', (req, res) => {
    res.render(path.join(__dirname, './views/productDetail'));
});
app.get('/register', (req, res) => {
    res.render(path.join(__dirname, './views/register'));
});

app.set('view engine', 'ejs')


app.listen(3000, () => {
    console.log('servidor corriendo en el puerto 3000');
});