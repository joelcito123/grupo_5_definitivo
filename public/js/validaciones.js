
window.onload = function () {
    const nombre = document.querySelector('.product-name');
    const descripcion = document.querySelector('.product-description');
    const imagen = document.querySelector('.product-image');
    const spanDeErrores1 = document.querySelector('.error-message1');
    const spanDeErrores2 = document.querySelector('.error-message2');
    const errorImagen = document.querySelector('.error-image');
    const formulario = document.querySelector('form')

    formulario.addEventListener('submit', (evento) => {
        // Confirmar si el formulario no esta vacio
    
        if(nombre.value == ''){
            spanDeErrores1.style.display = 'block';
            spanDeErrores1.innerHTML = 'El nombre es obligatorio';
            evento.preventDefault();
        } else if (nombre.value.length < 5 ) {
            spanDeErrores1.style.display = 'block';
            spanDeErrores1.innerHTML = 'El nombre debe tener al menos 5 caracteres';
            evento.preventDefault();
        }

        // Validacion de descripcion de producto

        if (descripcion.value.length < 20) {
            spanDeErrores2.style.display = 'block';
            spanDeErrores2.innerHTML = 'La descripción debe tener al menos 20 caracteres';
            evento.preventDefault();
        }

        // Validacion de extension de imagen

        if (!imagen.files || imagen.files.length === 0) {
            errorImagen.style.display = 'block'
            errorImagen.innerHTML = "Por favor, selecciona una imagen";
            evento.preventDefault();
            return;
          }

        const extensionesValidas = [".jpg",".jpeg", ".png", ".gif"];
        const extension = imagen.files[0].name.split(".").pop();

        if (extensionesValidas.indexOf("." + extension) === -1) {
            errorImagen.style.display = 'block';
            errorImagen.innerHTML = "La imagen debe ser un archivo válido (JPG, JPEG, PNG, GIF).";
            evento.preventDefault();
          }
    })


    

}
