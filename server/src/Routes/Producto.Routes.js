const express = require('express');
const router = express.Router();
const productoService = require('../Services/Producto.Service');

// Crear un producto (POST /api/productos)
router.post('/create', async (req, res) => {
    try {
        console.log("Datos recibidos en req.body:", req.body); // Log para depurar
        
        const {Namee, Price, Description } = req.body;
        const Id = productoService.randomString(10);
        if (!Namee || !Price || !Description) {
            return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
        }
        
        const producto = await productoService.crearProducto(Id, Namee, Price, Description);
        res.status(201).json({ mensaje: 'Producto creado', producto });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Leer todos los productos (GET /api/productos)
router.get('/', async (req, res) => {
    const productos = await productoService.obtenerProductos();
    res.json(productos);
});

// Leer un producto por ID (GET /api/productos/:id)
router.get('/:id', async (req, res) => {
    try {
        const productos = await productoService.obtenerProductoPorId(req.params.id);
        if (!productos) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Actualizar un producto (PUT /api/productos/:id)
router.put('/update/:id', async (req, res) => {
    try {
        const Id = req.params.id;
        const datosProducto = req.body;
        
        if (!datosProducto.Namee && !datosProducto.Price && !datosProducto.Description) {
            return res.status(400).json({ mensaje: 'Debes enviar al menos un campo para actualizar' });
        }

        const resultado = await productoService.actualizarProducto(Id, datosProducto);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(404).json({ mensaje: error.message });
    }
});

// Eliminar un producto (DELETE /api/productos/:id)
router.delete('/delete/:id', async (req, res) => {
    try {
        const Id = req.params.id;
        const resultado = await productoService.eliminarProducto(Id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

module.exports = router;