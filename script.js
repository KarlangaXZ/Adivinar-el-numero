(function(){
    let numeroAzar = Math.floor(Math.random() * 100) + 1;
    let conteo = 0;
    let numeroEntrada = document.getElementById('numeroEntrada');
    let mensaje = document.getElementById('mensaje');
    let intento = document.getElementById('intento');
    let cargarPagina = document.getElementById('cargar');

    function chequearResultado() {
        conteo++;
        intento.textContent = conteo;
        let numeroIngresado = parseInt(numeroEntrada.value);

        if (numeroIngresado < 1 || numeroIngresado > 100 || isNaN(numeroIngresado)) {
            mensaje.textContent = 'Por favor ingresar un número válido entre 1 y 100';
            mensaje.style.color = 'yellow';
            return;
        }

        if (numeroIngresado === numeroAzar) {
            mensaje.textContent = '¡Felicidades! Adivinaste el Número!!';
            mensaje.style.color = 'green';
            numeroEntrada.disabled = true;
            cargarPagina.textContent = 'Inténtalo otra vez';
            cargarPagina.style.display = 'block';
        } else if (numeroIngresado < numeroAzar) {
            mensaje.textContent = '¡Más alto! El número es mayor que el ingresado';
            mensaje.style.color = 'red';
        } else {
            mensaje.textContent = '¡Más bajo! El número es menor al ingresado';
            mensaje.style.color = 'red';
        }
    }

    cargarPagina.addEventListener('click', function() {
        location.reload();
    });

    window.chequearResultado = chequearResultado;
})();