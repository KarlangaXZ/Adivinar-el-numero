const SECRET_KEY = 'mi_secreto_super_seguro';

function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function encryptNumber(number) {
    return CryptoJS.AES.encrypt(number.toString(), SECRET_KEY).toString();
}

function decryptNumber(encrypted) {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    return parseInt(bytes.toString(CryptoJS.enc.Utf8));
}

const numeroAzar = encryptNumber(generateRandomNumber());
let conteo = 0;

function chequearResultado() {
    conteo++;
    document.getElementById('intento').textContent = conteo;
    const numeroIngresado = parseInt(document.getElementById('numeroEntrada').value);

    if (numeroIngresado < 1 || numeroIngresado > 100 || isNaN(numeroIngresado)) {
        document.getElementById('mensaje').textContent = 'Por favor ingresar un número válido entre 1 y 100';
        document.getElementById('mensaje').style.color = 'yellow';
        return;
    }

    const numeroAzarDesencriptado = decryptNumber(numeroAzar);

    if (numeroIngresado === numeroAzarDesencriptado) {
        document.getElementById('mensaje').textContent = '¡Felicidades! Adivinaste el Número!!';
        document.getElementById('mensaje').style.color = 'green';
        document.getElementById('numeroEntrada').disabled = true;
        document.getElementById('cargar').style.display = 'block';
        guardarIntento();
    } else if (numeroIngresado < numeroAzarDesencriptado) {
        document.getElementById('mensaje').textContent = '¡Más alto! El número es mayor que el ingresado';
        document.getElementById('mensaje').style.color = 'red';
    } else {
        document.getElementById('mensaje').textContent = '¡Más bajo! El número es menor al ingresado';
        document.getElementById('mensaje').style.color = 'red';
    }
}

document.getElementById('cargar').addEventListener('click', function() {
    location.reload();
});

function guardarIntento() {
    const nombre = document.getElementById('nombre').value;
    if (!nombre) {
        alert('Por favor ingresa tu nombre');
        return;
    }
    fetch('/guardar-intento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, intentos: conteo })
    })
    .then(response => response.json())
    .then(data => console.log('Intento guardado con ID:', data.id))
    .catch(error => console.error('Error guardando el intento:', error));
}

function mostrarIntentos() {
    fetch('/obtener-intentos')
        .then(response => response.json())
        .then(data => {
            const listaIntentos = document.getElementById('listaIntentos');
            listaIntentos.innerHTML = '';
            data.intentos.forEach(intento => {
                const p = document.createElement('p');
                p.textContent = `Nombre: ${intento.nombre} - Intentos: ${intento.intentos}`;
                listaIntentos.appendChild(p);
            });
            document.getElementById('modal').style.display = 'block';
        })
        .catch(error => console.error('Error obteniendo los intentos:', error));
}

function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
}