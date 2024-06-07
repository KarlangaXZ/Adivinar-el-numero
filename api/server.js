// api/server.js
const express = require('express');
const mysql = require('mysql');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const router = express.Router();

// Configura el middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Configura la conexión a MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Conecta a MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a MySQL');
});

// Ruta para guardar el intento
router.post('/guardar-intento', (req, res) => {
    const { nombre, intentos } = req.body;
    const query = 'INSERT INTO intentos (nombre, intentos) VALUES (?, ?)';
    db.query(query, [nombre, intentos], (err, result) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        res.send({ id: result.insertId });
    });
});

// Ruta para obtener todos los intentos
router.get('/obtener-intentos', (req, res) => {
    const query = 'SELECT * FROM intentos';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        res.send({ intentos: results });
    });
});

// Maneja todas las demás rutas con la aplicación de React
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use('/.netlify/functions/server', router); // Añade la ruta para Netlify Functions

module.exports.handler = serverless(app);
