
let numeroAzar = Math.floor(Math.random()*100)+1;

let numeroEntrada = document.getElementById('numeroEntrada')
let mensaje = document.getElementById('mensaje')
let intento = document.getElementById('intento')
let conteo = 0
let cargarPagina = document.getElementById('cargar')

function chequearResultado(){
    conteo ++
    intento.textContent = conteo;
    let numeroIngresado = parseInt(numeroEntrada.value)

    if(numeroIngresado <1 || numeroIngresado >100 || isNaN(numeroIngresado)){
        mensaje.textContent = 'Por favor ingresar un numero valido entre 1 y 100'
        mensaje.style.color = 'yellow'
        return
    }

    if(numeroIngresado === numeroAzar){
        mensaje.textContent = 'Felicidades! Adivinaste el Numero!!';
        mensaje.style.color = 'green';
        numeroEntrada.disabled = true;
        cargarPagina.textContent = 'Intentalo otra vez';
        cargarPagina.style.display = 'block';
    }else if(numeroIngresado < numeroAzar){
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