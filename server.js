const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.resolve(__dirname, 'public');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
})
app.listen(3000, () => {
    console.log('servidor corriendo en el puerto 3000');
});