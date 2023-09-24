const fs = require('fs');

// Datos que deseas escribir en el archivo JSON
const nuevosDatos = {
  nombre: 'Hola como estas',
  precio: 99.99,
  categoria: 'Nueva Categoría',
  descripcion: 'Nueva Descripción',
};

// Ruta al archivo JSON que deseas sobreescribir
const archivoJson = 'prueba.json';

// Convierte los nuevos datos a formato JSON
const datosJson = JSON.stringify(nuevosDatos);

// Sobreescribe el archivo JSON con los nuevos datos
fs.writeFileSync(archivoJson, datosJson);

console.log('Archivo JSON sobrescrito con éxito');