/*window.onload = function() {
    const botonAgregarCarrito = document.getElementById('agregar-carrito');

    botonAgregarCarrito.addEventListener('click', function(){
        const idProducto = product.id
    })
}*/

window.onload = function (){
    const agregarAlCarrito = document.querySelector('.agregarAlCarrito')
    let productoEnCarrito = [];

    function agregarCarrito(){

    }

    agregarAlCarrito.addEventListener('click', agregarCarrito);
}

/* para guardar un producto en el carrito lo que tengo que hacer es: 
1- un boton para guardar producto - listo
2- la logica del boton que busque en la base de datos el producto a guardar - listo
3- luego de que haya encontrado el producto necesito que lo guarde en la tabla order - listo
4- ademas de guardar el producto necesito guardar el nombre, correo de la persona que haya guardado el producto -listo
5- en la vista del carrito necesito que se muestre el producto guardado - listo
6- a partir de alli necesito crear la funcionalidad de cantidad del producto y finalizar compra, ademas de eliminar el producto de la vista*/