const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.resolve(__dirname, '../public');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/home.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'));
});
app.get('/productCart', (req, res) => {
    res.sendFile(path.join(__dirname, './views/productCart.html'));
});
app.get('/productDetail', (req, res) => {
    res.sendFile(path.join(__dirname, './views/productDetail.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, './views/register.html'));
});


app.listen(3000, () => {
    console.log('servidor corriendo en el puerto 3000');
});