const sql = require('mssql');
const express = require('express');
const router = express.Router();
const dbConfig = require('../ConnectDb'); // Asegúrate de importar tu configuración

//esto solo es pa probar que la conexion funciona
//#region Endpoints
//supongo que saben bregar con endpoints SALOMON que eres el que tiene que encargarse del servidor
router.get('/testConn', async (req, res) => {
    try {
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor'+ err);
    }
})

module.exports = router;