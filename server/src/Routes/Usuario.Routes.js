const express = require('express');
const router = express.Router();
const UsuarioService = require('../Services/Usuario.Service');


router.post('/create', async(req, res) => {
    try {
        console.log("Datos recibidos en req.body:", req.body); // Log para depurar
        const {Nombre, UserName, Password } = req.body;
        if (!Nombre || !UserName || !Password) {
            return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
        }

        const usuario = await UsuarioService.crearUsuario(Nombre, UserName, Password);
        res.status(201).json({ mensaje: 'usuario creado', usuario });
    } catch (error) {
        console.error("Error en POST /usuario/create:", error.message);
        res.status(500).json({ mensaje: 'Error interno: ' + error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const usuarios = await UsuarioService.obtenerUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Error en GET /usuario:", error.message);
        res.status(500).json({ mensaje: 'Error interno: ' + error.message });
    }
});

module.exports = router;